import { useEffect, useState } from 'react';
import {
  apiCreateRecord,
  apiDeleteRecord,
  apiGetRecords,
  apiUpdateRecord,
} from '../../service/record';
import {
  Button,
  Input,
  List,
  message,
  Modal,
  Popconfirm as PopConfirm,
  Skeleton,
} from 'antd';
import Header from './Header';

interface Record {
  id?: string;
  date?: string;
  content?: string;
}

const Index = () => {
  const [records, setRecords] = useState<Record[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<Record>();

  const getRecords = async () => {
    const data = await apiGetRecords();
    if (data.status === 0) {
      setRecords(data.records);
    } else {
      return message.error(data.text);
    }
    setIsLoading(false);
  };

  const editRecord = (id: string) => {
    setIsModalVisible(true);
    setCurrentRecord(records?.find((item) => item.id === id));
  };

  const deleteRecord = async (id: string) => {
    const data = await apiDeleteRecord(id);
    if (data.status === 0) {
      message.success('删除成功!');
    } else {
      return message.error(data.text);
    }
    getRecords();
  };

  const createRecord = () => {
    setIsModalVisible(true);
  };

  const onInput = (value: string) => {
    setCurrentRecord({
      ...currentRecord,
      content: value,
    });
  };

  const onCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(undefined);
  };

  const onOk = async () => {
    let data;
    const isCreate = !Boolean(currentRecord?.id);
    if (isCreate) {
      data = await apiCreateRecord(currentRecord);
    } else {
      data = await apiUpdateRecord(currentRecord?.id, currentRecord);
    }
    if (data.status === 0) {
      message.success(`${isCreate ? '新增' : '更新'}成功`);
    } else {
      return message.error(data.text);
    }
    setIsModalVisible(false);
    setCurrentRecord(undefined);
    getRecords();
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        transform: 'translateX(-50%)',
        position: 'relative',
        left: '50%',
        padding: '0 10%',
        background: 'linear-gradient(to right, #fc466b, #3f5efb)',
      }}
    >
      <Header onClick={createRecord} />
      <List
        itemLayout='horizontal'
        dataSource={records}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type='link' onClick={() => editRecord(item?.id || '')}>
                编辑
              </Button>,
              <PopConfirm
                title='真的要删除吗？'
                okText='Yes'
                cancelText='No'
                onConfirm={() => deleteRecord(item?.id || '')}
              >
                <Button type='link' style={{ color: 'red' }}>
                  删除
                </Button>
              </PopConfirm>,
            ]}
          >
            <Skeleton title={false} active loading={isLoading}>
              <List.Item.Meta
                style={{ userSelect: 'none' }}
                title={item.date}
                description={
                  <div
                    style={{
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.content?.trim()}
                  </div>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <Modal
        visible={isModalVisible}
        onCancel={onCancel}
        onOk={onOk}
        cancelText='取消'
        okText='确定'
        closable={false}
        keyboard={false}
        centered
      >
        <Input.TextArea
          autoSize
          value={currentRecord?.content}
          onChange={({ target: { value } }) => onInput(value)}
          placeholder='开始记录吧～'
        />
      </Modal>
    </div>
  );
};

export default Index;
