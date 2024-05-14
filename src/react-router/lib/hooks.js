import { useContext } from 'react';
import { LocationContext } from './context';

export function useLocation() {
  const { location } = useContext(LocationContext);

  return location;
}

export function useRoutes(routes) {
  const location = useLocation();
  const { pathname } = location;
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (route.path === pathname) {
      return route.element;
    }
  }
}
