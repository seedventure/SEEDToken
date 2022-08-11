
const { BN } = require('@openzeppelin/test-helpers');
const Migrations = artifacts.require("Migrations");
const ERC20Seed = artifacts.require("ERC20Seed");

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(Migrations);

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
    let mySeedAddress = await deployer.deploy(ERC20Seed, SEED_SUPPLY, { from: accounts[0] });
    contractMyERC20 = await ERC20Seed.deployed();
  }
};
