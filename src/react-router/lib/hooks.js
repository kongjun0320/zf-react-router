import { useCallback, useContext } from 'react';
import { LocationContext, NavigatorContext } from './context';
import { matchRoutes } from '../../router';

export function useLocation() {
  const { location } = useContext(LocationContext);

  return location;
}

export function useRoutes(routes) {
  const location = useLocation();
  const { pathname } = location;
  const match = matchRoutes(routes, { pathname });
  console.log(match);
  return match.route.element;
  // for (let i = 0; i < routes.length; i++) {
  //   const route = routes[i];
  //   if (route.path === pathname) {
  //     return route.element;
  //   }
  // }
}

export function useNavigate() {
  const { navigator } = useContext(NavigatorContext);

  let navigate = useCallback(
    (to, state) => {
      navigator.push(to, state);
    },
    [navigator]
  );

  return navigate;
}
