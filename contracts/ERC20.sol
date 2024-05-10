// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/// @custom:security-contact fcihpy@gmail.com
contract WrapBtcCoin is ERC20, ERC20Permit {
    constructor() ERC20("wrap btc coin", "WBTC") ERC20Permit("wrap btc coin") {
        _mint(msg.sender, 2100 * 10 ** decimals());
    }
}