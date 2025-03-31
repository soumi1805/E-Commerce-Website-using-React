import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useLoginContext from "../Contexts/LoginContext";
import useProductContext from "../Contexts/ProductContext";
import { Search, ShoppingCart, CircleUserRound } from "lucide-react";

const Header = () => {
    const { user } = useLoginContext();
    const [dropdown, showDropdown] = useState(false);
    const location = useLocation();

    const { cart, setSerachValue, productList } = useProductContext();
    const [searchQuery, setSearchQuery] = useState("");
    const totalQuantity = cart.reduce((sum, product) => sum + product.qty, 0);

    useEffect(() => {
        showDropdown(false);
        setSerachValue("");
        setSearchQuery("");
    }, [location,setSerachValue]);


    const filteredProductList = productList.filter(product => product?.title?.toLowerCase().includes(searchQuery?.toLowerCase()));

    return (

        <div className="hidden md:block  space-x-4 bg-white shadow-lg border-b border-gray-200 px-6 py-4">
            <ul className="flex items-center w-full">
                <li className="mr-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `font-medium ${isActive ? "text-orange-700" : "text-gray-700"} `
                        }
                    >
                        Home
                    </NavLink>
                </li>

                <li className="relative mr-6">
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `font-medium flex items-center space-x-1 ${isActive ? "text-orange-700" : "text-gray-700"} `
                        }
                    >
                        <ShoppingCart size={20} />
                        <span>Cart</span>
                        {totalQuantity > 0 &&
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {totalQuantity}

                            </span>}
                    </NavLink>
                </li>

                <li className="flex-grow max-w-md">
                    <div className="relative">


                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => { setSerachValue(e.target.value); showDropdown(e.target.value.length > 0); setSearchQuery(e.target.value) }}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                        {dropdown && (
                            <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-10">
                                {filteredProductList.length > 0 ? (
                                    <ul className="py-2">
                                        {filteredProductList.map((product) => (
                                            <li key={product.id} className="p-3 hover:bg-gray-200 cursor-pointer">
                                                <Link to={`/product/${product.id}`} state={product}> {product.title} </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="p-3 text-gray-600">No products found.</p>
                                )}
                            </div>
                        )}
                    </div>
                </li>


                <li className="ml-auto flex items-center space-x-2 w-max">
                    <CircleUserRound size={20} />
                    {
                        !user ?
                            <NavLink
                                to="/login"
                                className={({ isActive }) => `font-medium ${isActive ? "text-orange-700" : "text-gray-700"}`}>

                                <span> Welcome, Guest</span>
                            </NavLink> : <NavLink to="/profile" className="font-medium text-gray-700">
                                <span> Welcome, {user.email}</span>
                            </NavLink>
                    }
                </li>
            </ul>
        </div>




    )
}

export default Header;