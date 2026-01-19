const { ethers } = require("hardhat");
const config = require("./vault_config.json");

async function main() {
    const [admin] = await ethers.getSigners();
    const asset = await ethers.getContractAt("MockAsset", config.asset, admin);
    const vault = await ethers.getContractAt("YieldVault", config.vault, admin);

    const yieldAmount = ethers.parseEther("10"); // 10% yield on the 100 deposit

    console.log("Simulating Yield Generation (Adding 10 TKN to vault)...");
    
    await asset.approve(config.vault, yieldAmount);
    
    // We call harvestRewards to donate funds to the pool
    const tx = await vault.harvestRewards(yieldAmount);
    await tx.wait();

    console.log("Yield Added! Share price has increased.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
