import { useEffect, useState } from 'react';
import { deleteRecords, getRecords } from '../../service';
import { List, Skeleton } from 'antd';

interface Record {
  id: number;
  date: string;
  content: string;
}

const Index = () => {
  const [records, setRecords] = useState<Record[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    const { data } = await getRecords();
    console.log(data);
    setRecords(data);
    setIsLoading(false);
  };

  const onDelete = async (id: number) => {
    const { data } = await deleteRecords(id);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={records}
      renderItem={item =>
        (
          <List.Item 
            actions={[
              <a>编辑</a>, 
              <a style={{ color: 'red' }} onClick={() => onDelete(item.id)}>删除</a>
            ]}>
            <Skeleton title={false} active loading={isLoading}>
              <List.Item.Meta
                title={item.date}
                description={item.content}
              />
            </Skeleton>
          </List.Item>
        )
      }
    />
  );
};

export default Index;