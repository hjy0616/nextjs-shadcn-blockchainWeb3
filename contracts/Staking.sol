// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    mapping(address => uint256) public stakedAmount;

    function stake(uint256 amount) public {
        stakedAmount[msg.sender] += amount;
    }

    function unstake(uint256 amount) public {
        require(stakedAmount[msg.sender] >= amount, "Not enough staked");
        stakedAmount[msg.sender] -= amount;
    }

    function getStakedAmount(address user) public view returns (uint256) {
        return stakedAmount[user];
    }
}