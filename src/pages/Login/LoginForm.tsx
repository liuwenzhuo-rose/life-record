import { useMemo, useState } from 'react';
import Button from './Button';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { apiUserLogin } from '../../service/user';
import { message } from 'antd';

const Index = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const isUsernameInvalid = useMemo<boolean>(() => {
    return Boolean(!username);
  }, [username]);
  const isPasswordInvalid = useMemo<boolean>(() => {
    return Boolean(!password);
  }, [password]);

  const isButtonDisabled = useMemo<boolean>(() => {
    return isUsernameInvalid || isPasswordInvalid;
  }, [isUsernameInvalid, isPasswordInvalid]);

  const onLogin = async () => {
    const data = await apiUserLogin({
      username,
      password,
    });
    if (data.status === 0) {
      navigate('/home', { replace: true });
    } else {
      return message.error(data.text);
    }
    navigate('/home', { replace: true });
  };

  return (
    <div
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        padding: '0 25px',
      }}
    >
      <Input
        type='text'
        placeholder='用户名'
        onChange={(value?: string) => {
          setUsername(value?.trim());
        }}
        style={{
          marginBottom: '25px',
          borderBottomColor: '#a9aaaa',
        }}
      />
      <Input
        type='password'
        placeholder='密码'
        onChange={(value?: string) => {
          setPassword(value?.trim());
        }}
        style={{
          marginBottom: '30px',
          borderBottomColor: '#a9aaaa',
        }}
      />
      <Button text='登 录' onClick={onLogin} disabled={isButtonDisabled} />
    </div>
  );
};

export default Index;
