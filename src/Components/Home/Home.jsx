// Home.js
import React from 'react';
import ProductList from './Product-list';
import ProductInfo from './Product-info';

const Home = () => {

  const url ='https://github.com/soumi1805';
  // try{
    
  // }catch(error){
  //   console.log(error);
  // }

  // fetch(url,{
  //   headers:{
  //     'Content-Type': 'application/json', 
  //   }
  // }).then(response =>  response.json()).then(data=>console.log(data)).catch(error=>console.log(error));
  return (
    // <ProductContextProvider>
      <div>
        <ProductList />
        {/* <ProductInfo /> */}
      </div>
    // </ProductContextProvider>
  );
};

export default Home;
