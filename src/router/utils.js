function compilePath(path, end = true) {
  let paramNames = [];
  // :name => /([^\/]+)
  let regexpSource =
    '^' +
    path.replace(/\/:(\w+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return '/([^\\/]+)';
    });

  if (end) {
    regexpSource += '$';
  }

  let matcher = new RegExp(regexpSource);

  return [matcher, paramNames];
}

export function matchPath(path, pathname) {
  const [matcher, paramNames] = compilePath(path);
  let match = pathname.match(matcher);

  if (!match) {
    return null;
  }
  // 100
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    memo[paramName] = captureGroups[index];
    return memo;
  }, {});

  return { params };
}

/**
 * 获取路由匹配的结果
 */
export function matchRoutes(routes, location) {
  const { pathname } = location;
  let match = null;

  for (let i = 0; match === null && i < routes.length; i++) {
    const route = routes[i];
    match = matchPath(route.path, pathname);

    if (match) {
      match.route = route;
      return match;
    }
  }

  return match;
}
