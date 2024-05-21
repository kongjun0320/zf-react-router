import { Navigate } from '../react-router';

const Protected = ({ component, path }) => {
  return localStorage.getItem('login') ? (
    component
  ) : (
    <Navigate to="/login" state={{ from: path }} />
  );
};

export default Protected;
