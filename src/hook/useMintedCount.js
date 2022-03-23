import { Contract } from "@ethersproject/contracts";
import {  useCall, useContractCall } from "@usedapp/core"
import { BigNumber } from "ethers";
import contractAbi from "../abi/KanessaNFT.json";
import { contractAddress } from "../config/config";


const useMintedCount = () => {
    const {value, error} = useCall({
        contract: new Contract(contractAddress, contractAbi.abi),
        method: "count",
        args: []
    }) || {value: [BigNumber.from(0)]};
    return value[0];
}

export default useMintedCount;