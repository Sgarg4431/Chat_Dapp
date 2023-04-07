require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    sepolia:{
      url:"https://sepolia.infura.io/v3/d0770f7d40af44699905a3ec17f7ded1",
      accounts:[process.env.privateKey]
    }
  }
};
// 0x1Fa721cFBAC4b7642fAe6b105D54322dd4951824