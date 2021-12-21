import { ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Index = () => {
  const [leftOffset, setLeftOffset] = useState<number>(0);
  const toLogin = () => {
    setLeftOffset(0);
  };
  const toRegister = () => {
    setLeftOffset(-400);
  };
  return (
    <div
      style={{
        width: '500px',
        height: '300px',
        background: 'rgba(255,255,255, .7)',
        padding: '60px 0px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '400px',
          height: '260px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '700px',
            display: 'flex',
            position: 'absolute',
            left: leftOffset,
            transition: '.5s',
          }}
        >
          <LoginForm />
          <RegisterForm />
        </div>
      </div>
      <a
        onClick={toRegister}
        style={{
          position: 'absolute',
          left: 80,
          bottom: 50,
          opacity: leftOffset === 0 ? 1 : 0,
          transition: '.5s',
          userSelect: 'none',
        }}
      >
        还没账号？立即注册
      </a>
      <ArrowLeftOutlined
        style={{
          position: 'absolute',
          left: 30,
          top: 30,
          color: '#118DF0',
          fontSize: 20,
          cursor: 'pointer',
          opacity: leftOffset === 0 ? 0 : 1,
          transition: '.5s',
        }}
        onClick={toLogin}
      />
    </div>
  );
};

export default Index;
