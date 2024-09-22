import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import Logo from  "/assets/netflix-logo.png";

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar className='netflix-navbar'>
      <Navbar.Brand href={"#"}><img src={Logo} alt="logo" /></Navbar.Brand>
      <Nav pullRight>
        <Nav.Item><a href='' className='cta bold'>Sign In</a> </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;