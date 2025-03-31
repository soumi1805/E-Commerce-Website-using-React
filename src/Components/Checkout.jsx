import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useProductContext from '../Contexts/ProductContext';
import useLoginContext from '../Contexts/LoginContext';

export default function Checkout() {

  const {user,setUser} = useLoginContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '' || user?.email,
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {setCart} = useProductContext();

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    
  }

  const handleSubmit = (e) => {
    setUser({
      ...formData
    })
    e.preventDefault();
    setIsSubmitted(true);
    setCart([]);
  }


  return (
    <>
      {!isSubmitted ? (
        <div className="w-full min-h-screen p-10 bg-gray-100">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">Checkout</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input type="text" name="name" placeholder="Full Name" className="w-full p-3 border rounded-lg" onChange={handleFormDataChange} required />
              <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg" onChange={handleFormDataChange} value={formData.email} disabled required />
              <input type="text" name="address" placeholder="Address" className="w-full p-3 border rounded-lg" onChange={handleFormDataChange} required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="city" placeholder="City" className="w-full p-3 border rounded-lg" onChange={handleFormDataChange} required />
                <input type="text" name="zip" placeholder="ZIP Code" className="w-full p-3 border rounded-lg" onChange={handleFormDataChange} required />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">Payment Details</h2>
              <input type="text" name="cardNumber" placeholder="Card Number" className="w-full p-3 border rounded-lg" onChange={handleFormDataChange} required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="expiry" placeholder="MM/YY" className="w-full p-3 border rounded-lg" onChange={handleFormDataChange} required />
                <input type="text" name="cvv" placeholder="CVV" className="w-full p-3 border rounded-lg" onChange={handleFormDataChange} required />
              </div>
              <button type="submit" className="mt-6 w-full bg-green-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition">
                Place Order
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center  p-10">
          <div className="max-w-lg bg-white p-8 rounded-lg shadow-lg bg-gray-100 text-center">
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-800 mt-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mt-2">Thank you for your purchase. Your order has been confirmed.</p>
            <p className="text-gray-600">You will receive an email with the order details shortly.</p>
            <button className="mt-6 w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
              <Link to="/products">Continue Shopping</Link>
              
            </button>
          </div>
        </div>
      )}
    </>


  )
}
