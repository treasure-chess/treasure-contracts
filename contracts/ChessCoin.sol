// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ChessCoin is ERC20 {
    constructor(uint256 _amount) ERC20("ChessCoin", "CHSC") {
        _mint(msg.sender, _amount);
    }
}
