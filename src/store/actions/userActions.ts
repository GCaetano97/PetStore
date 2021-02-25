export const LOGIN = 'LOGIN';

export const LOGOUT = 'LOGOUT';

export const Login = (username: string) => ({
  type: LOGIN,
  payload: { user: true, username },
});

export const Logout = () => ({
  type: LOGOUT,
  payload: { user: false, username: '' },
});
