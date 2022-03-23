import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  // Example with injected providers
  injected: {
    display: {
      name: "Metamask",
      description: "Connect with the provider in your Browser",
    },
    package: null,
  },
  // Example with WalletConnect provider
  walletconnect: {
    display: {
      name: "Mobile",
      description: "Scan qrcode with your mobile wallet",
    },
    package: WalletConnectProvider,
    options: {
      infuraId: "INFURA_ID", // required
    },
  },
};

export default providerOptions;
