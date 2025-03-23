import { NavLink } from "react-router-dom";
import useLoginContext from "../Contexts/LoginContext";
import useProductContext from "../Contexts/ProductContext";

const Header = () => {
    const { user, setUser } = useLoginContext();
    const handleLogOut = () => {
        setUser(null);
    }

    const {cart, setSerachValue} = useProductContext();
    const totalQuantity = cart.reduce((sum, product) => sum + product.qty, 0);

    return (

        <div className="hidden md:block space-x-4 p-5">
            <ul className="flex space-x-4 ml-auto w-max">
                <li>
                    <NavLink to="/" className={({ isActive }) => ` ${isActive ? "text-orange-700" : "text-gray-700"} `
                    }>
                        Home
                    </NavLink>
                </li>
                {
                    !user ?
                        <li>
                            <NavLink to="/login" className={({ isActive }) => ` ${isActive ? "text-orange-700" : "text-gray-700"}`}>
                                Login
                            </NavLink>
                        </li>
                        :
                        <li>
                            <div onClick={handleLogOut}>
                                <NavLink to="/">
                                    Logout
                                </NavLink>
                            </div>
                        </li>
                }
                <li className="relative inline-block">
                    <NavLink to="/cart" className={({ isActive }) => ` ${isActive ? "text-orange-700" : "text-gray-700"} `
                    }>
                        Cart
                        {totalQuantity > 0 && <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-1 py-1 rounded-full">
                           {totalQuantity}
                           
                        </span> }
                    </NavLink>
                </li>

                <li>
                    <div class="search-container" className="float-left">
                    <input type="text" placeholder="Search.." name="search" onChange={(e) => setSerachValue(e.target.value)} />
                    </div>
                </li>

            </ul>
        </div>




    )
}

export default Header;