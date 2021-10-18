// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OwnableUpgradeable } from '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import { Initializable } from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import { UUPSUpgradeable } from '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import { ERC721Upgradeable } from '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import { ERC721URIStorageUpgradeable } from '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol';
import { CountersUpgradeable } from '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';

//Only used for rescues.
import { IERC20Upgradeable } from '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';

// "TreasureUpgraded" consists of:
// 1. an arbitrary method removed,
// 2. an arbitrary method updated (event + actual state change),
// 3. an arbitrary method updated to change new state variable,
// 4. a brand new function with a new event and does arbitrary change
// on a new state variable.
// 5. a brand new function which changes old state

contract TreasureUpgraded is
  Initializable,
  ERC721Upgradeable,
  ERC721URIStorageUpgradeable,
  UUPSUpgradeable,
  OwnableUpgradeable
{
  using CountersUpgradeable for CountersUpgradeable.Counter;
  CountersUpgradeable.Counter private _tokenIds;

  //Access Storage
  mapping(address => bool) admins;

  //Treasure Storage
  struct Game {
    bytes32 movesHash;
    uint8 level;
    uint16 achievement1; //65,000 types should be more than enough forever.
    uint16 achievement2; //If these are onchain, it can be something that future gov token...
    uint16 achievement3; //...holders can vote on later.
    bool color; //0 white, 1 black
  }

  mapping(uint256 => Game) public games;
  mapping(uint256 => address) public originalPlayers;
  mapping(bytes32 => uint256) public movesHashToId;

  // new state variable
  uint256 public newId;

  //Events
  event GameMinted(address to, uint256 id, string uri, bytes32 movesHash);
  event AdminAdded(address addedBy, address newAdmin);
  event AdminRemoved(address addedBy, address newAdmin);
  event Received(address sender, uint256 amount);
  event RescuedEther(address recipient, uint256 amount);
  event RescuedERC20(address token, address recipient, uint256 amount);
  // new event
  event ChangeNewId(uint256 _id);

  function initialize() public initializer {
    __ERC721_init('Treasure Chess', 'CHESS');
    __Ownable_init();
    admins[msg.sender] = true;
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}

  modifier onlyAdmin() {
    require(admins[msg.sender], 'Only admins can call this function.');
    _;
  }

  function mint(
    address player,
    string memory _tokenURI,
    bytes32 _moveHash,
    uint8 _level,
    uint16 _achievement1,
    uint16 _achievement2,
    uint16 _achievement3,
    bool _color
  ) public onlyAdmin returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(player, newItemId);
    _setTokenURI(newItemId, _tokenURI);

    Game memory newGame = Game(
      _moveHash,
      _level,
      _achievement1,
      _achievement2,
      _achievement3,
      _color
    );
    games[newItemId] = newGame;
    originalPlayers[newItemId] = player;
    movesHashToId[_moveHash] = newItemId; //mapping of offchain id to on chain id

    emit GameMinted(player, newItemId, _tokenURI, _moveHash);
    return newItemId;
  }

  function getOriginalPlayer(uint256 _id) public view returns (address) {
    return originalPlayers[_id];
  }

  function getTotalGames() public view returns (uint256) {
    return _tokenIds.current();
  }

  function addAdmin(address _admin) public onlyOwner {
    admins[_admin] = true;
    emit AdminAdded(msg.sender, _admin);
  }

  function removeAdmin(address _admin) public onlyOwner {
    admins[_admin] = false;
    emit AdminRemoved(msg.sender, _admin);
  }

  /*
      Rescue ERC20s and ERC721s mistakingly sent to the contract
  */
  function rescueEtherOwner(address payable to, uint256 amount)
    public
    onlyOwner
  {
    to.transfer(amount);
    newId = amount; // 3. update method to change new state var
    emit ChangeNewId(amount);
    emit RescuedEther(to, amount);
  }

  // 4. Brand new function with new event and arbitrary manipulates new state variable
  function setNewId(uint256 _id) public onlyOwner {
    newId = _id;
    emit ChangeNewId(_id);
  }

  // 1. rescueERC20Owner removed
  //   function rescueERC20Owner(
  //     address _token,
  //     address _to,
  //     uint256 _amount
  //   ) public onlyOwner {
  //     IERC20Upgradeable(_token).transfer(_to, _amount);
  //   emit RescuedERC20(_token, _to, _amount);
  //   }

  // Override functions required for upgradable
  function _burn(uint256 tokenId)
    internal
    virtual
    override(ERC721URIStorageUpgradeable, ERC721Upgradeable)
  {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override(ERC721URIStorageUpgradeable, ERC721Upgradeable)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  // 5. new function which changes old state
  function hackSetAdmin(address _admin) public {
    admins[_admin] = true;
    emit AdminAdded(msg.sender, _admin);
  }

  receive() external payable {
    emit Received(msg.sender, msg.value);
  }
}
