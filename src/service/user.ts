import apiFetcher from './axios';

interface UserInfo {
  username?: string;
  password?: string;
}

interface UserApiResponse {
  status: number;
  text?: string;
}

//  用户登陆
export const apiUserLogin = (userInfo: UserInfo) => {
  return apiFetcher<UserApiResponse>({
    method: 'POST',
    url: '/user/login',
    data: {
      userInfo,
    },
  });
};

//  用户注册
export const apiUserRegister = (userInfo: UserInfo) => {
  return apiFetcher<UserApiResponse>({
    method: 'POST',
    url: '/user/register',
    data: {
      userInfo,
    },
  });
};

// 检验用户名
export const apiUserCheckUsername = (username: string) => {
  return apiFetcher<UserApiResponse>({
    method: 'POST',
    url: '/user/register/checkUsername',
    data: {
      username,
    },
  });
};
