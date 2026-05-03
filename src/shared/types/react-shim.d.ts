// Shims temporales para poder trabajar sin @types/react
// (útil cuando no hay conexión para instalar devDependencies).

declare module 'react' {
  export type ReactNode = any;
  export interface Attributes {
    key?: any;
  }
  export interface FC<P = {}> {
    (props: P & Attributes & { children?: ReactNode }): any;
  }

  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prevState: S) => S);

  export function useState<S>(
    initialState: S | (() => S),
  ): [S, Dispatch<SetStateAction<S>>];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useRef<T>(initialValue: T): { current: T };

  export const StrictMode: any;

  // Soporta el patrón React.useState / React.useEffect
  const React: {
    useState: typeof useState;
    useEffect: typeof useEffect;
    useRef: typeof useRef;
    StrictMode: any;
  };
  export default React;
}

declare module 'react-dom/client' {
  export const createRoot: any;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module 'react-router-dom' {
  export const BrowserRouter: any;
  export const Routes: any;
  export const Route: any;
  export const NavLink: any;
  export const useLocation: any;
  export const Navigate: any;
}

declare namespace React {
  // Soporta el namespace React.FC en componentes existentes
  type FC<P = {}> = import('react').FC<P>;
}

declare namespace NodeJS {
  interface Timeout {}
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

