const { ethers } = require("hardhat");
const config = require("./vault_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const vault = await ethers.getContractAt("YieldVault", config.vault, user);
    const asset = await ethers.getContractAt("MockAsset", config.asset, user);

    const shares = await vault.balanceOf(user.address);
    console.log(`Redeeming ${ethers.formatEther(shares)} Shares...`);

    const balanceBefore = await asset.balanceOf(user.address);

    // Redeem: Burn shares, receive assets
    const tx = await vault.redeem(shares, user.address, user.address);
    await tx.wait();

    const balanceAfter = await asset.balanceOf(user.address);
    const received = balanceAfter - balanceBefore;

    console.log(`Redeemed! Received ${ethers.formatEther(received)} TKN.`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
