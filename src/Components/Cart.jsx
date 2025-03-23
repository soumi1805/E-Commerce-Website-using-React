import { Link } from "react-router-dom";
import {useEffect} from 'react';
import useProductContext from "../Contexts/ProductContext";
import EmptyPage from "./EmptyPage";

export default function Cart() {
  const { cart, setCart, cartTotal,setCartTotal } = useProductContext();




  const handleProductRemove = (product) => {
    console.log(cart, product);
    setCart((prevCart) => {
      const newCart = [...prevCart];
      return newCart.filter(item => item.id != product.id);

    });
    product.qty = 0;
  }

  const handleUpdateQuantity = (product,event) => {
   
    product.qty = parseInt(event.target.value);
    //update the cart
    setCart((prevCart) => {
      const newCart = [...prevCart];

      const productIndex = newCart.findIndex(cartItem => cartItem.id === product.id);
      newCart[productIndex].qty = product.qty;

      return newCart;
    });
    // calculateCartTotal();
  }

  useEffect(() => {
      let cartValue = 0;
      cart.forEach(item => {
        // cartValue += parseFloat((item.qty * item.price).toFixed(2));
        cartValue += parseFloat((item.qty * item.price));
      });
      cartValue = cartValue.toFixed(2);
      //update the cart value
      setCartTotal(cartValue);
    },[setCart,cart])

  return (
    <>
      {
        cart.length > 0 ?
          (<div>
            <div className="text-lg font-medium text-gray-900 px-4 py-6">
              Shopping Cart
            </div>
            <div className="mt-8 px-4 py-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        {/* <img
                          alt={product.imageAlt}
                          src={product.imageSrc}
                          className="h-full w-full object-cover object-center"
                        /> */}
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={`/product/${product.id}`}>{product.name}</Link>
                            </h3>
                            <p className="ml-4">{product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          {/* <p className="text-gray-500">Qty {product.qty}</p> */}
                          <select className='item-center justify-center rounded-md border py-3 px-6' value={product.qty} onChange={(event)=>handleUpdateQuantity(product,event)}>
                            {[...Array(10).keys()].map(num => (
                              <option key={num + 1} value={num + 1}>{num + 1}</option>
                            ))}
                          </select>

                          <div className="flex">
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleProductRemove(product)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Rs. {cartTotal}</p>
              </div>
            </div>
            <div className="mt-6 px-6">
              <Link to="/checkout" className="item-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Checkout
              </Link>
            </div>
          </div>) :
          <EmptyPage />

      }
    </>
  )


}
