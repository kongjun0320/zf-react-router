import { createContext } from 'react';

export const LocationContext = createContext(null);
export const NavigatorContext = createContext(null);
export const RouteContext = createContext({
  outlet: null,
  matches: [],
});
