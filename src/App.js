
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import { useState, useEffect } from 'react';
import Loader from './Components/Loader';
import useProductContext from './Contexts/ProductContext';

function App() {
  const [loading, setLoading] = useState(false);
  const { setProductList } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProductList(data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [setProductList]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>

      <Header />

      <Outlet />




    </div>
  );
}

export default App;
