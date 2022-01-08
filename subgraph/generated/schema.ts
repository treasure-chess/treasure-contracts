// treasure

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class GameMinted extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
    this.set("owner", Value.fromBytes(Bytes.empty()))
    this.set("to", Value.fromBytes(Bytes.empty()));
    this.set("id", Value.fromBigInt(BigInt.zero()));
    this.set("uri", Value.fromString(""));
    this.set("movesHash", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save GameMinted entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save GameMinted entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("GameMinted", id.toString(), this);
    }
  }

  static load(id: string): GameMinted | null {
    return changetype<GameMinted | null>(store.get("GameMinted", id));
  }

/*  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  } */

  get id(): BigInt {
    let value = this.get("id");
    return value!.toBigInt();
  }

  set id(value: BigInt) {
    this.set("id", Value.fromBigInt(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value!.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get uri(): string {
    let value = this.get("uri");
    return value!.toString();
  }

  set uri(value: string) {
    this.set("uri", Value.fromString(value));
  }

  get movesHash(): Bytes {
    let value = this.get("movesHash");
    return value!.toBytes();
  }

  set movesHash(value: Bytes) {
    this.set("movesHash", Value.fromBytes(value));
  }
}

export class OwnershipTransferred extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("previousOwner", Value.fromBytes(Bytes.empty()));
    this.set("newOwner", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OwnershipTransferred entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save OwnershipTransferred entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("OwnershipTransferred", id.toString(), this);
    }
  }

  static load(id: string): OwnershipTransferred | null {
    return changetype<OwnershipTransferred | null>(
      store.get("OwnershipTransferred", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get previousOwner(): Bytes {
    let value = this.get("previousOwner");
    return value!.toBytes();
  }

  set previousOwner(value: Bytes) {
    this.set("previousOwner", Value.fromBytes(value));
  }

  get newOwner(): Bytes {
    let value = this.get("newOwner");
    return value!.toBytes();
  }

  set newOwner(value: Bytes) {
    this.set("newOwner", Value.fromBytes(value));
  }
}

export class Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("from", Value.fromBytes(Bytes.empty()));
    this.set("to", Value.fromBytes(Bytes.empty()));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Transfer entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Transfer", id.toString(), this);
    }
  }

  static load(id: string): Transfer | null {
    return changetype<Transfer | null>(store.get("Transfer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value!.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value!.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }
}

// treasureMarket


export class SaleComplete extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("_seller", Value.fromBytes(Bytes.empty()));
    this.set("_id", Value.fromBigInt(BigInt.zero()));
    this.set("_buyer", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SaleComplete entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SaleComplete entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SaleComplete", id.toString(), this);
    }
  }

  static load(id: string): SaleComplete | null {
    return changetype<SaleComplete | null>(store.get("SaleComplete", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get _seller(): Bytes {
    let value = this.get("_seller");
    return value!.toBytes();
  }

  set _seller(value: Bytes) {
    this.set("_seller", Value.fromBytes(value));
  }

  get _id(): BigInt {
    let value = this.get("_id");
    return value!.toBigInt();
  }

  set _id(value: BigInt) {
    this.set("_id", Value.fromBigInt(value));
  }

  get _buyer(): Bytes {
    let value = this.get("_buyer");
    return value!.toBytes();
  }

  set _buyer(value: Bytes) {
    this.set("_buyer", Value.fromBytes(value));
  }
}

export class SaleCompleteWithToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("_seller", Value.fromBytes(Bytes.empty()));
    this.set("_id", Value.fromBigInt(BigInt.zero()));
    this.set("_buyer", Value.fromBytes(Bytes.empty()));
    this.set("_tokenAddress", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save SaleCompleteWithToken entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save SaleCompleteWithToken entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("SaleCompleteWithToken", id.toString(), this);
    }
  }

  static load(id: string): SaleCompleteWithToken | null {
    return changetype<SaleCompleteWithToken | null>(
      store.get("SaleCompleteWithToken", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get _seller(): Bytes {
    let value = this.get("_seller");
    return value!.toBytes();
  }

  set _seller(value: Bytes) {
    this.set("_seller", Value.fromBytes(value));
  }

  get _id(): BigInt {
    let value = this.get("_id");
    return value!.toBigInt();
  }

  set _id(value: BigInt) {
    this.set("_id", Value.fromBigInt(value));
  }

  get _buyer(): Bytes {
    let value = this.get("_buyer");
    return value!.toBytes();
  }

  set _buyer(value: Bytes) {
    this.set("_buyer", Value.fromBytes(value));
  }

  get _tokenAddress(): Bytes {
    let value = this.get("_tokenAddress");
    return value!.toBytes();
  }

  set _tokenAddress(value: Bytes) {
    this.set("_tokenAddress", Value.fromBytes(value));
  }
}

