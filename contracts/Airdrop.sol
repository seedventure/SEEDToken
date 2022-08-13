// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract Airdrop {
    using SafeERC20 for IERC20;

    /**
    * @dev doAirdrop is the main method for distribution
    * @param token airdropped token address
    * @param addresses address[] addresses to airdrop
    * @param values address[] values for each address
    */
    function doAirdrop(IERC20 token, address[] memory addresses, uint256[] memory values) external returns (uint256) {
        uint256 i = 0;

        while (i < addresses.length) {
            token.safeTransferFrom(msg.sender, addresses[i], values[i]);
            i += 1;
        }

        return i;
    }
}