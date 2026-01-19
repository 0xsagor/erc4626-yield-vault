const { ethers } = require("hardhat");
const config = require("./vault_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const asset = await ethers.getContractAt("MockAsset", config.asset, user);
    const vault = await ethers.getContractAt("YieldVault", config.vault, user);

    const amount = ethers.parseEther("100");

    console.log("Approving Vault...");
    await asset.approve(config.vault, amount);

    console.log(`Depositing 100 TKN...`);
    // ERC-4626 deposit function
    const tx = await vault.deposit(amount, user.address);
    await tx.wait();

    const shares = await vault.balanceOf(user.address);
    console.log(`Received ${ethers.formatEther(shares)} vTKN Shares`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
