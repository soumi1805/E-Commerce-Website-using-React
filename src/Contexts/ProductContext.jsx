import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children}) => {

  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal,setCartTotal]  = useState(0);
  const [searchValue, setSerachValue] = useState("");

  return (
        <ProductContext.Provider value = {{productList,setProductList,cart,setCart,cartTotal,setCartTotal,searchValue, setSerachValue}}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export default useProductContext;
