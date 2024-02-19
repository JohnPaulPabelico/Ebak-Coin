import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x5874F7d16179C802DCD9f52e63f30Fc84394997A",
        abi as any,
        signer
    );
}