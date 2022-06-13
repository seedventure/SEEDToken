const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

const Web3 = require('web3');
// Ganache UI on 8545
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const { shouldBehaveLikeERC20 } = require('./ERC20.behaviour');

// Please choose which kind of test are you performing, with ganache UI or ganache cli
// Ganache UI on 8545
//const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// ganache-cli
// const ganache = require('ganache-cli');
// const web3 = new Web3();
// web3.setProvider(ganache.provider());

const BigNumber = web3.utils.BN;
require("chai")
  .use(require("chai-bn")(BigNumber))
  .should();

const ERC20Seed = artifacts.require('ERC20Seed'); // Loads a compiled contract
const { ZERO_ADDRESS } = constants;


contract('ERC20SeedContract', function (accounts) {
  const name = 'Seed Token';
  const supply = new BN('30000000');
  const [ owner, recipient, anotherAccount ] = accounts;
  
  const chainId = 1; // await web3.eth.net.getId(); See: https://github.com/trufflesuite/ganache-core/issues/515
  
  beforeEach(async function () {
    this.token = await ERC20Seed.new(name, "SEED", supply, { from: owner });
  });
  
  shouldBehaveLikeERC20('ERC20', (new BN('30000000000000000000000000')), owner, recipient, anotherAccount); // Appended 18 0s because initialSupply is multiplied by 10**18 in the ERC20Seed constructor
  
  describe('is initialized properly', function () {
    it('deploys the token', async function () {
      expect(await this.token.address).to.be.not.equal(ZERO_ADDRESS);
    });

    it('has a name', async function () {
      expect(await this.token.name()).to.equal(name);
    });

    it('has a symbol', async function () {
      expect(await this.token.symbol()).to.equal("SEED");
    });

    it('has 18 decimals', async function () {
      const dec = (await this.token.decimals()).toString();
      expect(dec).to.equal('18');
    });
  });

  describe('Ownable', function () {
    it('deployer is owner', async function () {
      expect(await this.token.owner()).to.equal(owner);
    });

    it('should renounce ownership', async function () {
      await this.token.renounceOwnership({ from: owner });
      expect(await this.token.owner()).to.equal(ZERO_ADDRESS);
    });

    it('should not renounce ownership when not called by owner', async function () {
      try {
        await this.token.renounceOwnership({ from: accounts[1] });
      } catch(err) {
        expect(err.reason).to.be.equal('Ownable: caller is not the owner');
      }
    });

    it('should transfer ownership', async function () {
      await this.token.transferOwnership(accounts[1], { from: owner });
      expect(await this.token.owner()).to.equal(accounts[1]);
    });

    it('should not transfer ownership when transferred to zero address', async function () {
      try {
        await this.token.transferOwnership(ZERO_ADDRESS, { from: owner });
      } catch(err) {
        expect(err.reason).to.be.equal('Ownable: new owner is the zero address');
      }
    });

    it('should not transfer ownership when not called by owner', async function () {
      try {
        await this.token.transferOwnership(accounts[1], { from: accounts[2] });
      } catch(err) {
        expect(err.reason).to.be.equal('Ownable: caller is not the owner');
      }
    });
  });

});
