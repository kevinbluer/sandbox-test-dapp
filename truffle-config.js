const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const accountIndex = 0;
const numAccounts = 10;
const shareNonce = 0;
const mnemonic = process.env['TEAMS_MNEMONIC'];
const sandbox = process.env['TEAMS_SANDBOX'];
const network_id = process.env['TEAMS_NETWORK_ID'];

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: { // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    teams: {
      provider: () => new HDWalletProvider(mnemonic, sandbox, accountIndex, numAccounts, shareNonce),
      network_id
    }
  },
    compilers: {
      solc: {
        version: '0.5.17',
      }
    }
};
