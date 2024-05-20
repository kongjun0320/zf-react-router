import { useRef } from 'react';
import { userAPI } from '../utils';
import { useNavigate } from '../react-router-dom';

const UserAdd = () => {
  const navigate = useNavigate();
  const nameRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    userAPI.add({ name });
    navigate('/user/list');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameRef} />
      <button type="submit">添加用户</button>
    </form>
  );
};

export default UserAdd;
