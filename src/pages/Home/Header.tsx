import { Button } from 'antd';
import { FC } from 'react';

interface Props {
  onClick?: () => void;
}

const Index: FC<Props> = ({ onClick }) => {
  return (
    <h1
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        userSelect: 'none',
      }}
    >
      <span>Records of Life</span>
      <Button onClick={onClick} type='primary'>
        新增
      </Button>
    </h1>
  );
};

export default Index;
