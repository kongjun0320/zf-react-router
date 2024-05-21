import { useLocation, useNavigate } from '../react-router';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem('login', true);
    if (location.state && location.state.from) {
      navigate(location.state.from || '/');
    }
  };

  return <button onClick={login}>登录</button>;
};

export default Login;
