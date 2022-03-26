import { Contract } from "@ethersproject/contracts";
import {  useCall, useContractCall } from "@usedapp/core"
import { BigNumber } from "ethers";
import contractAbi from "../abi/KanessaNFT.json";
import { contractAddress } from "../config/config";


const useNFTPrice = () => {
    const {value, error} = useCall({
        contract: new Contract(contractAddress, contractAbi.abi),
        method: "price",
        args: []
    }) || {value: [BigNumber.from(0)]};

    return value ? value[0] : BigNumber.from(0);
}

export default useNFTPrice;