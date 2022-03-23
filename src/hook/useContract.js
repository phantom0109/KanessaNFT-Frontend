import { Contract } from "ethers"

const useContract = (address, abi) => {
    const contract = new Contract(address, abi);
    return contract;
}

export default useContract;