// Shims temporales para poder trabajar sin @types/react
// (útil cuando no hay conexión para instalar devDependencies).

declare module 'react' {
  export type ReactNode = any;
  export interface FC<P = {}> {
    (props: P & { children?: ReactNode }): any;
  }
  export const useEffect: any;
  export const StrictMode: any;
  const React: any;
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

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

