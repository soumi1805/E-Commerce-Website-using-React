import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Components/Home/Home';
import { Authenticator } from './Components/Authenticator';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import ProductInfo from './Components/Home/Product-info';
import { LoginContextProvider } from "./Contexts/LoginContext";
import { ProductContextProvider } from './Contexts/ProductContext';
import ProductList from './Components/Home/Product-list';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Components/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='/products' element={<ProductList />} />
      <Route path='/products/:category' element={<ProductList />} />
      <Route path="product/:productid" element={<ProductInfo />} />
      <Route path='/Login' element={<Authenticator />} />
      <Route path="/cart" element={<Cart />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/profile' element={<Profile/>} />
      </Route>

    </Route>
  )
)
root.render(
  <>
    {/* <App /> */}
    <ProductContextProvider>
      <LoginContextProvider>
        <RouterProvider router={router} />
      </LoginContextProvider>
    </ProductContextProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
