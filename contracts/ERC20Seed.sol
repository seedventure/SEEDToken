// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ERC20Seed is ERC20, Ownable {
    using SafeMath for uint256;

    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _finalSupply;

    constructor (string memory name_, string memory symbol_, uint256 supply_) ERC20(name_, symbol_) {
        uint256 totalFinalSupply = supply_.mul(1e18);
        _mint(_msgSender(), totalFinalSupply);
    }

    // ------------------------------------------------------------------------
    // Don't accept ETH
    // ------------------------------------------------------------------------
    // fallback() external payable {
    //     revert("ETH not accepted");
    // }

    receive() external payable {
        revert("ETH not accepted");
    }

}


