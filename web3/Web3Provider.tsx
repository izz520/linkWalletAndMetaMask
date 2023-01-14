import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect';
import { MetaMask } from "@web3-react/metamask";
import React, { ReactNode } from 'react';
import { hooks, walletConnect } from './connects/wallet'
import { hooks as MetaMaskHooks, metaMask } from "./connects/metamask";
const Web3Provider = ({ children }: { children: ReactNode }) => {
    const connectors: [WalletConnect | MetaMask, Web3ReactHooks][] = [
        [walletConnect, hooks],
        [metaMask, MetaMaskHooks]
    ]
    return (
        <Web3ReactProvider connectors={connectors}>
            {children}
        </Web3ReactProvider>
    )
}

export default Web3Provider;