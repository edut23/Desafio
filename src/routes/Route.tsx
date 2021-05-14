import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';



interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const  user  = false;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // console.log(location);
        // console.log(isPrivate);
        // console.log(!!user);
        return isPrivate === !!user ? (
          <Component />
        ) : (
            <Redirect
              to={{
                pathname: isPrivate ? '/' : '/questionary',
                state: { from: location },
              }}
            />
          );
      }}
    />
  );
};

export default Route;
