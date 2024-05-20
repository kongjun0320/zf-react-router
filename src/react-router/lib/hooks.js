import { useCallback, useContext } from 'react';
import { LocationContext, NavigatorContext, RouteContext } from './context';
import { matchRoutes } from '../../router';

export function useLocation() {
  const { location } = useContext(LocationContext);

  return location;
}

function renderMatches(matches) {
  return matches.reduceRight((outlet, match, index) => {
    const _matches = matches.slice(0, index + 1);
    return (
      <RouteContext.Provider value={{ outlet, matches: _matches }}>
        {match.route.element}
      </RouteContext.Provider>
    );
  }, null);
}

export function useRoutes(routes) {
  const location = useLocation();
  const { pathname } = location;
  const matches = matchRoutes(routes, { pathname });
  console.log('matches >>> ', matches);
  if (matches) {
    return renderMatches(matches);
  }
  // const match = matchRoutes(routes, { pathname });
  // console.log(match);
  // return match.route.element;
  // for (let i = 0; i < routes.length; i++) {
  //   const route = routes[i];
  //   if (route.path === pathname) {
  //     return route.element;
  //   }
  // }
}

export function useOutlet() {
  const { outlet } = useContext(RouteContext);
  return outlet;
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

export function useParams() {
  const { matches } = useContext(RouteContext);
  const routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : [];
}
