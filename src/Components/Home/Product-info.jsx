import { useEffect, useState } from 'react'
import useProductContext from '../../Contexts/ProductContext';
import {  useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, RotateCcw, Star } from "lucide-react";


export default function ProductInfo() {
  const location = useLocation();
  const product = location.state;
  const { cart, setCart, setCartTotal } = useProductContext();
  const [productQuantituy, setProductQuantity] = useState(product.qty || 0);
  const navigate = useNavigate();

  const handleAddToCart = (product, buyNow) => {
    //if product is already added to cart directly navigate to cart
    if(buyNow && product.qty > 0){
      navigate('/cart');
    }
    else{
    product.qty = product.qty ? product.qty + 1 : 1;
    setProductQuantity(product.qty);
    setCart((prevCart) => {
      const newCart = [...prevCart];

      const productIndex = newCart.findIndex(cartItem => cartItem.id === product.id);
      if (productIndex > -1) {
        newCart[productIndex].qty = product.qty;
      } else {
        newCart.push({ ...product });
      }

      return newCart;

    });
    if (buyNow) {
      navigate('/cart');
    }
  }
  };

  const handleIncrease = () => {
    setProductQuantity(productQuantituy + 1);
  }

  const handleDecrease = () => {
    if (productQuantituy > 0)
      setProductQuantity(productQuantituy - 1);

  }

  //update the cart when the product quantity changes
  useEffect(() => {
    product.qty = productQuantituy;
    setCart((prevCart) => {
      const newCart = [...prevCart];

      const productIndex = newCart.findIndex(cartItem => cartItem.id === product.id);
      if (productIndex > -1) {
        if (productQuantituy > 0)
          newCart[productIndex].qty = productQuantituy;
        else {
          //remove the product from the cart
          newCart.splice(productIndex, 1);
        }
      }
      return newCart;
    });
  }, [productQuantituy, setCart,product])

  //update the cart total when the cart changes
  useEffect(() => {
    let cartValue = 0;
    cart.forEach(item => {
      
      cartValue += parseFloat((item.qty * item.price));
    });
    cartValue = cartValue.toFixed(2);
    //update the cart value
    setCartTotal(cartValue);
  }, [setCart, cart, setCartTotal])

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="w-full min-h-screen p-10 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-72 h-72 object-cover rounded-lg shadow-lg border border-gray-300"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-gray-600 mt-4 text-lg">{product.description}</p>
            <div className="mt-6 flex items-center gap-6">
              <span className="text-3xl font-semibold text-green-600">Rs.{product.price}</span>
              <span className="text-md text-red-500 bg-red-100 px-3 py-1 rounded-md">
                {product.discountPercentage}% Off
              </span>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-gray-50">
                <ShieldCheck className="text-green-600 w-6 h-6" />
                <p className="text-lg text-gray-700">{product.warrantyInformation}</p>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm bg-gray-50">
                <RotateCcw className="text-blue-600 w-6 h-6" />
                <p className="text-lg text-gray-700">{product.returnPolicy}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex'>
          {

            product.qty > 0 ?
              (
              
                <div className="mt-6 flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-1 m-1 w-max shadow-sm">
                  <button
                    onClick={handleDecrease}
                    className="px-2 py-1 text-lg font-bold text-gray-700 rounded-l hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="px-4 text-lg font-semibold text-gray-900">{productQuantituy}</span>
                  <button
                    onClick={handleIncrease}
                    className="px-2 py-1 text-lg font-bold text-gray-700 rounded-r hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              ) :

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-6 mx-2 w-full md:w-auto px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                Add to Cart
              </button>
          }
          <button
            onClick={() => handleAddToCart(product, 'true')}
            className="mt-6 w-full md:w-auto px-6 py-3 bg-amber-400 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-amber-500 transition">
            Buy Now
          </button>
        </div>

        <h3 className="text-2xl font-semibold mt-8 border-b pb-3">Customer Reviews</h3>
        <div className="mt-6 space-y-4">
          {product.reviews.map((review, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <p className="text-lg font-medium text-gray-800">{review.reviewerName}</p>
              <div className="flex items-center gap-2">{renderStars(review.rating)}</div>
              <p className="text-lg mt-2 text-gray-700">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}
