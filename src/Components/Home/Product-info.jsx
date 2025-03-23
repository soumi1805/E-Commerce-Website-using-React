import { useCallback, useEffect, useState } from 'react'
import useProductContext from '../../Contexts/ProductContext';
import { useParams } from 'react-router-dom';
import Products from '../../product.json';
import EmptyPage from '../EmptyPage';
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

export default function ProductInfo() {
  const { productid } = useParams();
  const product = Products.find(p => p.id === parseInt(productid));
  const { cart,setCart, cartTotal, setCartTotal } = useProductContext();

  useEffect(()=>{
    const matchedProduct = cart.find(item => item.id == product.id);
    if(matchedProduct){
      product.qty = matchedProduct.qty;
    }
    else{
      product.qty = 0;
    }
  
  },[])

  const handleAddToCart = (product) => {
    product.qty = product.qty ? product.qty + 1 : 1;
    setCart((prevCart) => {
      const newCart = [...prevCart];

      const productIndex = newCart.findIndex(cartItem => cartItem.id === product.id);
      if (productIndex > -1) {
        newCart[productIndex].qty = product.qty;
      } else {
        // newCart.push({ ...product, qty: 1 });
        newCart.push({ ...product });
      }

      return newCart;
    });

    // Update cartTotal after updating cart
    // calculateCartTotal();
    // setCartTotal(prevCartTotal => (parseFloat(prevCartTotal) + product.price).toFixed(2));
  };

  //handle the product update dropdown
  const handleUpdateQuantity = (event) => {
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
        product ?
          (<div>

            <div className="mt-8 px-4 py-6">
              <div className="flow-root">
                <div role="list">

                  <div key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        // alt={product.imageAlt}
                        src={product.imageSrc}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>

                            {product.name}
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">{product.description}</p>

                        <div className="flex">
                          {/* <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleProductRemove(product)}>
                            Remove
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              {/* <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>Rs. {cartTotal()}</p>
            </div> */}
            </div>
            <div className="mt-6 px-6">
              {

                product.qty ?
                  (
                    <select className='item-center justify-center rounded-md border py-3 px-6' value={product.qty} onChange={handleUpdateQuantity}>
                      {[...Array(10).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                      ))}
                    </select>
                  ) :
                  (
                    <button onClick={() => handleAddToCart(product)} className="item-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700">
                      Add to Cart
                    </button>
                  )

              }


            </div>
          </div>) :
          <EmptyPage />

      }

    </>
  )
}
