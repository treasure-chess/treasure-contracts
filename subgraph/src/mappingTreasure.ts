import {
  BigInt,
  Address,
  Bytes,
  log,
  BigDecimal,
  ByteArray,
} from "@graphprotocol/graph-ts";
import {
  GameMinted as GameMintedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Transfer as TransferEvent,
} from "../generated/Treasure/Treasure"
import {
  GameMinted as Game,
  OwnershipTransferred,
  Transfer,
} from "../generated/schema"



export function handleGameMinted(event: GameMintedEvent): void {
 // log.info("handleGameMinted {}", [event.toString()]);
  let game = new Game(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  game.to = event.params.to
  game.id = event.params.id
  //game.owner = event.params.to
  game.uri = event.params.uri
  game.movesHash = event.params.movesHash
  game.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let game = new OwnershipTransferred(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  game.previousOwner = event.params.previousOwner
  game.newOwner = event.params.newOwner
  game.save()
}

export function handleTransfer(event: TransferEvent): void {
  let game = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  game.from = event.params.from
  game.to = event.params.to
  game.tokenId = event.params.tokenId
  /*fromAccount.numberOfGamesOwned = fromAccount.numberOfGamesOwned.minus(
      BigInt.fromI32(1)
    );
  account.numberOfGamesOwned = account.numberOfGamesOwned.plus(
    BigInt.fromI32(1)
  ); */
  game.save()
}
