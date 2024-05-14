const Action = {
  Pop: 'POP',
  Push: 'PUSH',
};
const PopStateEventType = 'popstate';
let action = Action.Pop;

export function createBrowserHistory() {
  function getBrowserLocation(window, globalHistory) {
    const { pathname } = window.location;
    const state = globalHistory.state || {};

    return {
      pathname,
      state: state.usr,
    };
  }

  function createHref(to) {
    return to;
  }

  return getUrlBaseHistory(getBrowserLocation, createHref);
}

export function createHashHistory() {
  if (!window.location.hash) {
    window.location.hash = '/';
  }

  function getHashLocation(window, globalHistory) {
    const pathname = window.location.hash.substr(1);
    const state = globalHistory.state || {};

    return {
      pathname,
      state: state.usr,
    };
  }

  function createHashHref(to) {
    let url = window.location.href;
    let hashIndex = url.indexOf('#');
    let href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    return href + '#' + to;
  }

  return getUrlBaseHistory(getHashLocation, createHashHref);
}

function getUrlBaseHistory(getLocation, createHref) {
  const globalHistory = window.history;
  let listener = null;
  let index = getIndex();

  if (index === null) {
    index = 0;
    globalHistory.replaceState({ usr: globalHistory.state, idx: index }, '');
  }

  function getIndex() {
    let state = globalHistory.state || { idx: null };
    return state.idx;
  }

  function handlePop() {
    action = Action.Pop;
    const nextIndex = getIndex();
    index = nextIndex;
    listener && listener({ location: history.location });
  }

  function push(to, state) {
    action = Action.Push;
    index = getIndex() + 1;
    // 创建一个新的 url 地址
    const url = createHref(to);
    // 在放入新的路径状态的时候，对状态做一个封装或者说加强
    globalHistory.pushState({ idx: index, usr: state }, '', url);
    listener && listener({ location: history.location });
  }

  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window, globalHistory);
    },
    push,
    listen(fn) {
      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;

      return () => {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    go(n) {
      return globalHistory.go(n);
    },
  };

  return history;
}
