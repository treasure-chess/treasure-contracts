import {
  
  OwnershipTransferred as OwnershipTransferredEvent,
  
  SaleComplete as SaleCompleteEvent,
  SaleCompleteWithToken as SaleCompleteWithTokenEvent,
  
} from "../generated/TreasureMarket/TreasureMarket"
import {
//  OwnershipTransferred,
  SaleComplete,
  SaleCompleteWithToken,
} from "../generated/schema"


/* export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
} */


export function handleSaleComplete(event: SaleCompleteEvent): void {
  let entity = new SaleComplete(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._seller = event.params._seller
  entity._id = event.params._id
  entity._buyer = event.params._buyer
  entity.save()
}

export function handleSaleCompleteWithToken(
  event: SaleCompleteWithTokenEvent
): void {
  let entity = new SaleCompleteWithToken(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._seller = event.params._seller
  entity._id = event.params._id
  entity._buyer = event.params._buyer
  entity._tokenAddress = event.params._tokenAddress
  entity.save()
}
