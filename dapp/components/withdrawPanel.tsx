import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import Image from "next/image";

function Withdraw() {
  const [stakingAmount, setStakingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };



  return (
    <div
      className="flex grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left rounded-lg p-4 bg-gradient-to-b from-amber-700 to-amber-900 h-96"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="flex justify-center items-center flex-col">

        <button
          className="mt-10 flex justify-center items-center font-turds text-xl rounded-lg p-4 bg-yellow-400 transition duration-200 ease-in-out hover:bg-yellow-500 hover:shadow-lg"
          onClick={withdrawCoin}
        >
          Withdraw
        </button>
        <div className="mt-5 mb-4">
          {submitted && (
            <div className="minting-container flex items-center">
              <Image
                src="/images/toilet.png"
                alt="Left Image"
                width={40}
                height={40}
                className="mr-5"
              />
              <p className="font-turds">Withdraw successful!</p>
              <Image
                src="/images/toilet.png"
                alt="Left Image"
                width={40}
                height={40}
                className="ml-5"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          {submitted && (
            <div className="minting-container flex items-center">
              <a
                href={`https://sepolia.arbiscan.io/tx/${transactionHash}`}
                target="_blank" // Open in a new tab/window
                rel="noopener noreferrer"
                className="font-turds text-blue-500  cursor-pointer"
              >
                Click to View Transaction 
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
