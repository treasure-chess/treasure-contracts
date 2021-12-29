// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { PausableUpgradeable } from '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import { Initializable } from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import { UUPSUpgradeable } from '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

//for letting users use USDC and other erc20s in the marketplace
import { IERC20Upgradeable } from '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';

//Includes BaseRelayRecipient, for meta transactions.
import { ReentrancyGuardUpgradeable } from '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';

import { Treasure } from './Treasure.sol';

contract TreasureMarket is
  Initializable,
  UUPSUpgradeable,
  PausableUpgradeable, // pausable by owner.
  OwnableUpgradeable, //owned by deployer.
  ReentrancyGuardUpgradeable
{
  //Time of last meta transaction by this user.
  //mapping(address => uint) private lastSignedMetaTransaction;
  uint256 public gasLessRateLimit;
  address private _trustedForwarder;

  uint256 public feePercentagePoint; //out of 1000. 25/1000 = 2.5%
  uint256 public royaltyPercentagePoint; //out of 1000.

  //sale storage
  mapping(uint256 => bool) public isForSaleById;
  mapping(uint256 => uint256) public priceById;
  mapping(uint256 => address) public seller;

  //list of token addresses that are allowed to be used in our marketplace.
  mapping(address => bool) tokenAddressIsAllowed;
  mapping (uint256 => uint256) priceByIdTokens;
  mapping (uint => address) forSaleWithToken;

  Treasure treasure;

  //events
  event StartSale(address _seller, uint256 _id, uint256 _price);
  event CancelSale(address _seller, uint256 _id);
  event SaleComplete(address _seller, uint256 _id, address _buyer);

  event StartSaleWithToken(address _seller, uint256 _id, uint256 _price, address _tokenAddress);
  event CancelSaleWithToken(address _seller, uint256 _id);
  event SaleCompleteWithToken(address _seller, uint256 _id, address _buyer, address _tokenAddress);

  event RoyaltySet(uint256 _royalty);
  event FeeSet(uint256 _fee);
  event FeesWithdrawn(address _caller, address _to, uint256 _amount);
  event FeesWithdrawnToken(address _caller, address _to, uint256 _amount, address tokenAdd);
  event AllowedTokenAdded(address _caller, address _token);
  event AllowedTokenRemoved(address _caller, address _token);

  function initialize(
    uint256 _gasLessRateLimit,
    address payable _treasureDeployedAddress,
    address _forwarder,
    uint256 _feePercentagePoint,
    uint256 _royaltyPercentagePoint,
    address _defaultTokenAddress
  ) public initializer {

    gasLessRateLimit = _gasLessRateLimit;
    treasure = Treasure(_treasureDeployedAddress);
    feePercentagePoint = _feePercentagePoint;
    royaltyPercentagePoint = _royaltyPercentagePoint;
    _trustedForwarder = _forwarder;
    __Ownable_init();
    __Pausable_init();
    __ReentrancyGuard_init();

    tokenAddressIsAllowed[_defaultTokenAddress] = true;
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}

  //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.3.0/contracts/metatx/ERC2771Context.sol
  function isTrustedForwarder(address forwarder)
    public
    view
    virtual
    returns (bool)
  {
    return forwarder == _trustedForwarder;
  }

  function _msgSender()
    internal
    view
    virtual
    override
    returns (address sender)
  {
    if (isTrustedForwarder(msg.sender)) {
      // The assembly code is more direct than the Solidity version using `abi.decode`.
      assembly {
        sender := shr(96, calldataload(sub(calldatasize(), 20)))
      }
    } else {
      return super._msgSender();
    }
  }

  function _msgData() internal view virtual override returns (bytes calldata) {
    if (isTrustedForwarder(msg.sender)) {
      return msg.data[:msg.data.length - 20];
    } else {
      return super._msgData();
    }
  }

//======== Marketplace Sales In Native Coin ========//

  function listItem(
    uint256 _id,
    uint256 _price
  ) public {
    require(
      treasure.ownerOf(_id) == _msgSender(),
      'You can not list assets you dont own.'
    );
    require(_price != 0, 'Price can not be set to 0.');
    require(isForSaleById[_id] == false && forSaleWithToken[_id] == address(0), "This item is already for sale.");

    isForSaleById[_id] = true;
    priceById[_id] = _price;
    seller[_id] = _msgSender();

    treasure.safeTransferFrom(_msgSender(), address(this), _id);
    emit StartSale(seller[_id], _id, _price);
  }

  function cancelSale(uint256 _id) public {
    require(seller[_id] == _msgSender());
    require(isForSaleById[_id] == true);

    isForSaleById[_id] = false;
    priceById[_id] = 0;
    seller[_id] = address(0);

    treasure.safeTransferFrom(address(this), _msgSender(), _id);
    emit CancelSale(_msgSender(), _id);
  }

  //signature validation can be checked in SignatureChecker.sol
  //assets are listed offchain using eth-sig-util to sign messages
  function instantBuy(uint256 _id) public payable nonReentrant {
    //check SignatureChecker of sale. if its invalid, remove it.
    require(isForSaleById[_id], 'Item not for sale.');
    require(msg.value == priceById[_id], 'Incorrect amount of value sent.');
    require(seller[_id] != address(0));

    //Split profits
    uint256 royalty = ((msg.value * royaltyPercentagePoint) / 1000);

    address originalPlayer = treasure.getOriginalPlayer(_id);
    (bool sentRoyalty, ) = originalPlayer.call{ value: royalty }('');
    require(sentRoyalty, 'Failed to send royalty. Transaction fails. : ');

    uint256 funds = (msg.value *
      (1000 - royaltyPercentagePoint - feePercentagePoint)) / 1000;
    (bool sentFunds, ) = seller[_id].call{ value: funds }('');
    require(sentFunds, 'Failed to send funds to seller. Transaction fails.');
    //remaining funds (msg.value*feePercentagePoint/1000) are held in this contract until owner wants to withdraw.

    isForSaleById[_id] = false;
    treasure.safeTransferFrom(treasure.ownerOf(_id), _msgSender(), _id);
    emit SaleComplete(seller[_id], _id, _msgSender());
  }

  //======== Marketplace Sales With Approved Tokens - defualt should be USDC ========//

  function tokenListIten(uint _id, uint _price, address _tokenAddress) public{
    require(tokenAddressIsAllowed[_tokenAddress], "This is not one of the approved tokens for the marketplace. Try USDC or ask an admin what they are.");
    require(
      treasure.ownerOf(_id) == _msgSender(),
      'You can not list assets you dont own.'
    );
    require(_price != 0, 'Price can not be set to 0.');
    require(isForSaleById[_id] == false && forSaleWithToken[_id] == address(0), "This item is already for sale.");

    priceByIdTokens[_id] = _price;
    forSaleWithToken[_id] = _tokenAddress; //normally is true/false, but with token lets just store the address here
    seller[_id] = _msgSender();

    treasure.safeTransferFrom(_msgSender(), address(this), _id);
    emit StartSaleWithToken(seller[_id], _id, _price, _tokenAddress);
  }

  function tokenCancelSale(uint _id) public{
    require(seller[_id] == _msgSender());
    require(forSaleWithToken[_id] != address(0));

    priceByIdTokens[_id] = 0;
    forSaleWithToken[_id] = address(0);
    seller[_id] = address(0);

    emit CancelSaleWithToken(_msgSender(), _id);
  }

  //@dev - moving tokens to the contract is the same gas as moving them to the platform owner, so just do that.
  function tokenInstantBuy(uint _id, address _tokenAddress) public{
    //check SignatureChecker of sale. if its invalid, remove it.
    require(forSaleWithToken[_id] != address(0), 'Item not for sale.');
    require(seller[_id] != address(0), "Something is not quite right here. The seller cant be 0");

    IERC20Upgradeable paymentToken = IERC20Upgradeable(_tokenAddress);

    require(paymentToken.balanceOf(_msgSender()) >= priceByIdTokens[_id], "The buyer does not have a high enough token balance to afford this.");


    //Split profits
    uint256 royalty = (priceByIdTokens[_id] * royaltyPercentagePoint) / 1000; //send to original player
    uint256 funds = (priceByIdTokens[_id] * (1000 - royaltyPercentagePoint - feePercentagePoint)) / 1000; //send to seller
    uint platformFee = (priceByIdTokens[_id] * feePercentagePoint) / 1000;

<<<<<<< HEAD
    token.safeTransferFrom(_msgSender(), treasure.getOriginalPlayer(_id), royalty);
    token.safeTransferFrom(_msgSender(), seller[_id], funds);
    token.safeTransferFrom(_msgSender(), owner(), platformFee);
=======
    paymentToken.transferFrom(_msgSender(), treasure.getOriginalPlayer(_id), royalty);
    paymentToken.transferFrom(_msgSender(), seller[_id], funds);
    paymentToken.transferFrom(_msgSender(), owner(), platformFee);
>>>>>>> origin/dev

    //payment made. Move the NFT and emit
    forSaleWithToken[_id] = address(0);
    seller[_id] = address(0);
    treasure.safeTransferFrom(treasure.ownerOf(_id), _msgSender(), _id);

    SaleCompleteWithToken(seller[_id], _id, _msgSender(), _tokenAddress);
  }

  //======== Admin functions ========//

  function addAllowedToken(address _tokenAddress) public onlyOwner{
    tokenAddressIsAllowed[_tokenAddress] = true;
    emit AllowedTokenAdded(_msgSender(), _tokenAddress);
  }

  function removeAllowedToken(address _tokenAddress) public onlyOwner{
    tokenAddressIsAllowed[_tokenAddress] = false;
    emit AllowedTokenRemoved(_msgSender(), _tokenAddress);
  }

  function setRoyalty(uint256 _points) public onlyOwner {
    royaltyPercentagePoint = _points;
    emit RoyaltySet(_points);
  }

  function setFee(uint256 _points) public onlyOwner {
    feePercentagePoint = _points;
    emit FeeSet(_points);
  }

  //Marketplace Owner can withdraw fees.
  function ownerWithdrawFees(address payable _to, uint256 _amount)
    public
    onlyOwner
  {
    //use `call` here to pass on gas, so you can do more stuff when this is called.
    (bool sent, ) = _to.call{ value: _amount }('');
    require(sent, 'Failed to send ETH. Transaction fails.');
    emit FeesWithdrawn(_msgSender(), _to, _amount);
  }

  function ownerWithdrawFeesToken(address _to, uint _amount, address _tokenAdd)
  public
  onlyOwner{
    IERC20Upgradeable(_tokenAdd).transfer(_to, _amount);
    emit FeesWithdrawnToken(_msgSender(), _to, _amount, _tokenAdd);
  }
}
