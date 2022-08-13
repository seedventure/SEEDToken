const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

const Web3 = require('web3');
// Ganache UI on 8545
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const ERC20Seed = artifacts.require('ERC20Seed'); // Loads a compiled contract
const Airdrop = artifacts.require('Airdrop'); // Loads a compiled contract

const fromWei = (x) => web3.utils.fromWei(x.toString());
const toWei = (x) => web3.utils.toWei(x.toString());


contract('AirdropContract', function (accounts) {
    const supply = new BN('300000000');
    const [ owner, account1, account2, account3, account4, account5 ] = accounts;

    it("Deploy contracts", async function () {
        this.token = await ERC20Seed.new(supply, { from: owner });
        this.airdrop = await Airdrop.new({ from: owner });
    });

    it("performs an airdrop", async function () {
        await this.token.approve(this.airdrop.address, toWei(150000));
        await this.airdrop.doAirdrop(this.token.address, [account1, account2, account3, account4, account5], 
            [toWei(21000), toWei(20000), toWei(15000), toWei(12000), toWei(8000)]);
    })

    it("check amounts in accounts", async function () {
        bal = await this.token.balanceOf(owner)
        console.log("Owner Balance: " + fromWei(bal));

        bal = await this.token.balanceOf(account1)
        console.log("account1 Balance: " + fromWei(bal));

        bal = await this.token.balanceOf(account2)
        console.log("account2 Balance: " + fromWei(bal));

        bal = await this.token.balanceOf(account3)
        console.log("account3 Balance: " + fromWei(bal));

        bal = await this.token.balanceOf(account4)
        console.log("account4 Balance: " + fromWei(bal));

        bal = await this.token.balanceOf(account5)
        console.log("account5 Balance: " + fromWei(bal));
    })

})