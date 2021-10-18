import { deployContracts } from "./helpers"

async function main() {
	await deployContracts();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
