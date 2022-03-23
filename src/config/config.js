export const DEBUG = false;
export const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/5a99373559f8468eb4d40e15b3dd9812";
export const TESTNET_RPC_URL = "https://rinkeby.infura.io/v3/5a99373559f8468eb4d40e15b3dd9812";

export const contractAddress = "0xC84EfB0BFC2b472F6E923612aA566f76a0Ea2A69";

export const NETWORK_ID = 4;
export const RPC_URL = NETWORK_ID == 4 ? TESTNET_RPC_URL : MAINNET_RPC_URL;
