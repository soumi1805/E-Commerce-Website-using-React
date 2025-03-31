// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import useProductContext from '../../Contexts/ProductContext';
import ProductList from '../Home/Product-list';

const Home = () => {
   
     const {productList} = useProductContext();

 

  const categories = [...new Set(productList.map((product) => product.category))];

  return (
    <div className="p-4 bg-stone-200">
      {/* Banner */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img 
          src="/assets/images/image.png" 
          alt="Shopping Banner"
          className="w-full h-64 h-[43rem] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold">Discover the Best Deals</h1>
          <p className="mt-2 text-lg md:text-xl">Shop top brands at unbeatable prices</p>
          <Link 
            to="/products"
            className="mt-4 px-6 py-3 bg-stone-400 rounded-md text-white text-lg font-medium hover:bg-stone-700 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category} 
              to={`/products/${category.toLowerCase()}`} 
              className="block p-6 bg-gray-400 rounded-lg text-center font-medium hover:bg-gray-300 transition"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Products</h2>
       
        <ProductList/>
      </section>
    </div>
  );
};

export default Home;
