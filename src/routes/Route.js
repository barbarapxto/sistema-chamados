import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const { signed } = useContext(AuthContext);

    // if (loading) {
    //     return (
    //         <div>
    //             <h2>Carregando...</h2>
    //         </div>
    //     );
    // }

    if (!signed && isPrivate) {
        return <Redirect to='/' />;
    }

    if (signed && !isPrivate) {
        return <Redirect to='/dashboard' />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
}
