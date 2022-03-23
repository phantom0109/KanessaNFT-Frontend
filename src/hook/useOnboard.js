import Onboard from 'bnc-onboard';

const NETWORK_ID = 1; // mainnet

const useOnboard = (subscribers) => {
    const onboard = Onboard({
        // dappId: BLOCKNATIVE_KEY,
        networkId: NETWORK_ID,
        subscriptions: {
          ...subscribers
        }
    });

    return onboard;
}

export default useOnboard;