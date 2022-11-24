import Login from './pages/login/Login';
import './App.css';
import Signup from './pages/signup/Signup';
import AddProduct from './pages/addproduct/AddProduct';
import AddCategory from './pages/addcategory/AddCategory';
import HomePage from './pages/homepage/HomePage';
import {Routes,Route} from 'react-router-dom';
import ProductPage from './pages/Productpage/ProductPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='products/:categId' element={<ProductPage/>}/>
          

        
      </Routes> 
    </div>
  );
}

export default App;
