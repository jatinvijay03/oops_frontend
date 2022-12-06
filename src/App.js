import Login from './pages/login/Login';
import './App.css';
import Signup from './pages/signup/Signup';
import AddProduct from './pages/addproduct/AddProduct';
import AddCategory from './pages/addcategory/AddCategory';
import HomePage from './pages/homepage/HomePage';
import {Routes,Route} from 'react-router-dom';
import ProductPage from './pages/Productpage/ProductPage';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/checkout/Checkout';
import Wallet from './pages/wallet/Wallet';
import Profile from './pages/profile/Profile';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='products/:query' element={<ProductPage/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='wallet' element={<Wallet/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Routes> 
    </div>
  );
}

export default App;
