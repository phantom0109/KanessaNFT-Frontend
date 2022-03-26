import { useEthers } from "@usedapp/core"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { NETWORK_ID, NETWORK_NAME, RPC_URL } from "../config/config";
import useOnboard from "../hook/useOnboard";

const SnackBar = () => {
    const {account, chainId, library, activate, activateBrowserWallet} = useEthers();
    const [visible, setVisible] = useState(false);
    
    const onboardSubscriber = {
        wallet: async (wallet) => {
            console.log('wallet: ', wallet)
            await onboard.walletCheck();
            if (wallet && wallet.provider) {
                await activate(wallet.provider);
            }
        }
    }
    const onboard = useOnboard(onboardSubscriber);
    
    useEffect(() => {
        setVisible(account && (chainId !== NETWORK_ID))
    }, [chainId, account]);

    const switchChain = async (e) => {
        activateBrowserWallet();
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${NETWORK_ID}` }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainId: NETWORK_ID,
                        chainName: NETWORK_NAME,
                        rpcUrls: [RPC_URL] /* ... */,
                      },
                    ],
                  });
                } catch (addError) {
                  console.log('net add error: ', addError)
                }
            }
        }
    }


    return (
        <Wrapper className={visible ? '' : 'hide'}>
            You are not on {NETWORK_NAME}. Please switch to <Button onClick={switchChain}>{NETWORK_NAME}</Button>.
            <Img src="/assets/images/xmark.png" onClick={() => setVisible(false)}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: fixed;
    width: 50vw;
    padding: 10px 20px;
    left: 25vw;
    border: none;
    border-radius: 8px; 
    bottom: 30px;
    color: white;
    font-size: 20px;
    text-align: center;
    background: rgb(189,43,43);
    background: linear-gradient(45deg, rgba(189,43,43,1) 0%, rgba(161,67,13,1) 100%);
    &.hide {
        display: none;
    }
`;

const Button = styled.span`
    text-decoration: underline;
`

const Img = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 10px;
`


export default SnackBar