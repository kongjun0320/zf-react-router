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

  if (path === '*') {
    paramNames.push('*');
    regexpSource += '(.*)$';
  }

  if (end) {
    regexpSource += '$';
  }

  let matcher = new RegExp(regexpSource);

  return [matcher, paramNames];
}

export function matchPath({ path, end }, pathname) {
  const [matcher, paramNames] = compilePath(path, end);
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
// 如果路径有 * 通配符，分数 - 2
const splatPenalty = -2;
const indexRouteValue = 2;
const paramRegexp = /^:\w+$/;
const dynamicSegmentValue = 3;
const emptySegmentValue = 1;
const staticSegmentValue = 10;

const isSplat = (s) => s === '*';

// path: /user/list
function computeScore(path, index) {
  // 先用 / 进行分隔路径 ['', 'user', 'list']
  const segments = path.split('/');
  // 3
  let initialScope = segments.length;
  if (segments.some(isSplat)) {
    initialScope += splatPenalty; // -2
  }
  if (typeof index !== undefined) {
    initialScope += indexRouteValue; // 2
  }

  return segments
    .filter((s) => !isSplat(s))
    .reduce((score, segment) => {
      let currentScore = 0;
      if (paramRegexp.test(segment)) {
        currentScore += dynamicSegmentValue; // 3
      } else {
        if (segment === '') {
          currentScore += emptySegmentValue; // 1
        } else {
          currentScore += staticSegmentValue; // 10
        }
      }
      score += currentScore;
      return score;
    }, initialScope);
}

/**
 * 打平所有的分支
 */
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
    branches.push({
      path: routePath,
      routesMeta,
      score: computeScore(routePath, route.index),
    });
  }

  routes.forEach((route, index) => {
    flattenRoute(route, index);
  });

  return branches;
}

export function matchRouteBranch(branch, pathname) {
  // pathname: /user/list
  // [{'relativePath: '/user'}, {'relativePath: 'list'}]
  let { routesMeta } = branch;
  // 已经匹配过的路径名
  let matchedPathname = '/';
  let matchedParams = {};
  let matches = [];

  for (let i = 0; i < routesMeta.length; i++) {
    const meta = routesMeta[i];
    const end = i === routesMeta.length - 1;
    // 获取剩下的要匹配的路径名
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
 *
 * @param {*} a {path: '/user/add', routesMeta: [{childrenIndex: 1}, {childrenIndex: 1}]}
 * @param {*} b {path: '/user/list', routesMeta: [{childrenIndex: 1}, {childrenIndex: 0}]}
 * @returns
 */
function compareIndexes(a, b) {
  let sibling =
    a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return sibling ? a[a.length - 1] - b[a.length - 1] : 0;
}

function rankRouteBranches(branches) {
  branches.sort((a, b) => {
    return b.score !== a.score
      ? b.score - a.score
      : compareIndexes(
          a.routesMeta.map((meta) => meta.childrenIndex),
          b.routesMeta.map((meta) => meta.childrenIndex)
        );
  });
}

/**
 * 获取路由匹配的结果
 */
export function matchRoutes(routes, location) {
  const { pathname } = location;
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  console.log('branches >>> ', branches);
  let matches = null;
  for (let i = 0; matches === null && i < branches.length; i++) {
    matches = matchRouteBranch(branches[i], pathname);
  }
  return matches;
}
