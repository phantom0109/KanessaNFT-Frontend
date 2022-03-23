import { useContractFunction } from "@usedapp/core"
import { contractAddress } from "../config/config"
import useContract from "./useContract"
import contractAbi from "../abi/KanessaNFT.json";

export const useMintNormal = () => {
    const contract = useContract(contractAddress, contractAbi.abi);
    const { state, send } = useContractFunction(contract, 'payToMint');
    return {state, send};
}

export const useMintWhitelist = () => {
    const contract = useContract(contractAddress, contractAbi.abi);
    const { state, send } = useContractFunction(contract, 'payToWhiteMint');
    return {state, send};
}