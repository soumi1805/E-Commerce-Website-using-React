import { useNavigate } from "react-router-dom";
import useLoginContext from "../Contexts/LoginContext";

const User = () => {


    const {user,setUser} = useLoginContext();
    const Navigate = useNavigate();
    const handleLogout = () => {
        setUser(null);
        Navigate('/login');
    }

        return (
            <div className="w-full min-h-screen p-10 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg">
          <strong>Address:</strong> {user.address} </p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
            )
    
}

export default User;