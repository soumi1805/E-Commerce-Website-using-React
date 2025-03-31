import { Link,useLocation } from "react-router-dom";
import {useEffect} from 'react';
import useProductContext from "../Contexts/ProductContext";
import useLoginContext from "../Contexts/LoginContext";
import { Trash2 } from "lucide-react";
import EmptyPage from "./EmptyPage";

export default function Cart() {
  const { cart, setCart, cartTotal,setCartTotal } = useProductContext();
  const { user } = useLoginContext();
  const location = useLocation();



  const handleProductRemove = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      return newCart.filter(item => item.id !== product.id);

    });
    product.qty = 0;
  }

  useEffect(() => {
      let cartValue = 0;
      cart.forEach(item => {
        
        cartValue += parseFloat((item.qty * item.price));
      });
      cartValue = cartValue.toFixed(2);
      //update the cart value
      setCartTotal(cartValue);
    },[setCart,cart,setCartTotal])

    return (
      <div className="w-full min-h-screen p-10 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">Shopping Cart</h1>
          {cart.length > 0 ? (
            <div className="mt-6 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                      <Link to={`/product/${item.id}`} state={item} className="hover:underline">
                          {item.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600">Rs.{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-700">Qty: {item.qty}</p>
                    <button 
                     onClick={() => handleProductRemove(item)}
                    className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6 flex justify-between text-lg font-semibold text-gray-800">
                <span>Total:</span>
                <span>
                  Rs.{cartTotal}
                </span>
              </div>
               <div className="mt-6">
              <Link
                to={user ? "/checkout" : "/login"} 
                state={{ from: location }} 
                className="block w-full text-center rounded-md bg-indigo-600 px-6 py-3 text-white font-medium shadow-md hover:bg-indigo-700 transition"
              >
                Checkout
              </Link>
            </div>
            </div>
          ) : (  
            <EmptyPage/>
          )}
        </div>
      </div>
    );
    


}
