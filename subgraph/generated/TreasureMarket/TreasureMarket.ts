
import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

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

export class AllowedTokenAdded extends ethereum.Event {
  get params(): AllowedTokenAdded__Params {
    return new AllowedTokenAdded__Params(this);
  }
}

export class AllowedTokenAdded__Params {
  _event: AllowedTokenAdded;

  constructor(event: AllowedTokenAdded) {
    this._event = event;
  }

  get _caller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _token(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class AllowedTokenRemoved extends ethereum.Event {
  get params(): AllowedTokenRemoved__Params {
    return new AllowedTokenRemoved__Params(this);
  }
}

export class AllowedTokenRemoved__Params {
  _event: AllowedTokenRemoved;

  constructor(event: AllowedTokenRemoved) {
    this._event = event;
  }

  get _caller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _token(): Address {
    return this._event.parameters[1].value.toAddress();
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

export class CancelSale extends ethereum.Event {
  get params(): CancelSale__Params {
    return new CancelSale__Params(this);
  }
}

export class CancelSale__Params {
  _event: CancelSale;

  constructor(event: CancelSale) {
    this._event = event;
  }

  get _seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class CancelSaleWithToken extends ethereum.Event {
  get params(): CancelSaleWithToken__Params {
    return new CancelSaleWithToken__Params(this);
  }
}

export class CancelSaleWithToken__Params {
  _event: CancelSaleWithToken;

  constructor(event: CancelSaleWithToken) {
    this._event = event;
  }

  get _seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class FeeSet extends ethereum.Event {
  get params(): FeeSet__Params {
    return new FeeSet__Params(this);
  }
}

export class FeeSet__Params {
  _event: FeeSet;

  constructor(event: FeeSet) {
    this._event = event;
  }

  get _fee(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class FeesWithdrawn extends ethereum.Event {
  get params(): FeesWithdrawn__Params {
    return new FeesWithdrawn__Params(this);
  }
}

export class FeesWithdrawn__Params {
  _event: FeesWithdrawn;

  constructor(event: FeesWithdrawn) {
    this._event = event;
  }

  get _caller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class FeesWithdrawnToken extends ethereum.Event {
  get params(): FeesWithdrawnToken__Params {
    return new FeesWithdrawnToken__Params(this);
  }
}

export class FeesWithdrawnToken__Params {
  _event: FeesWithdrawnToken;

  constructor(event: FeesWithdrawnToken) {
    this._event = event;
  }

  get _caller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get tokenAdd(): Address {
    return this._event.parameters[3].value.toAddress();
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

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class RoyaltySet extends ethereum.Event {
  get params(): RoyaltySet__Params {
    return new RoyaltySet__Params(this);
  }
}

export class RoyaltySet__Params {
  _event: RoyaltySet;

  constructor(event: RoyaltySet) {
    this._event = event;
  }

  get _royalty(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class SaleComplete extends ethereum.Event {
  get params(): SaleComplete__Params {
    return new SaleComplete__Params(this);
  }
}

export class SaleComplete__Params {
  _event: SaleComplete;

  constructor(event: SaleComplete) {
    this._event = event;
  }

  get _seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _buyer(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class SaleCompleteWithToken extends ethereum.Event {
  get params(): SaleCompleteWithToken__Params {
    return new SaleCompleteWithToken__Params(this);
  }
}

export class SaleCompleteWithToken__Params {
  _event: SaleCompleteWithToken;

  constructor(event: SaleCompleteWithToken) {
    this._event = event;
  }

  get _seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _buyer(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _tokenAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class StartSale extends ethereum.Event {
  get params(): StartSale__Params {
    return new StartSale__Params(this);
  }
}

export class StartSale__Params {
  _event: StartSale;

  constructor(event: StartSale) {
    this._event = event;
  }

  get _seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _price(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class StartSaleWithToken extends ethereum.Event {
  get params(): StartSaleWithToken__Params {
    return new StartSaleWithToken__Params(this);
  }
}

export class StartSaleWithToken__Params {
  _event: StartSaleWithToken;

  constructor(event: StartSaleWithToken) {
    this._event = event;
  }

  get _seller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _price(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _tokenAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
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

export class TreasureMarket extends ethereum.SmartContract {
  static bind(address: Address): TreasureMarket {
    return new TreasureMarket("TreasureMarket", address);
  }

  feePercentagePoint(): BigInt {
    let result = super.call(
      "feePercentagePoint",
      "feePercentagePoint():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_feePercentagePoint(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "feePercentagePoint",
      "feePercentagePoint():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  gasLessRateLimit(): BigInt {
    let result = super.call(
      "gasLessRateLimit",
      "gasLessRateLimit():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_gasLessRateLimit(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "gasLessRateLimit",
      "gasLessRateLimit():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isForSaleById(param0: BigInt): boolean {
    let result = super.call("isForSaleById", "isForSaleById(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toBoolean();
  }

  try_isForSaleById(param0: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isForSaleById",
      "isForSaleById(uint256):(bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isTrustedForwarder(forwarder: Address): boolean {
    let result = super.call(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );

    return result[0].toBoolean();
  }

  try_isTrustedForwarder(forwarder: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isTrustedForwarder",
      "isTrustedForwarder(address):(bool)",
      [ethereum.Value.fromAddress(forwarder)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
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

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  priceById(param0: BigInt): BigInt {
    let result = super.call("priceById", "priceById(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toBigInt();
  }

  try_priceById(param0: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("priceById", "priceById(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  royaltyPercentagePoint(): BigInt {
    let result = super.call(
      "royaltyPercentagePoint",
      "royaltyPercentagePoint():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_royaltyPercentagePoint(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "royaltyPercentagePoint",
      "royaltyPercentagePoint():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  seller(param0: BigInt): Address {
    let result = super.call("seller", "seller(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_seller(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("seller", "seller(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class AddAllowedTokenCall extends ethereum.Call {
  get inputs(): AddAllowedTokenCall__Inputs {
    return new AddAllowedTokenCall__Inputs(this);
  }

  get outputs(): AddAllowedTokenCall__Outputs {
    return new AddAllowedTokenCall__Outputs(this);
  }
}

export class AddAllowedTokenCall__Inputs {
  _call: AddAllowedTokenCall;

  constructor(call: AddAllowedTokenCall) {
    this._call = call;
  }

  get _tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddAllowedTokenCall__Outputs {
  _call: AddAllowedTokenCall;

  constructor(call: AddAllowedTokenCall) {
    this._call = call;
  }
}

export class CancelSaleCall extends ethereum.Call {
  get inputs(): CancelSaleCall__Inputs {
    return new CancelSaleCall__Inputs(this);
  }

  get outputs(): CancelSaleCall__Outputs {
    return new CancelSaleCall__Outputs(this);
  }
}

export class CancelSaleCall__Inputs {
  _call: CancelSaleCall;

  constructor(call: CancelSaleCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CancelSaleCall__Outputs {
  _call: CancelSaleCall;

  constructor(call: CancelSaleCall) {
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

  get _gasLessRateLimit(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _treasureDeployedAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _forwarder(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _feePercentagePoint(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _royaltyPercentagePoint(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _defaultTokenAddress(): Address {
    return this._call.inputValues[5].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InstantBuyCall extends ethereum.Call {
  get inputs(): InstantBuyCall__Inputs {
    return new InstantBuyCall__Inputs(this);
  }

  get outputs(): InstantBuyCall__Outputs {
    return new InstantBuyCall__Outputs(this);
  }
}

export class InstantBuyCall__Inputs {
  _call: InstantBuyCall;

  constructor(call: InstantBuyCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class InstantBuyCall__Outputs {
  _call: InstantBuyCall;

  constructor(call: InstantBuyCall) {
    this._call = call;
  }
}

export class ListItemCall extends ethereum.Call {
  get inputs(): ListItemCall__Inputs {
    return new ListItemCall__Inputs(this);
  }

  get outputs(): ListItemCall__Outputs {
    return new ListItemCall__Outputs(this);
  }
}

export class ListItemCall__Inputs {
  _call: ListItemCall;

  constructor(call: ListItemCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _price(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ListItemCall__Outputs {
  _call: ListItemCall;

  constructor(call: ListItemCall) {
    this._call = call;
  }
}

export class OwnerWithdrawFeesCall extends ethereum.Call {
  get inputs(): OwnerWithdrawFeesCall__Inputs {
    return new OwnerWithdrawFeesCall__Inputs(this);
  }

  get outputs(): OwnerWithdrawFeesCall__Outputs {
    return new OwnerWithdrawFeesCall__Outputs(this);
  }
}

export class OwnerWithdrawFeesCall__Inputs {
  _call: OwnerWithdrawFeesCall;

  constructor(call: OwnerWithdrawFeesCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class OwnerWithdrawFeesCall__Outputs {
  _call: OwnerWithdrawFeesCall;

  constructor(call: OwnerWithdrawFeesCall) {
    this._call = call;
  }
}

export class OwnerWithdrawFeesTokenCall extends ethereum.Call {
  get inputs(): OwnerWithdrawFeesTokenCall__Inputs {
    return new OwnerWithdrawFeesTokenCall__Inputs(this);
  }

  get outputs(): OwnerWithdrawFeesTokenCall__Outputs {
    return new OwnerWithdrawFeesTokenCall__Outputs(this);
  }
}

export class OwnerWithdrawFeesTokenCall__Inputs {
  _call: OwnerWithdrawFeesTokenCall;

  constructor(call: OwnerWithdrawFeesTokenCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _tokenAdd(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class OwnerWithdrawFeesTokenCall__Outputs {
  _call: OwnerWithdrawFeesTokenCall;

  constructor(call: OwnerWithdrawFeesTokenCall) {
    this._call = call;
  }
}

export class RemoveAllowedTokenCall extends ethereum.Call {
  get inputs(): RemoveAllowedTokenCall__Inputs {
    return new RemoveAllowedTokenCall__Inputs(this);
  }

  get outputs(): RemoveAllowedTokenCall__Outputs {
    return new RemoveAllowedTokenCall__Outputs(this);
  }
}

export class RemoveAllowedTokenCall__Inputs {
  _call: RemoveAllowedTokenCall;

  constructor(call: RemoveAllowedTokenCall) {
    this._call = call;
  }

  get _tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveAllowedTokenCall__Outputs {
  _call: RemoveAllowedTokenCall;

  constructor(call: RemoveAllowedTokenCall) {
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

export class SetFeeCall extends ethereum.Call {
  get inputs(): SetFeeCall__Inputs {
    return new SetFeeCall__Inputs(this);
  }

  get outputs(): SetFeeCall__Outputs {
    return new SetFeeCall__Outputs(this);
  }
}

export class SetFeeCall__Inputs {
  _call: SetFeeCall;

  constructor(call: SetFeeCall) {
    this._call = call;
  }

  get _points(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetFeeCall__Outputs {
  _call: SetFeeCall;

  constructor(call: SetFeeCall) {
    this._call = call;
  }
}

export class SetRoyaltyCall extends ethereum.Call {
  get inputs(): SetRoyaltyCall__Inputs {
    return new SetRoyaltyCall__Inputs(this);
  }

  get outputs(): SetRoyaltyCall__Outputs {
    return new SetRoyaltyCall__Outputs(this);
  }
}

export class SetRoyaltyCall__Inputs {
  _call: SetRoyaltyCall;

  constructor(call: SetRoyaltyCall) {
    this._call = call;
  }

  get _points(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetRoyaltyCall__Outputs {
  _call: SetRoyaltyCall;

  constructor(call: SetRoyaltyCall) {
    this._call = call;
  }
}

export class TokenCancelSaleCall extends ethereum.Call {
  get inputs(): TokenCancelSaleCall__Inputs {
    return new TokenCancelSaleCall__Inputs(this);
  }

  get outputs(): TokenCancelSaleCall__Outputs {
    return new TokenCancelSaleCall__Outputs(this);
  }
}

export class TokenCancelSaleCall__Inputs {
  _call: TokenCancelSaleCall;

  constructor(call: TokenCancelSaleCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class TokenCancelSaleCall__Outputs {
  _call: TokenCancelSaleCall;

  constructor(call: TokenCancelSaleCall) {
    this._call = call;
  }
}

export class TokenInstantBuyCall extends ethereum.Call {
  get inputs(): TokenInstantBuyCall__Inputs {
    return new TokenInstantBuyCall__Inputs(this);
  }

  get outputs(): TokenInstantBuyCall__Outputs {
    return new TokenInstantBuyCall__Outputs(this);
  }
}

export class TokenInstantBuyCall__Inputs {
  _call: TokenInstantBuyCall;

  constructor(call: TokenInstantBuyCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _tokenAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class TokenInstantBuyCall__Outputs {
  _call: TokenInstantBuyCall;

  constructor(call: TokenInstantBuyCall) {
    this._call = call;
  }
}

export class TokenListItenCall extends ethereum.Call {
  get inputs(): TokenListItenCall__Inputs {
    return new TokenListItenCall__Inputs(this);
  }

  get outputs(): TokenListItenCall__Outputs {
    return new TokenListItenCall__Outputs(this);
  }
}

export class TokenListItenCall__Inputs {
  _call: TokenListItenCall;

  constructor(call: TokenListItenCall) {
    this._call = call;
  }

  get _id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _price(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _tokenAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class TokenListItenCall__Outputs {
  _call: TokenListItenCall;

  constructor(call: TokenListItenCall) {
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
