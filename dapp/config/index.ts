import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xaA5B2ccF4Bf2A73117A5BFF1bFe2010BFc7A69c8",
        abi as any,
        signer
    );
}