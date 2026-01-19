const { ethers } = require("hardhat");
const config = require("./vault_config.json");

async function main() {
    const vault = await ethers.getContractAt("YieldVault", config.vault);

    // convertToAssets calculates how much 1 share is worth
    const oneShare = ethers.parseEther("1");
    const assetValue = await vault.convertToAssets(oneShare);

    console.log(`1.00 vTKN is now worth ${ethers.formatEther(assetValue)} TKN`);
    
    if (assetValue > oneShare) {
        console.log("Strategy is profitable.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
