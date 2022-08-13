
const { BN } = require('@openzeppelin/test-helpers');

const ERC20Seed = artifacts.require("ERC20Seed");
const Airdrop = artifacts.require("Airdrop");

module.exports = async (deployer, network, accounts) => {
  const SEED_SUPPLY = new BN(300000000);

  if (network == "development") {
    const tokenOwner = accounts[0];
    let mySeedAddress = await deployer.deploy(ERC20Seed, SEED_SUPPLY, { from: tokenOwner });
    contractMyERC20 = await ERC20Seed.deployed();
  }  else if (network == "kovan") {
    const accounts = await web3.eth.getAccounts();
    let mySeedAddress = await deployer.deploy(ERC20Seed, SEED_SUPPLY, { from: accounts[0] });
    contractMyERC20 = await ERC20Seed.deployed();
  } else if (network == "polygon") {
    const accounts = await web3.eth.getAccounts();
    const tokenOwner = accounts[0];
    
    let mySeedAddress = await deployer.deploy(ERC20Seed, SEED_SUPPLY, { from: tokenOwner});
    contractMyERC20 = await ERC20Seed.deployed();
    console.log(`Seed Contract deployed: ${contractMyERC20.address}`)

    let myAirdropAddress = await deployer.deploy(Airdrop, { from: tokenOwner});
    contractMyAirdrop = await Airdrop.deployed();
    console.log(`Airdrop Contract deployed: ${contractMyAirdrop.address}`)
  }
};
