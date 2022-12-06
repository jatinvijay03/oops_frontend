
import IconButton from '@mui/material/IconButton';


import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Stack } from '@mui/material';


import AccountCircle from '@mui/icons-material/AccountCircle';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './searchbar.css';

import * as React from 'react';
import { useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavScrollExample(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const backToHome = (event) => {
    navigate('/');
  }


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);

  };


  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };
  const handleWallet = () => {
    
    navigate('/wallet');
  };

  const handleAddProduct = () => {
    
    navigate('/addproduct');
  };

  const handleAddCategory = () => {
    
    navigate('/addcategory');
  };

  const handleAllProducts = () => {
    
    navigate('/allproducts');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{navigate('/profile')}}>Profile</MenuItem>
      <MenuItem onClick={handleWallet}>Your Wallet</MenuItem>
      <MenuItem onClick={()=>{navigate('/orders')}}>Your Orders</MenuItem>
      {(localStorage.getItem('role') == 'manager' || localStorage.getItem('role') == 'admin')?<MenuItem onClick={handleAddProduct}>Add Products</MenuItem>:<></>}
      {(localStorage.getItem('role') == 'manager' || localStorage.getItem('role') == 'admin')?<MenuItem onClick={handleAddCategory}>Add Categories</MenuItem>:<></>}
      {(localStorage.getItem('role') == 'admin')?<MenuItem onClick={handleAllProducts}>All Products</MenuItem>:<></>}
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );




  return (
    <Navbar bg="light" expand="lg" className='mainappbar'>
      <Container fluid>
      <Stack className='appbar' direction="row" spacing={10}>
        <button className="btn bg-transparent" variant='text' onClick={backToHome}>
          <Navbar.Brand className='Brand'>AGGARWALS</Navbar.Brand></button>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Stack direction="row" spacing={1}>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={props.searchvalue}
                onChange={props.searchfunction}
                
              />
              <Button variant="outline-light" onClick={props.searchbuttonfunction}>Search</Button>
            </Form>
            
              <IconButton
                className='navb-icon'
                size="large"
                aria-label="shopping cart"
                color="inherit"
                onClick={() => { navigate('/cart') }}
              >

                <ShoppingCartIcon />

              </IconButton>
            
            <IconButton
              className='navb-icon'
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            </Stack>


          </Nav>

        </Navbar.Collapse>
        </Stack>
      </Container>
      {renderMenu}
    </Navbar>
  );
}

export default NavScrollExample;