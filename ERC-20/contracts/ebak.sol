// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ebak is ERC20, Ownable {
    constructor(address initialOwner) 
        ERC20("Ebak", "TAE") 
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        uint256 adjustedAmount = amount * 1e18;
        _mint(to, adjustedAmount);
    }
}