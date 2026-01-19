const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);

    // 1. Deploy Underlying Asset
    const Asset = await ethers.getContractFactory("MockAsset");
    const asset = await Asset.deploy();
    await asset.waitForDeployment();
    const assetAddr = await asset.getAddress();
    console.log("Asset:", assetAddr);

    // 2. Deploy Vault
    const Vault = await ethers.getContractFactory("YieldVault");
    const vault = await Vault.deploy(assetAddr);
    await vault.waitForDeployment();
    const vaultAddr = await vault.getAddress();
    console.log("Vault:", vaultAddr);

    // Save Config
    const config = { asset: assetAddr, vault: vaultAddr };
    fs.writeFileSync("vault_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
