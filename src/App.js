import Login from './pages/login/Login';
import './App.css';
import Signup from './pages/signup/Signup';
import AddProduct from './pages/addproduct/AddProduct';
import AddCategory from './pages/addcategory/AddCategory';
import HomePage from './pages/homepage/HomePage';
import {Routes,Route} from 'react-router-dom';
import ProductPage from './pages/Productpage/ProductPage';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='products/:query' element={<ProductPage/>}/>
        <Route path='cart' element={<Cart/>}/>
          

        
      </Routes> 
    </div>
  );
}

export default App;
