import axios from "./axios";

export const getWhiteListInfo = async (address) => {
  try {
    let response = await axios.get(`/whitelist/${address}`);
    return response.data;
  } catch (error) {
    console.log("loginerror: ", error);
    return Promise.reject(error.response.data.message);
  }
};

export const getWhitelistCount = async () => {
  try {
    let response = await axios.get('/whitelist-count');
    return response.data.count;
  } catch (error) {
    console.log('whitelist-count: ', error);
    return 0;
  }
}

