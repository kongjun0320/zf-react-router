function flattenRoutes(routes, branches = []) {
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      flattenRoutes(route.children, branches);
    }
    branches.push({
      name: route.path,
      element: route.element,
    });
  });
}

const routes = [
  {
    path: '/user',
    element: 'User',
    children: [
      {
        path: 'list',
        element: 'UserList',
      },
      {
        path: 'add',
        element: 'UserAdd',
      },
    ],
  },
];

const branches = [];
flattenRoutes(routes, branches);
console.log(branches);
