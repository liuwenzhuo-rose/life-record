import { useMemo, useState } from 'react';
import Button from './Button';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { apiUserCheckUsername, apiUserRegister } from '../../service/user';
import { message } from 'antd';
import { useDebounce } from '../../util';

const Index = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const [isUsernameRepeated, setIsUsernameRepeated] = useState<boolean>(false);
  const isUsernameInvalid = useMemo<boolean>(() => {
    return Boolean(!username || isUsernameRepeated);
  }, [username, isUsernameRepeated]);
  const isConfirmPasswordInvalid = useMemo<boolean>(() => {
    return Boolean(password && confirmPassword && password !== confirmPassword);
  }, [password, confirmPassword]);

  const isButtonDisabled = useMemo<boolean>(() => {
    return (
      !password ||
      !confirmPassword ||
      isUsernameInvalid ||
      isConfirmPasswordInvalid
    );
  }, [password, confirmPassword, isUsernameInvalid, isConfirmPasswordInvalid]);

  const checkUserName = useDebounce(async (value?: string) => {
    const data = await apiUserCheckUsername(value!);
    if (data.status === 1) {
      setIsUsernameRepeated(true);
    } else {
      setIsUsernameRepeated(false);
    }
  });

  const onRegister = async () => {
    const data = await apiUserRegister({
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          type='text'
          placeholder='用户名'
          onChange={(value?: string) => {
            const formattedValue = value?.trim();
            setUsername(formattedValue);
            if (!formattedValue) {
              setIsUsernameRepeated(false);
              return;
            }
            checkUserName(formattedValue);
          }}
          style={{
            marginBottom: isUsernameRepeated ? '5px' : '25px',
            borderBottomColor: '#a9aaaa',
          }}
        />
        {isUsernameRepeated ? (
          <div
            style={{
              color: 'red',
              userSelect: 'none',
              lineHeight: '20px',
            }}
          >
            用户名重复
          </div>
        ) : null}
      </div>
      <Input
        type='password'
        placeholder='密码'
        onChange={(value?: string) => {
          setPassword(value?.trim());
        }}
        style={{
          marginBottom: '25px',
          borderBottomColor: '#a9aaaa',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          type='password'
          placeholder='确认密码'
          onChange={(value?: string) => {
            setConfirmPassword(value?.trim());
          }}
          style={{
            marginBottom: isConfirmPasswordInvalid ? '5px' : '25px',
            borderBottomColor: '#a9aaaa',
          }}
        />
        {isConfirmPasswordInvalid ? (
          <div
            style={{
              color: 'red',
              userSelect: 'none',
              lineHeight: '20px',
            }}
          >
            两次密码不一致
          </div>
        ) : null}
      </div>
      <Button disabled={isButtonDisabled} text='注 册' onClick={onRegister} />
    </div>
  );
};

export default Index;
