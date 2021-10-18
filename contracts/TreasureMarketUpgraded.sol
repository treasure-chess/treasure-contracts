// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { PausableUpgradeable } from '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import { Initializable } from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import { UUPSUpgradeable } from '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

//Includes BaseRelayRecipient, for meta transactions.
import { ReentrancyGuardUpgradeable } from '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';

import { TreasureUpgraded } from './TreasureUpgraded.sol';

// "TreasureMarketUpgraded" consists of:
// 1. an arbitrary method removed,
// 2. an arbitrary method updated (event + actual state change),
// 3. an arbitrary method updated to change new state variable,
// 4. a brand new function with a new event and does arbitrary change
// on a new state variable.
// 5. a brand new function which changes old state

contract TreasureMarketUpgraded is
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
  mapping(uint256 => uint256) public endTime;

  TreasureUpgraded treasure;

  // new state variable
  uint256 public newId;

  //events
  event StartSale(address _seller, uint256 _id, uint256 _price);
  event CancelSale(address _seller, uint256 _id);
  event SaleComplete(address _seller, uint256 _id, address _buyer);
  event RoyaltySet(uint256 _royalty);
  event FeeSet(uint256 _fee);
  event FeesWithdrawn(address _caller, address _to, uint256 _amount);
  // new event
  event ChangeNewId(uint256 _id);

  function initialize(
    uint256 _gasLessRateLimit,
    address payable _treasureDeployedAddress,
    address _forwarder,
    uint256 _feePercentagePoint,
    uint256 _royaltyPercentagePoint
  ) public initializer {
    gasLessRateLimit = _gasLessRateLimit;
    treasure = TreasureUpgraded(_treasureDeployedAddress);
    feePercentagePoint = _feePercentagePoint;
    royaltyPercentagePoint = _royaltyPercentagePoint;
    _trustedForwarder = _forwarder;
    __Ownable_init();
    __Pausable_init();
    __ReentrancyGuard_init();
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

  function listItem(
    uint256 _id,
    uint256 price,
    uint256 duration
  ) public {
    require(
      treasure.ownerOf(_id) == _msgSender(),
      'You can not list assets you dont own.'
    );
    require(price != 0, 'Price can not be set to 0.');
    require(duration > 1, 'Duration of the sale must be longer');

    isForSaleById[_id] = true;
    priceById[_id] = price;
    seller[_id] = _msgSender();
    endTime[_id] = block.timestamp + duration;

    treasure.safeTransferFrom(_msgSender(), address(this), _id);
    emit StartSale(seller[_id], _id, price);
  }

  function cancelSale(uint256 _id) public {
    require(seller[_id] == _msgSender());

    isForSaleById[_id] = false;
    priceById[_id] = 0;
    seller[_id] = address(0);
    endTime[_id] = 1; // 2
    newId = _id; // 2/3 new state modified + modifying existing function

    emit ChangeNewId(_id); // 2

    treasure.safeTransferFrom(address(this), _msgSender(), _id);
    emit CancelSale(_msgSender(), _id);
  }

  //signature validation can be checked in SignatureChecker.sol
  //assets are listed offchain using eth-sig-util to sign messages
  function instantBuy(uint256 _id) public payable nonReentrant {
    //check SignatureChecker of sale. if its invalid, remove it.
    require(isForSaleById[_id], 'Item not for sale.');
    require(msg.value == priceById[_id], 'Incorrect amount of value sent.');
    require(block.timestamp < endTime[_id], 'Auction has ended.');
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

  function setRoyalty(uint256 _points) public onlyOwner {
    royaltyPercentagePoint = _points;
    emit RoyaltySet(_points);
  }

  function setNewId(uint256 _id) public onlyOwner {
    newId = _id;
    emit ChangeNewId(_id);
  }

  // 5. new function which changes old state
  function cancelFees() public onlyOwner {
    royaltyPercentagePoint = 0;
    feePercentagePoint = 0;
    emit FeeSet(0);
    emit RoyaltySet(0);
  }

  // 1. setFee deleted
  //   function setFee(uint256 _points) public onlyOwner {
  //     feePercentagePoint = _points;
  //     emit FeeSet(_points);
  //   }

  //Marketplace Owner can withdraw fees.
  function ownerWithdrawFees(address payable to, uint256 amount)
    public
    onlyOwner
  {
    //use `call` here to pass on gas, so you can do more stuff when this is called.
    (bool sent, ) = to.call{ value: amount }('');
    require(sent, 'Failed to send ETH. Transaction fails.');
    emit FeesWithdrawn(_msgSender(), to, amount);
  }
}
