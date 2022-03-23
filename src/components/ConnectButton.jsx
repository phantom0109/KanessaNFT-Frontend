import React from 'react';
import styled from 'styled-components';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
import useOnboard from '../hook/useOnboard';
import { displayAddress } from '../utils/helpers';
import ethIcon from '../assets/eth.png';

const ConnectButton = () => {
    const { account, deactivate, activate } = useEthers();

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
    const etherBalance = useEtherBalance(account)

    const connectWallet = async () => {
        await onboard.walletSelect();
        // await onboard.walletCheck()
    }

        return (
            <>
                {!account && <Button onClick={(e) => {e.stopPropagation(); connectWallet()}}>Connect</Button>}

                {account && (
                    <AccountView onClick={(e) => {e.stopPropagation(); deactivate()}}>
                        <img src={ethIcon} />
                        <div>
                            {
                                etherBalance &&
                                <span className="balance">{parseFloat(ethers.utils.formatEther(etherBalance)).toFixed(2)} ETH</span>
                            }
                            <span className="account">{displayAddress(account)}</span>
                        </div>
                    </AccountView>
                )
                }
            </>
        )
    }

const Button = styled.button`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    padding: 20px;
    color: #131218;
    font-size: 18px;
    font-family: 'Oswald';
    position: relative;
    border: 1px solid #131218;
    border-radius: 16px;
    background-clip: padding-box;
    padding: 10px;
    cursor: pointer;
    @media(max-width: 991px) {
        padding: 5px;
        width: 100px;
        font-size: 16px;
        border-radius: 12px;
    }
    &: hover {
        color: #9f783e
    }
    &:after {
        position: absolute;
        top: -2px; bottom: -2px;
        left: -2px; right: -2px;
        background: linear-gradient(#6A4EE8, #FF9B63);
        content: '';
        z-index: -1;
        border-radius: 16px;
        @media(max-width: 991px) {
            border-radius: 12px;
        }
    }
`
const AccountView = styled.div`
    width: fit-content;
    display: flex;
    color: #131218;
    gap: 5px;
    border-radius: 12px;
    background: transparent;
    padding: 8px 15px;
    cursor: pointer;
    border-color: #131218;
    border: 1px solid ;
    &: hover {
    }
    img {
        width: 32px;
        padding: 5px;
        background: #d5a356;
        border-radius: 8px;
    }
    div {
        display: block;
    }
    span {
        display: block;
    }
    .account {
        font-size: 11px;
        color: #131218b0;
    }
    .balance {
        font-size: 13px;
    }

`;
    export default ConnectButton;