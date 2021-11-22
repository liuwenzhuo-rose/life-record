import axios from 'axios';

export const getRecords = () => {
  return axios({
    baseURL: 'http://localhost:8000',
    method:'GET',
    url: '/',
  });
};

export const deleteRecords = (id: number) => {
  return axios({
    baseURL: 'http://localhost:8000',
    method:'DELETE',
    url: `/record/${id}`,
  });
};