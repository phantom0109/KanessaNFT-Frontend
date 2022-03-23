import axios from "./axios";

const getWhiteListInfo = async (address) => {
  try {
    let response = await axios.get(`/whitelist/${address}`);
    return response.data;
  } catch (error) {
    console.log("loginerror: ", error);
    return Promise.reject(error.response.data.message);
  }
};

export default getWhiteListInfo;
