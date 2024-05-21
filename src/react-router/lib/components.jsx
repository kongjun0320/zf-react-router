import React from 'react';
import { useRoutes, useOutlet } from './hooks';
import { LocationContext, NavigatorContext } from './context';

/**
 * 跨平台的路由容器组件
 */
export function Router({ children, location, navigator }) {
  return (
    <NavigatorContext.Provider value={{ navigator }}>
      <LocationContext.Provider value={{ location }}>
        {children}
      </LocationContext.Provider>
    </NavigatorContext.Provider>
  );
}

export function Routes({ children }) {
  const routes = createRoutesFromChildren(children);
  console.log('routes >>> ', routes);
  return useRoutes(routes);
}

function createRoutesFromChildren(children) {
  const routes = [];
  React.Children.forEach(children, (child) => {
    let route = {
      path: child.props.path,
      element: child.props.element,
    };
    if (child.props.children) {
      route.children = createRoutesFromChildren(child.props.children);
    }
    routes.push(route);
  });
  return routes;
}

export function Route() {}

export function Outlet() {
  return 'outlet';
  // return useOutlet();
}
