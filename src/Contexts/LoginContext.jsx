import { createContext, useContext, useState } from "react";

export const LoginContext = createContext(); //we can give default value as well here

export const LoginContextProvider = ({children}) => {

    const [user,setUser] = useState(null);

    return (
        <LoginContext.Provider value={{user,setUser}}>
            {children}
        </LoginContext.Provider>
    )
}

const useLoginContext= () => {
    return useContext(LoginContext);
}

export default  useLoginContext;