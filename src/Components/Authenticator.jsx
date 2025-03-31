import useLoginContext from "../Contexts/LoginContext"
import Login from './Login';

export const Authenticator = () => {
    const { user } = useLoginContext();
    return (
        <>
           
            {
                !user  && <Login />
            }
        </>
    )
}