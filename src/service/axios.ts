import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';

type FilteredResponse<T> = Promise<T>;

axios.defaults.baseURL = '/api';

axios.interceptors.response.use(
  function (response) {
    const filteredResponse = response.data;
    return filteredResponse;
  },
  function (error) {
    console.log(error);
    return message.error('服务器开小差啦～');
  }
);

const apiFetcher = <T = any>(
  config: AxiosRequestConfig<any>
): FilteredResponse<T> => {
  return axios(config) as unknown as FilteredResponse<T>;
};

export default apiFetcher;
