const HDWalletProvider = require('@truffle/hdwallet-provider'); 
require('dotenv').config();

const MNEMONIC = process.env.MNEMONIC;
const INFURA_ID = process.env.INFURA_ID;
const GOERLI_URL="https://goerli.infura.io/v3/6cf8dddd247f462c8db6bf624bc7e2cf";

module.exports = {
  contracts_build_directory: "../client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC , GOERLI_URL), network_id: 5,
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17",      // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
      }
    }
  },
};

