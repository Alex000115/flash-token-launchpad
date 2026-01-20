// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Child Contract: The Token
contract StandardToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply, address owner) ERC20(name, symbol) {
        _mint(owner, initialSupply * 10**decimals());
    }
}

// Parent Contract: The Factory
contract TokenFactory {
    event TokenDeployed(address tokenAddress, string name, string symbol, address owner);

    function deployToken(string memory name, string memory symbol, uint256 supply) external returns (address) {
        StandardToken newToken = new StandardToken(name, symbol, supply, msg.sender);
        emit TokenDeployed(address(newToken), name, symbol, msg.sender);
        return address(newToken);
    }
}
