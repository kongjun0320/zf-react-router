import { useLayoutEffect, useRef, useState } from 'react';
import { Router, Routes, Route } from '../react-router';
import { createBrowserHistory, createHashHistory } from '../router';

export { Routes, Route };

export function BrowserRouter({ children }) {
  const historyRef = useRef(null);
  if (historyRef.current === null) {
    // 调用工厂方法，创建浏览器历史对象
    historyRef.current = createBrowserHistory();
  }
  const history = historyRef.current;

  const [state, setState] = useState({
    action: history.action, // 执行哪个动作到达此路径，pushState -> push popState -> pop
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}

export function HashRouter({ children }) {
  const historyRef = useRef(null);
  if (historyRef.current === null) {
    // 调用工厂方法，创建浏览器历史对象
    historyRef.current = createHashHistory();
  }
  const history = historyRef.current;
  const [state, setState] = useState({
    action: history.action, // 执行哪个动作到达此路径，pushState -> push popState -> pop
    location: history.location,
  });

  useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}
