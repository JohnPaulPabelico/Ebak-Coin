import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import Image from "next/image";

function Withdraw() {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [elapsedStakeTime, setElapsedStakeTime] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const withdrawAmountString = withdrawAmount?.toString();

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

  const getWithdrawAmount = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const withdrawAmount = await contract.getWithdraw(signer);

      setWithdrawAmount(withdrawAmount);
    } catch (e: any) {
      console.log("Error data:", e.data);
      if (e.data) {
        const decodedError = contract.interface.parseError(e.data);
        console.log(`Fetching stake failed: ${decodedError?.args}`);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  const getElapsedStakeTime = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const elapsedStakeTime = await contract.getElapsedStakeTime(signer);

      setElapsedStakeTime(elapsedStakeTime);
    } catch (e: any) {
      console.log("Error data:", e.data);
      if (e.data) {
        const decodedError = contract.interface.parseError(e.data);
        console.log(`Fetching stake failed: ${decodedError?.args}`);
      } else {
        console.log("An unknown error occurred.");
      }
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
        <div className="mb-3 minting-container flex items-center">
          <span className="mt-10 flex justify-center items-center font-turds text-xl">
            Withdrawable Ebak: &nbsp;{" "}
            <p className="font-sans text-3xl" style={{ marginTop: "-4px" }}>
              {withdrawAmountString}
            </p>
            <Image
              src="/images/Ebak-Icon.png"
              alt="Left Image"
              width={30}
              height={30}
              className="ml-1 mb-1"
            />
          </span>
          <button
            onClick={() => {
              getWithdrawAmount();
            }}
          >
            <Image
              src="/images/refresh.svg"
              alt="Left Image"
              width={20}
              height={20}
              className="ml-4 mt-10"
              style={{ filter: "invert(1)", transition: "transform 0.3s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </button>
        </div>

        <div className="mb-10 minting-container flex items-center">
          <p className=" flex justify-center items-center font-turds text-xl ">
            Lock Status: &nbsp;
            <span style={{ color: elapsedStakeTime > 60 ? "lime" : "maroon" }}>
              {elapsedStakeTime > 60
                ? " You can poop now"
                : " You are still constipated"}
            </span>
          </p>
          <button
            onClick={() => {
              getElapsedStakeTime();
            }}
          >
            <Image
              src="/images/refresh.svg"
              alt="Left Image"
              width={20}
              height={20}
              className="ml-4"
              style={{ filter: "invert(1)", transition: "transform 0.3s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </button>
        </div>

        <button
          className="mt-10 flex justify-center items-center font-turds text-xl rounded-lg p-4 bg-yellow-400 transition duration-200 ease-in-out hover:bg-yellow-500 hover:shadow-lg"
          onClick={withdrawCoin}
        >
          Withdraw
        </button>
        <div className="mt-5 ">
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
