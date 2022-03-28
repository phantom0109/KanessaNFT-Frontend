import { useEffect, useState } from "react"
import {getWhitelistCount as getCount} from '../utils/whitelist';

const useWhitelistCount = () => {
    const [count ,setCount] = useState(0);
    useEffect(() => {
        const getWhitelistCount = async () => {
            let _count = await getCount();
            setCount(_count);
        }

        setTimeout(() => {
            getWhitelistCount();
        }, 2000);

        const timerId = setInterval(() => {
            getWhitelistCount();
        }, 10 * 1000);
        return () => {
            clearInterval(timerId)
        }
    }, []);


    return count;
}

export default useWhitelistCount;