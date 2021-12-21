import apiFetcher from './axios';

interface Record {
  id?: string;
  date?: string;
  content?: string;
}

interface RecordApiResponse {
  status: number;
  text?: string;
}

// 获取记录
export const apiGetRecords = () => {
  return apiFetcher<RecordApiResponse & { records: Record[] }>({
    method: 'GET',
    url: '/record/getRecords',
  });
};

// 删除记录
export const apiDeleteRecord = (id: string) => {
  return apiFetcher<RecordApiResponse>({
    method: 'DELETE',
    url: `/record/deleteRecord/${id}`,
  });
};

// 更新记录
export const apiUpdateRecord = (id?: string, record?: Record | undefined) => {
  return apiFetcher<RecordApiResponse>({
    method: 'PUT',
    url: `/record/updateRecord/${id}`,
    data: {
      record,
    },
  });
};

// 新建记录
export const apiCreateRecord = (record?: Record | undefined) => {
  return apiFetcher<RecordApiResponse>({
    method: 'POST',
    url: '/record/createRecord',
    data: {
      record,
    },
  });
};
