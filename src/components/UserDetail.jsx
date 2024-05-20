import { useEffect, useState } from 'react';
import { useLocation, useParams } from '../react-router-dom';
import { userAPI } from '../utils';

const UserDetail = () => {
  const location = useLocation();
  const params = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    let user = location.state;
    if (!user) {
      user = userAPI.find(params.id);
    }
    setUser(user);
  }, [location.state, params.id]);

  return (
    <div>
      {user.id} : {user.name}
    </div>
  );
};

export default UserDetail;
