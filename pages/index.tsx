import { WalletConnect } from '@web3-react/walletconnect';
import styles from '../styles/Home.module.css'
import { walletConnect, hooks as walletHooks } from '../web3/connects/wallet';
import { metaMask, hooks as metamaskHook } from "../web3/connects/metamask"
import { useWeb3React } from '@web3-react/core';
type ConnectType = "metamask" | "wallet"
export default function Home() {
  const { useAccounts: metamaskAccount } = metamaskHook;
  const { useAccounts: walletAccount } = walletHooks;
  const accountsMeta = metamaskAccount()
  const accountsWallet = walletAccount()
  const linkWallet = async (type: ConnectType) => {
    if (type === "metamask") {
      accountsMeta ? metaMask.resetState() : await metaMask.activate()
    } else {
      accountsWallet ? walletConnect.deactivate() :
        walletConnect.activate().then((res) => {
          console.log("链接成功");
        }).catch((err) => {
          console.log(err);
        })
    }
  }
  return (
    <div className={styles.container}>
      <div>
        {accountsMeta}
      </div>
      <div>
        {accountsWallet}
      </div>
      <button onClick={() => linkWallet("wallet")}>{accountsWallet ? "Wallet Disconnect" : "Wallet Connect"}</button>
      <button onClick={() => linkWallet("metamask")}>{accountsMeta ? 'MetaMask Disconnect' : "MetaMask Connect"}</button>
    </div>
  )
}
