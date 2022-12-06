import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function BrandBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className='mainappbar brandbar'>
        <Container className='appbar'>
          <Navbar.Brand href='/' className='Brand'>
    
            AGGARWALS
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default BrandBar;