import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';
import '../Styles/header.css'


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
        <Container>
        <Navbar light expand="md">
            <NavbarBrand href="/"><h1 style={{color:"pink"}}>Toy World</h1></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto offset-md-4 " navbar pills>
                <NavItem className="nav-items">
                <NavLink >Home</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Shop
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                    Option 1
                    </DropdownItem>
                    <DropdownItem>
                    Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                    Reset
                    </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                <NavLink>Blog</NavLink>
                </NavItem>
                <NavItem>
                <NavLink>Contact</NavLink>
                </NavItem>
                <NavItem>
                <NavLink>Pages</NavLink>
                </NavItem>
            </Nav>
            <span class="icon-bag"></span>
            </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default Header;