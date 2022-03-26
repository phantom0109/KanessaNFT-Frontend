import { Contract } from "@ethersproject/contracts";
import {  useCall, useContractCall } from "@usedapp/core"
import contractAbi from "../abi/KanessaNFT.json";
import { contractAddress } from "../config/config";


const useWhitelistMode = () => {
    const {value, error} = useCall({
        contract: new Contract(contractAddress, contractAbi.abi),
        method: "whitelistMode",
        args: []
    }) || {value: [true]};

    return value ? value[0] : true;
}

export default useWhitelistMode;