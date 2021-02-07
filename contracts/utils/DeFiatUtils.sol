// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "../lib/token/ERC20/IERC20.sol";
import "../lib/access/Ownable.sol";

abstract contract DeFiatUtils is Ownable {

    // Sweep any tokens/ETH accidentally sent or airdropped to the contract
    function sweep(address token) external onlyOwner {
        uint256 amount = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(owner(), amount); // use of the ERC20 traditional transfer

        if (address(this).balance > 0) {
            payable(owner()).transfer(address(this).balance);
        }
    }


    // Self-Destruct contract to free space on-chain, sweep any ETH to owner
    function kill() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}