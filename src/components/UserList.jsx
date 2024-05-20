import { Link, Outlet, useParams } from '../react-router-dom';
import { userAPI } from '../utils';
import { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const params = useParams();
  console.log('params >>> ', params);

  useEffect(() => {
    const _users = userAPI.list();
    setUsers(_users);
  }, []);

  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          <Link to={`/user/detail/${user.id}`} state={user}>
            {user.name}
          </Link>
        </li>
      ))}
      <Outlet />
    </ul>
  );
};

export default UserList;
