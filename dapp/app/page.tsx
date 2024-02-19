"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";
import style from "./button.module.css";
export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");
  const [mintAmount, setMintAmount] = useState<number>(0);

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
      setcurrentData("Coins Minted!");
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
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

      <div className="mt-5 flex justify-center items-center">
        
        <div className={style.mintPanel}>
        <img src="https://raw.githubusercontent.com/JohnPaulPabelico/Ebak-Coin/main/dapp/images/toilet.jpg" />
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
              {currentData != "" ? "Coins Minted!" : "Mint Coins"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
