"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";
import style from "./button.module.css";
export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentMintData, setCurrentMintData] = useState("");
  const [currentStakeData, setCurrentStakeData] = useState("");
  const [mintAmount, setMintAmount] = useState<number>(0);
  const [stakeAmount, setStakeAmount] = useState<number>(0);

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };

  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(walletKey, mintAmount);
      console.log(tx);
      await tx.wait();
      setCurrentMintData("Coins Minted!");
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakeAmount);
      console.log(tx);
      await tx.wait();
      setCurrentStakeData("Coins Staked!");
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Staking failed: ${decodedError?.args}`);
    }
  };

  return (
    <main className="">
      <div className="flex justify-center items-center">
        <button
          onClick={() => {
            connectWallet();
          }}
          className={style.buttonConnect}
        >
          {walletKey != "" ? "Connected" : "Connect Wallet"}
        </button>
      </div>

      <div className="flex justify-center mt-5">
        {/* First Mint Panel */}
        <div className={`${style.mintPanel} m-5`}>
          <img
            src="https://raw.githubusercontent.com/JohnPaulPabelico/Ebak-Coin/main/dapp/images/toilet.png"
            width="300"
          />
          <div className="mt-4">
            <label htmlFor="mintAmount" className="mr-2">
              Mint Amount:
            </label>
            <input
              type="number"
              id="mintAmount"
              value={mintAmount}
              onChange={(e) => setMintAmount(Number(e.target.value))}
              style={{ color: "black" }}
            />
            <div className="flex justify-center items-center mt-2">
              <button
                onClick={() => {
                  mintCoin();
                }}
                className={style.buttonConnect}
              >
                {currentMintData !== "" ? "Coins Minted!" : "Mint Coins"}
              </button>
            </div>
          </div>
        </div>

        {/* Second Mint Panel */}
        <div className={`${style.mintPanel} m-5`}>
          <img
            src="https://raw.githubusercontent.com/JohnPaulPabelico/Ebak-Coin/main/dapp/images/toilet.png"
            width="300"
          />
          <div className="mt-4">
            <label htmlFor="stakeAmount" className="mr-2">
              Stake Amount:
            </label>
            <input
              type="number"
              id="mintAmount"
              value={mintAmount}
              onChange={(e) => setMintAmount(Number(e.target.value))}
              style={{ color: "black" }}
            />
            <div className="flex justify-center items-center mt-2">
              <button
                onClick={() => {
                  mintCoin();
                }}
                className={style.buttonConnect}
              >
                {currentMintData !== "" ? "Coins Staked!" : "Stake Coins"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
