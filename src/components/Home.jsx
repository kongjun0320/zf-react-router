import { useNavigate } from '../react-router';

const Home = () => {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate('/profile');
  };
  return (
    <div>
      <p>Home</p>
      <button onClick={navigateTo}>跳转到 profile</button>
    </div>
  );
};

export default Home;
