// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ERC20Seed is ERC20, Ownable {
    using SafeMath for uint256;

    constructor (uint256 supply_) ERC20("SEED Token", "SEED") {
        uint256 totalFinalSupply = supply_.mul(1e18);
        _mint(_msgSender(), totalFinalSupply);
    }

    receive() external payable {
        revert("ETH not accepted");
    }

}


