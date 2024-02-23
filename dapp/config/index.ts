import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x6309BcFF460e3a610757e3f7f1bEA542FFB76F0c",
        abi as any,
        signer
    );
}