// goerli
import goerli_SimpleStorage from "./deployed-contracts/goerli/SimpleStorage.json";

// ropsten
import ropsten_SimpleStorage from "./deployed-contracts/ropsten/SimpleStorage.json";

// ganache
import ganache_SimpleStorage from "./contracts/SimpleStorage.json";

const { chainId } = window.ethereum
let SimpleStorage;

switch(chainId) {
  case '0x3':
    SimpleStorage = ropsten_SimpleStorage
    break;

  /* case '0x4':
   *   SimpleStorage = rinkeby_SimpleStorage
   *   break; */

  case '0x5':
    SimpleStorage = goerli_SimpleStorage
    break;

  default:
    SimpleStorage = ganache_SimpleStorage
}

const options = {
  contracts: [SimpleStorage],
  polls: {
    accounts: 10 * 1000
  },
  events: {
    SimpleStorage: [ "CookieJarRaided", "DonationReceived", "NewGuest", "StorageSet" ],
  }
};

export default options;
