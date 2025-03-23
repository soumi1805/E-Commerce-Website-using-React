import useLoginContext from "../Contexts/LoginContext";

const User = () => {

    const {user} = useLoginContext();

        return (
            <div>
            <h1 class = "text-4xl font-bold text-center">
            Welcome { user.email }
            </h1>
            </div>
            )
    
}

export default User;