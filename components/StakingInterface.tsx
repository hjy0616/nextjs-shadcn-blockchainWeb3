"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ethers } from 'ethers'

// 이 부분은 실제 배포된 컨트랙트 주소로 대체해야 합니다.
const STAKING_CONTRACT_ADDRESS = "0x...";

// 이 부분은 실제 컨트랙트 ABI로 대체해야 합니다.
const STAKING_CONTRACT_ABI = [
  "function stake(uint256 amount) public",
  "function unstake(uint256 amount) public",
  "function getStakedAmount(address user) public view returns (uint256)"
];

export default function StakingInterface() {
  const [stakeAmount, setStakeAmount] = useState('')
  const [stakedAmount, setStakedAmount] = useState('0')

  useEffect(() => {
    fetchStakedAmount()
  }, [])

  async function fetchStakedAmount() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI, signer)

      try {
        const amount = await contract.getStakedAmount(await signer.getAddress())
        setStakedAmount(ethers.utils.formatEther(amount))
      } catch (error) {
        console.error("Error fetching staked amount:", error)
      }
    }
  }

  async function handleStake() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI, signer)

      try {
        const transaction = await contract.stake(ethers.utils.parseEther(stakeAmount))
        await transaction.wait()
        fetchStakedAmount()
      } catch (error) {
        console.error("Error staking:", error)
      }
    }
  }

  async function handleUnstake() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI, signer)

      try {
        const transaction = await contract.unstake(ethers.utils.parseEther(stakeAmount))
        await transaction.wait()
        fetchStakedAmount()
      } catch (error) {
        console.error("Error unstaking:", error)
      }
    }
  }

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center">Staking Interface</h2>
      <p className="mb-4 text-center">Staked Amount: {stakedAmount} ETH</p>
      <div className="mb-4">
        <Label htmlFor="stake-amount">Amount to Stake/Unstake</Label>
        <Input
          id="stake-amount"
          type="number"
          placeholder="Enter amount"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={handleStake}>Stake</Button>
        <Button onClick={handleUnstake} variant="outline">Unstake</Button>
      </div>
    </div>
  )
}