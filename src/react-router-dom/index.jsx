import { useLayoutEffect, useRef, useState } from 'react';
import { createBrowserHistory, createHashHistory } from '../router';
import { Router, useNavigate } from '../react-router';
export * from '../react-router';

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

export const Link = function (props) {
  const { to, state, ...rest } = props;
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(to, state);
  };

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...rest} onClick={handleClick} />;
};
