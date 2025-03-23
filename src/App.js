
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import { ProductContextProvider
  
 } from './Contexts/ProductContext';
 import QuantityDropdown from './Components/QuantityDropdown';
function App() {

  return (
    <div>
      <ProductContextProvider>
      <Header />
      {/* {
        isLoggedIn ?  
        <User
        email = {email}
        /> : 
        <Login
        setIsLoggedIn = {setIsLoggedIn}
        setUserEmail = {setUserEmail}
        />
      } */}
      
      <Outlet /> 
      </ProductContextProvider>
       <QuantityDropdown/>
        



    </div>
  );
}

export default App;
