export const DEBUG = true;
export const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/5a99373559f8468eb4d40e15b3dd9812";
export const TESTNET_RPC_URL = "https://rinkeby.infura.io/v3/5a99373559f8468eb4d40e15b3dd9812";

export const contractAddress = "0x5ea3e08f2b2a1ea1a336d09f5a47dafddb5c4137";

export const NETWORK_ID = DEBUG ? 4 : 1;
export const RPC_URL = NETWORK_ID == 4 ? TESTNET_RPC_URL : MAINNET_RPC_URL;
export const NETWORK_NAME = DEBUG ? 'RinkeBy' : 'Mainnet'

export const OPENSEA_LINK = 'https://testnets.opensea.io/collection/kanessanft-plus-size-lady';