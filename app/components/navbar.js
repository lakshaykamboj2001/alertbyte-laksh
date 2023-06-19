
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="ab-header">
      <div className="container">
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mar-l">
            <Nav.Link href="/" className='pg-lk'>Home <span></span> </Nav.Link>
            <Nav.Link href="#" className='pg-lk' onClick={() => console.log("clicked")}>Services <span></span> </Nav.Link>
            <Nav.Link href="#" className='pg-lk'>Contact Us <span></span> </Nav.Link>
            <Nav.Link href="#" className='pg-lk'>Resouces <span></span> </Nav.Link>
          </Nav>
          <Nav className='head-butns'>
            <Nav.Link className='btn btn-fill' href="#">Login</Nav.Link>
            <Nav.Link className='btn btn-fill' href="#">Connect Wallet</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </div>
    </Navbar>
  );
}

export default CollapsibleExample;