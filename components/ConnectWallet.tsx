"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  async function checkIfWalletIsConnected() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }
      } catch (error) {
        console.error("An error occurred while checking the wallet connection:", error)
      }
    }
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
      } catch (error) {
        console.error("An error occurred while connecting the wallet:", error)
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html")
    }
  }

  return (
    <div>
      {!account ? (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      ) : (
        <Button variant="outline">
          {account.slice(0, 6)}...{account.slice(-4)}
        </Button>
      )}
    </div>
  )
}