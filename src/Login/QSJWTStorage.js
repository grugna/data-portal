import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { fetchUser } from '../actions';
import getReduxStore from '../reduxStore';

export const QSJWTStorage = ({children}) => {
    const { pathname, search } = useLocation();
    const history = useHistory();
    const jwtQS = '?fence=';
    let jwt;
    if (search && search.includes(jwtQS)) {
        jwt = search.split(jwtQS)[1];
        localStorage.setItem('jwt', jwt);
        getReduxStore().then(
          (store) => {
            store.dispatch(fetchUser)
          },
        );
        history.push(pathname)
    }
    return <>{children}</>
}