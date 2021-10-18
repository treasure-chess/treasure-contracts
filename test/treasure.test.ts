import { ethers } from 'hardhat'
import { deployContracts } from '../scripts/helpers'
import { expect } from './chai-setup'
import { ChessCoin, Treasure, TreasureMarket } from '../typechain'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

const getHashedMove = (move: number) => {
  const now = new Date().getMilliseconds()
  const salt = ethers.utils.id(now.toString())
  const hashedMove = ethers.utils.solidityKeccak256(
    ['uint8', 'bytes32'],
    [move, salt]
  )
  return { hashedMove, salt }
}

describe('Treasure & Treasure Market Contract Tests', () => {
  let Admin: SignerWithAddress
  let Alice: SignerWithAddress
  let Bob: SignerWithAddress
  let treasure: Treasure
  let treasureMarket: TreasureMarket
  let chessCoin: ChessCoin
  const { hashedMove } = getHashedMove(1)
  const { hashedMove: hashedMoveB } = getHashedMove(0)

  beforeEach(async () => {
    const [owner, alice, bob] = await ethers.getSigners()
    Admin = owner
    Alice = alice
    Bob = bob

    const { treasureContract, treasureMarketContract } = await deployContracts()
    const ChessCoinFactory = await ethers.getContractFactory('ChessCoin')
    const chessCoinDeployTxn = await ChessCoinFactory.deploy(
      ethers.utils.parseUnits('100000000')
    )
    const ChessCoinContract = await chessCoinDeployTxn.deployed()
    chessCoin = ChessCoinContract as ChessCoin

    treasure = treasureContract
    treasureMarket = treasureMarketContract
  })

  describe('Treasure Tests', () => {
    it('Should initialize properly', async () => {
      expect(await treasure.owner()).equal(Admin.address)
      expect(await treasure.name()).equal('Treasure Chess')
      expect(await treasure.symbol()).equal('CHESS')
      expect(await treasure.admins(Admin.address)).equal(true)
    })

    it('Should revert non-admin to mint', async () => {
      await expect(
        treasure
          .connect(Alice)
          .mint(
            Alice.address,
            'https://ethereum.org',
            hashedMove,
            0,
            0,
            0,
            0,
            false
          )
      ).to.be.revertedWith('Only admins can call this function.')
    })

    it('Should allow admin mint', async () => {
      await expect(
        treasure
          .connect(Admin)
          .mint(
            Admin.address,
            'https://ethereum.org',
            hashedMove,
            0,
            0,
            0,
            0,
            true
          )
      )
        .to.emit(treasure, 'GameMinted')
        .withArgs(Admin.address, 1, 'https://ethereum.org', hashedMove)

      expect(await treasure.getOriginalPlayer(1)).to.equal(Admin.address)
      expect(await treasure.getTotalGames()).to.equal(1)
      expect(await treasure.tokenURI(1)).to.equal('https://ethereum.org')
    })

    it('Should allow new admin mint and not allow removed admin to mint', async () => {
      await expect(treasure.addAdmin(Alice.address))
        .to.emit(treasure, 'AdminAdded')
        .withArgs(Admin.address, Alice.address)

      await expect(
        treasure
          .connect(Alice)
          .mint(
            Alice.address,
            'https://ethereum.org',
            hashedMoveB,
            0,
            0,
            0,
            0,
            false
          )
      )
        .to.emit(treasure, 'GameMinted')
        .withArgs(Alice.address, 1, 'https://ethereum.org', hashedMoveB)

      await expect(treasure.connect(Admin).removeAdmin(Alice.address))
        .to.emit(treasure, 'AdminRemoved')
        .withArgs(Admin.address, Alice.address)

      // Should not allow removed admin to mint
      await expect(
        treasure
          .connect(Alice)
          .mint(
            Alice.address,
            'https://ethereum.org',
            hashedMove,
            0,
            0,
            0,
            0,
            false
          )
      ).to.be.revertedWith('Only admins can call this function.')

      expect(await treasure.getOriginalPlayer(1)).to.equal(Alice.address)
      expect(await treasure.getTotalGames()).to.equal(1)
    })

    it('Should handle rescue ether owner properly', async () => {
      const txn = { to: treasure.address, value: ethers.utils.parseUnits('1') }
      await Admin.sendTransaction(txn)
      await Alice.sendTransaction(txn)
      expect(
        treasure
          .connect(Admin)
          .rescueEtherOwner(Alice.address, ethers.utils.parseUnits('1'))
      )
        .to.emit(treasure, 'RescuedEther')
        .withArgs(Alice.address, ethers.utils.parseUnits('1'))
    })

    it('Should handle rescue erc20 properly', async () => {
      await chessCoin
        .connect(Admin)
        .approve(treasure.address, ethers.utils.parseUnits('1'))
      await chessCoin
        .connect(Admin)
        .transfer(treasure.address, ethers.utils.parseUnits('1'))
      expect(
        treasure
          .connect(Admin)
          .rescueERC20Owner(
            chessCoin.address,
            Admin.address,
            ethers.utils.parseUnits('1')
          )
      )
        .to.emit(treasure, 'RescuedERC20')
        .withArgs(
          chessCoin.address,
          Admin.address,
          ethers.utils.parseUnits('1')
        )
    })
  })

  describe('Treasure Market Tests', () => {
    it('Should initialize properly', async () => {
      expect((await treasureMarket.gasLessRateLimit()).toString()).to.equal('0')
      expect((await treasureMarket.feePercentagePoint()).toString()).equal('25')
      expect((await treasureMarket.royaltyPercentagePoint()).toString()).equal(
        '100'
      )
      expect(
        await treasureMarket.isTrustedForwarder(
          process.env.FORWARDER_ADDRESS || ''
        )
      ).to.equal(true)
    })

    it('Should allow owner to set royalty percentage point.', async () => {
      await expect(treasureMarket.connect(Admin).setRoyalty(150))
        .to.emit(treasureMarket, 'RoyaltySet')
        .withArgs(150)
      await expect(treasureMarket.connect(Admin).setRoyalty(0))
        .to.emit(treasureMarket, 'RoyaltySet')
        .withArgs(0)
    })

    it('Should not allow non-owner to set royalty percentage point.', async () => {
      await expect(
        treasureMarket.connect(Alice).setRoyalty(150)
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })

    it('Should allow owner to set fee percentage point.', async () => {
      await expect(treasureMarket.connect(Admin).setFee(35))
        .to.emit(treasureMarket, 'FeeSet')
        .withArgs(35)
      await expect(treasureMarket.connect(Admin).setFee(0))
        .to.emit(treasureMarket, 'FeeSet')
        .withArgs(0)
    })

    it('Should not allow non-owner to set fee percentage point.', async () => {
      await expect(treasureMarket.connect(Alice).setFee(0)).to.be.revertedWith(
        'Ownable: caller is not the owner'
      )
    })
  })
})
