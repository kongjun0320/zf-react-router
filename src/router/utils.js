function compilePath(path, end = true) {
  let paramNames = [];
  // :name => /([^\/]+)
  let regexpSource =
    '^' +
    path
      .replace(/\/+$/, '')
      .replace(/^\/*/, '/')
      .replace(/\/:(\w+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return '/([^\\/]+)';
      });

  if (end) {
    regexpSource += '$';
  }

  let matcher = new RegExp(regexpSource);

  return [matcher, paramNames];
}

export function matchPath({ path, end }, pathname) {
  const [matcher, paramNames] = compilePath(path);
  let match = pathname.match(matcher);

  if (!match) {
    return null;
  }
  let matchedPathname = match[0];
  // 100
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    memo[paramName] = captureGroups[index];
    return memo;
  }, {});

  return { params, pathname: matchedPathname };
}

// ['/user/', '/add']
function joinPaths(paths) {
  return paths.join('/').replace(/\/\/+/g, '/');
}

function flattenRoutes(
  routes,
  branches = [],
  parentsMeta = [],
  parentPath = ''
) {
  function flattenRoute(route, index) {
    let meta = {
      relativePath: route.path, // 此 route 是相对路径
      route,
      childrenIndex: index,
    };
    // 到当前为止
    let routePath = joinPaths([parentPath, meta.relativePath]);
    const routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      flattenRoutes(route.children, branches, routesMeta, routePath);
    }
    branches.push({ path: routePath, routesMeta });
  }

  routes.forEach((route, index) => {
    flattenRoute(route, index);
  });

  return branches;
}

export function matchRouteBranch(branch, pathname) {
  let { routesMeta } = branch;
  let matchedPathname = '/';
  let matchedParams = {};
  let matches = [];

  for (let i = 0; i < routesMeta.length; i++) {
    const meta = routesMeta[i];
    const end = i === routesMeta.length - 1;
    const remainingPathname =
      matchedPathname === '/'
        ? pathname
        : pathname.slice(matchedPathname.length) || '/';
    let match = matchPath({ path: meta.relativePath, end }, remainingPathname);
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matchedPathname = joinPaths([matchedPathname, match.pathname]);
    matches.push({
      params: matchedParams,
      route,
      pathname: matchedPathname,
    });
  }

  return matches;
}

/**
 * 获取路由匹配的结果
 */
export function matchRoutes(routes, location) {
  const { pathname } = location;
  let branches = flattenRoutes(routes);
  console.log('branches >>> ', branches);
  let matches = null;
  for (let i = 0; matches === null && i < branches.length; i++) {
    matches = matchRouteBranch(branches[i], pathname);
  }
  return matches;
}
