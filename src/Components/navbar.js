import React, { Component,useState } from "react";
import { Collapse, Button,Modal, ModalHeader, ModalBody, ModalFooter, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,Container ,Badge} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css'
import SideNav from 'react-simple-sidenav';
import Login from '../Views/login';
import {useStore} from '../Components/store';
import axios from 'axios'


function Header() {

  const [collapsed,setCollapsed] = useState(false);
  const [sidebarOpen, setOpen] = useState(false)
  const [bar, setbarOpen] = useState(false);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  var loggedIn = useStore(state => state.loggedIn);
  const updateLoggedIn = useStore(state => state.updateLoggedIn);
    
  const userDetails = async(data)=>{
    try{
      if(loggedIn == true){
        var token = "Bearer "+JSON.parse(localStorage.getItem('token'))
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,'Authorization':token},
        };
        fetch("http://localhost:5000/login/userDetails", requestOptions)
            .then(async(result) => {
                details = result;
            })
    }else{
        alert("User is not logged in!")
    }
    }catch(err){
        console.log(err)
    }
}

  const logout = async(data)=>{
    try{
      if(loggedIn == true){
        var token = "Bearer "+JSON.parse(localStorage.getItem('token'))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,'Authorization':token},
        };
        fetch("http://localhost:5000/login/logout", requestOptions)
            .then(async() => {
                alert("User logged out successfully!")
            })
    }else{
        alert("User is not logged in!")
    }
    }catch(err){
        console.log(err)
    }
}


  function toggleNavbar() {
    setCollapsed(
    !collapsed
  )
  }
  function onSetBar(prop){
    setbarOpen(prop);
  }
  function closeNavbar(){
    if(collapsed===true){
      toggleNavbar();
    }
  }
  function onSetSidebarOpen(prop) {
    setOpen(prop);
  } 
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    
    return (
      <div style={{margin:"0px"}}>
        <Container>
        <Navbar expand="md" className='TopNavbar'  light>
          <NavbarBrand href="/" className='TopNavbarBrand'>
            <h1 style={{color:"#E75480"}}>Toy World</h1>
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          
          <Collapse isOpen={collapsed} navbar>
            
            <Nav navbar>
              <NavItem className="offset-md-6">
                <NavLink tag={RRNavLink} onClick={closeNavbar} style={{color:"darkblue"}} className='NavbarItem' to='/' activeClassName="active" exact path="/" activeStyle={{color:"#E75480"}}> Home </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} onClick={closeNavbar} style={{color:"darkblue"}} className='NavbarItem' to="/shop/" activeClassName="active" exact path="/shop/" activeStyle={{color:"#E75480"}}>Shop</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} onClick={closeNavbar} style={{color:"darkblue"}} className='NavbarItem' to="/blog/" activeClassName="active" exact path="/blog/" activeStyle={{color:"#E75480"}}>Blog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} onClick={closeNavbar} style={{color:"darkblue"}} className='NavbarItem' to="/contact/" activeClassName="active" exact path="/contact/" activeStyle={{color:"#E75480"}}>Contact</NavLink>
              </NavItem >
              <NavItem>
                
                <NavLink tag={RRNavLink} onClick={closeNavbar} style={{color:"darkblue"}} className='NavbarItem' to="/pages/" activeClassName="active" exact path="/pages/" activeStyle={{color:"#E75480"}}>Pages</NavLink>
              </NavItem>
              <NavItem>
                     <span class="fa fa-2x fa-shopping-cart" onClick={()=>onSetSidebarOpen(true)}> <Badge style={{ position: "absolute",fontSize:"10px",backgroundColor:"#E75480" }}>{0}</Badge></span>
              </NavItem>
              <SideNav showNav={sidebarOpen} openFromRight="true" title="Organic Care Cart"   
              children={
                  <div style={{paddingLeft:'30%',paddingTop:'20%'}}>
                  <i class="fa fa-shopping-cart fa-5x" aria-hidden="true"/>
                  <h5 style={{paddingTop:'10%'}}>Cart is Empty</h5>
                </div>} 
                onHideNav={() => onSetSidebarOpen(false)}/>
                {loggedIn?<span>
                  <Button color="danger" onClick={logout}>Logout</Button>
                  </span>:<span>
            <Button color="danger" onClick={toggle}>Login</Button>
            <Modal isOpen={modal} toggle={toggle} >
              <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
              <Login/>
            </Modal>
            </span>
            }
                 
            </Nav>
          </Collapse>
         
        </Navbar>
        
        </Container>
      </div>
    ); 
  }

export default Header;