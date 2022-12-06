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
import OrderPage from './pages/orderpage/OrderPage';

import DeleteProductPage from './pages/deleteproduct/DeleteProductPage';

import AdminOrder from './pages/orderpage/AdminOrder';
import ManagerAps from './pages/manageraps/ManagerAps';
import Users from './pages/users/Users';
import CreateUser from './pages/signup/CreateUser'



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
        <Route path='addproduct' element={<AddProduct/>}/>
        <Route path='addcategory' element={<AddCategory/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='orders' element={<OrderPage/>}/>

        <Route path='productsDelete' element={<DeleteProductPage/>}/>

        <Route path='adminOrders' element={<AdminOrder/>}/>
        <Route path='applications' element={<ManagerAps/>}/>
        <Route path='users' element={<Users/>}/>
        <Route path='createuser' element={<CreateUser/>}/>

      </Routes> 
    </div>
  );
}

export default App;
