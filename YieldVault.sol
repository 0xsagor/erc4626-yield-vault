// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YieldVault is ERC4626, Ownable {
    constructor(IERC20 asset) 
        ERC4626(asset) 
        ERC20("Vault Share", "vTKN") 
        Ownable(msg.sender) 
    {}

    /**
     * @dev Simulates a strategy harvesting yield.
     * In production, this would interact with Aave/Compound.
     * Here, the owner just donates assets to the pool.
     */
    function harvestRewards(uint256 amount) external {
        // Transfer assets from msg.sender to the vault
        // This increases totalAssets() without minting new shares
        // effectively increasing the price per share.
        IERC20(asset()).transferFrom(msg.sender, address(this), amount);
    }
}
