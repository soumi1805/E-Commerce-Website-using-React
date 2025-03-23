import useLoginContext from "../Contexts/LoginContext"
import Profile from './Profile';
import Login from './Login';

export const Authenticator = () => {
    const { user } = useLoginContext();
    return (
        <>
            {
                user ? <Profile /> : <Login />
            }
        </>
    )
}