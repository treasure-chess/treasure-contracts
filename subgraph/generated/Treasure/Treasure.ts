
import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AchievementUpdated extends ethereum.Event {
  get params(): AchievementUpdated__Params {
    return new AchievementUpdated__Params(this);
  }
}

export class AchievementUpdated__Params {
  _event: AchievementUpdated;

  constructor(event: AchievementUpdated) {
    this._event = event;
  }

  get index(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get newText(): string {
    return this._event.parameters[1].value.toString();
  }

  get oldText(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class AdminAdded extends ethereum.Event {
  get params(): AdminAdded__Params {
    return new AdminAdded__Params(this);
  }
}

export class AdminAdded__Params {
  _event: AdminAdded;

  constructor(event: AdminAdded) {
    this._event = event;
  }

  get addedBy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class AdminRemoved extends ethereum.Event {
  get params(): AdminRemoved__Params {
    return new AdminRemoved__Params(this);
  }
}

export class AdminRemoved__Params {
  _event: AdminRemoved;

  constructor(event: AdminRemoved) {
    this._event = event;
  }

  get addedBy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class GameMinted extends ethereum.Event {
  get params(): GameMinted__Params {
    return new GameMinted__Params(this);
  }
}

export class GameMinted__Params {
  _event: GameMinted;

  constructor(event: GameMinted) {
    this._event = event;
  }

  get to(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get uri(): string {
    return this._event.parameters[2].value.toString();
  }

  get movesHash(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Received extends ethereum.Event {
  get params(): Received__Params {
    return new Received__Params(this);
  }
}

export class Received__Params {
  _event: Received;

  constructor(event: Received) {
    this._event = event;
  }

  get sender(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class RescuedERC20 extends ethereum.Event {
  get params(): RescuedERC20__Params {
    return new RescuedERC20__Params(this);
  }
}

export class RescuedERC20__Params {
  _event: RescuedERC20;

  constructor(event: RescuedERC20) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get recipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class RescuedEther extends ethereum.Event {
  get params(): RescuedEther__Params {
    return new RescuedEther__Params(this);
  }
}

export class RescuedEther__Params {
  _event: RescuedEther;

  constructor(event: RescuedEther) {
    this._event = event;
  }

  get recipient(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Treasure__gamesResult {
  value0: Bytes;
  value1: i32;
  value2: i32;
  value3: i32;
  value4: i32;
  value5: boolean;

  constructor(
    value0: Bytes,
    value1: i32,
    value2: i32,
    value3: i32,
    value4: i32,
    value5: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytes(this.value0));
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    map.set(
      "value2",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value2))
    );
    map.set(
      "value3",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value3))
    );
    map.set(
      "value4",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value4))
    );
    map.set("value5", ethereum.Value.fromBoolean(this.value5));
    return map;
  }
}

export class Treasure extends ethereum.SmartContract {
  static bind(address: Address): Treasure {
    return new Treasure("Treasure", address);
  }

  achievements(param0: i32): string {
    let result = super.call("achievements", "achievements(uint16):(string)", [
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))
    ]);

    return result[0].toString();
  }

  try_achievements(param0: i32): ethereum.CallResult<string> {
    let result = super.tryCall(
      "achievements",
      "achievements(uint16):(string)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  admins(param0: Address): boolean {
    let result = super.call("admins", "admins(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_admins(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("admins", "admins(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  games(param0: BigInt): Treasure__gamesResult {
    let result = super.call(
      "games",
      "games(uint256):(bytes32,uint8,uint16,uint16,uint16,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new Treasure__gamesResult(
      result[0].toBytes(),
      result[1].toI32(),
      result[2].toI32(),
      result[3].toI32(),
      result[4].toI32(),
      result[5].toBoolean()
    );
  }

  try_games(param0: BigInt): ethereum.CallResult<Treasure__gamesResult> {
    let result = super.tryCall(
      "games",
      "games(uint256):(bytes32,uint8,uint16,uint16,uint16,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Treasure__gamesResult(
        value[0].toBytes(),
        value[1].toI32(),
        value[2].toI32(),
        value[3].toI32(),
        value[4].toI32(),
        value[5].toBoolean()
      )
    );
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getOriginalPlayer(_id: BigInt): Address {
    let result = super.call(
      "getOriginalPlayer",
      "getOriginalPlayer(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );

    return result[0].toAddress();
  }

  try_getOriginalPlayer(_id: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getOriginalPlayer",
      "getOriginalPlayer(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getTextAcheivementsByTreasure(_id: BigInt): Array<string> {
    let result = super.call(
      "getTextAcheivementsByTreasure",
      "getTextAcheivementsByTreasure(uint256):(string[3])",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );

    return result[0].toStringArray();
  }

  try_getTextAcheivementsByTreasure(
    _id: BigInt
  ): ethereum.CallResult<Array<string>> {
    let result = super.tryCall(
      "getTextAcheivementsByTreasure",
      "getTextAcheivementsByTreasure(uint256):(string[3])",
      [ethereum.Value.fromUnsignedBigInt(_id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toStringArray());
  }

  getTotalGames(): BigInt {
    let result = super.call("getTotalGames", "getTotalGames():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getTotalGames(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTotalGames",
      "getTotalGames():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  mint(
    player: Address,
    _tokenURI: string,
    _moveHash: Bytes,
    _level: i32,
    _achievement1: i32,
    _achievement2: i32,
    _achievement3: i32,
    _color: boolean
  ): BigInt {
    let result = super.call(
      "mint",
      "mint(address,string,bytes32,uint8,uint16,uint16,uint16,bool):(uint256)",
      [
        ethereum.Value.fromAddress(player),
        ethereum.Value.fromString(_tokenURI),
        ethereum.Value.fromFixedBytes(_moveHash),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_level)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_achievement1)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_achievement2)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_achievement3)),
        ethereum.Value.fromBoolean(_color)
      ]
    );

    return result[0].toBigInt();
  }

  try_mint(
    player: Address,
    _tokenURI: string,
    _moveHash: Bytes,
    _level: i32,
    _achievement1: i32,
    _achievement2: i32,
    _achievement3: i32,
    _color: boolean
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "mint",
      "mint(address,string,bytes32,uint8,uint16,uint16,uint16,bool):(uint256)",
      [
        ethereum.Value.fromAddress(player),
        ethereum.Value.fromString(_tokenURI),
        ethereum.Value.fromFixedBytes(_moveHash),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_level)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_achievement1)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_achievement2)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_achievement3)),
        ethereum.Value.fromBoolean(_color)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  movesHashToId(param0: Bytes): BigInt {
    let result = super.call(
      "movesHashToId",
      "movesHashToId(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return result[0].toBigInt();
  }

  try_movesHashToId(param0: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "movesHashToId",
      "movesHashToId(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  originalPlayers(param0: BigInt): Address {
    let result = super.call(
      "originalPlayers",
      "originalPlayers(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_originalPlayers(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "originalPlayers",
      "originalPlayers(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class AddAdminCall extends ethereum.Call {
  get inputs(): AddAdminCall__Inputs {
    return new AddAdminCall__Inputs(this);
  }

  get outputs(): AddAdminCall__Outputs {
    return new AddAdminCall__Outputs(this);
  }
}

export class AddAdminCall__Inputs {
  _call: AddAdminCall;

  constructor(call: AddAdminCall) {
    this._call = call;
  }

  get _admin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddAdminCall__Outputs {
  _call: AddAdminCall;

  constructor(call: AddAdminCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class MintCall extends ethereum.Call {
  get inputs(): MintCall__Inputs {
    return new MintCall__Inputs(this);
  }

  get outputs(): MintCall__Outputs {
    return new MintCall__Outputs(this);
  }
}

export class MintCall__Inputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get player(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _tokenURI(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _moveHash(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _level(): i32 {
    return this._call.inputValues[3].value.toI32();
  }

  get _achievement1(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get _achievement2(): i32 {
    return this._call.inputValues[5].value.toI32();
  }

  get _achievement3(): i32 {
    return this._call.inputValues[6].value.toI32();
  }

  get _color(): boolean {
    return this._call.inputValues[7].value.toBoolean();
  }
}

export class MintCall__Outputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RemoveAdminCall extends ethereum.Call {
  get inputs(): RemoveAdminCall__Inputs {
    return new RemoveAdminCall__Inputs(this);
  }

  get outputs(): RemoveAdminCall__Outputs {
    return new RemoveAdminCall__Outputs(this);
  }
}

export class RemoveAdminCall__Inputs {
  _call: RemoveAdminCall;

  constructor(call: RemoveAdminCall) {
    this._call = call;
  }

  get _admin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveAdminCall__Outputs {
  _call: RemoveAdminCall;

  constructor(call: RemoveAdminCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RescueERC20OwnerCall extends ethereum.Call {
  get inputs(): RescueERC20OwnerCall__Inputs {
    return new RescueERC20OwnerCall__Inputs(this);
  }

  get outputs(): RescueERC20OwnerCall__Outputs {
    return new RescueERC20OwnerCall__Outputs(this);
  }
}

export class RescueERC20OwnerCall__Inputs {
  _call: RescueERC20OwnerCall;

  constructor(call: RescueERC20OwnerCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class RescueERC20OwnerCall__Outputs {
  _call: RescueERC20OwnerCall;

  constructor(call: RescueERC20OwnerCall) {
    this._call = call;
  }
}

export class RescueEtherOwnerCall extends ethereum.Call {
  get inputs(): RescueEtherOwnerCall__Inputs {
    return new RescueEtherOwnerCall__Inputs(this);
  }

  get outputs(): RescueEtherOwnerCall__Outputs {
    return new RescueEtherOwnerCall__Outputs(this);
  }
}

export class RescueEtherOwnerCall__Inputs {
  _call: RescueEtherOwnerCall;

  constructor(call: RescueEtherOwnerCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RescueEtherOwnerCall__Outputs {
  _call: RescueEtherOwnerCall;

  constructor(call: RescueEtherOwnerCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateAchievementsCall extends ethereum.Call {
  get inputs(): UpdateAchievementsCall__Inputs {
    return new UpdateAchievementsCall__Inputs(this);
  }

  get outputs(): UpdateAchievementsCall__Outputs {
    return new UpdateAchievementsCall__Outputs(this);
  }
}

export class UpdateAchievementsCall__Inputs {
  _call: UpdateAchievementsCall;

  constructor(call: UpdateAchievementsCall) {
    this._call = call;
  }

  get _achievementIndex(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get _newText(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class UpdateAchievementsCall__Outputs {
  _call: UpdateAchievementsCall;

  constructor(call: UpdateAchievementsCall) {
    this._call = call;
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}
