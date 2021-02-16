import React,{useState } from "react";
import {
  Card,
  Row,
  Col,
  CardImg, Container ,Label, CardBody ,Form,Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import '../Styles/signup.css'
import GoogleLogin from 'react-google-login';
import signup from '../Images/login.jpg'
import { lightSpeedIn } from 'react-animations'; 
import Radium, {StyleRoot} from 'radium';
import axios from 'axios'
import { useForm } from 'react-hook-form';  
import {Link,useHistory} from 'react-router-dom';      
import Login from '../Views/login'

function Signup() {       
             
  const { register, handleSubmit, errors } = useForm();   
  const history = useHistory();    
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
            
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  const responseGoogle =async (response) => {          
    console.log(response) 
    try{
      const res= await axios.post('https://child-shopping-cart.herokuapp.com/signup',{   
       name:response.profileObj.name,  
       mailid:response.profileObj.email,
       password:"",
       phoneno:""
    })

    if(res){
      alert("Registered Successfully");
      history.push("/"); 
    }

    }catch(err){
      if(err.response){
       alert("Email already exists!");
     }
    }
    
    
  }

  const [allValues, setAllValues] = useState({
    name: '',
    password: '',
    mailid: '',
    phoneno: ''
 });

 const  addUser =async (data)=>{
   try{
    
       const res= await axios.post('http://localhost:5000/signup',{ 
         name:data.name,
         mailid:data.mailid,
         password:data.password,
         phoneno:data.phoneno
       })
       
       if(res){
         alert("Registered Successfully");
         history.push("/"); 
       }
  
   }catch(err){
     if(err.response){
       alert("Email already exists!");
     }
   }
}

 const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
 }


  const styles = {
    bounce: {
      animation: 'x 1.5s',
      animationName: Radium.keyframes(lightSpeedIn, 'bounce')
    }
  }     

    return (
      <div>
        <Row style={{margin:"0px"}}>
          <Col sm={12} md={4} lg={4} className="overflow">
          <Card style={{top:"20%"}} className="card ">
          <CardImg top width="100%" src={signup} alt="Card image cap" />
            <CardBody style={{textAlign:"center"}}><h6>"Happiness is not in money, but in shopping"</h6></CardBody>
          </Card>
          </Col>
          <Col sm={12} md={8} lg={8} style={{paddingTop:"10px"}}>
            <Container>
              <div style={{textAlign:"center"}}>
              <Row>
                  <Col>
                  <StyleRoot>
                    <div className="test" style={styles.bounce}><h2><b>Welcome to the Shopping World</b></h2></div>
                  </StyleRoot>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col style={{textAlign:"right"}}>
                  <div>
                  <Button color="danger" onClick={toggle}>Login</Button>
                    <Modal  isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
                     <Login/>
                    </Modal>
                  </div>
                  </Col>
                </Row>
                <Row>
                  <Col >
                     <h4 style={{color:"gray",fontWeight:"bolder"}}>Signup to have a wonderful experience!!</h4>
                  </Col>
                </Row>
                
                <Row style={{paddingTop:"20px"}}>
                  <Col>
                    <GoogleLogin clientId="1039863530911-2sfmb2essv5cg5b0p3js6k1cba7n8a35.apps.googleusercontent.com"
                    buttonText="Google" onSuccess={responseGoogle} onFailure={responseGoogle} cookiePolicy={'single_host_origin'}/>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                     <h2 className="line"><span>or</span></h2>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col >
                     <h3 style={{color:"gray",fontWeight:"bolder"}}>Create Account</h3>
                  </Col>
                </Row>
                <br/>
              </div>
              <Form onSubmit={handleSubmit(addUser)}>
              <Row>
                <Col>
                   <Label style={{color:"gray",fontWeight:"bolder"}}>Name</Label>
                </Col>
              </Row>
              <Row style={{paddingBottom:"10px"}}>
                <Col>
                  <input className="form-control" name="name" type="text" placeholder="Enter the name" ref={register({ required: true,minLength:5,maxLength:20 })}  onChange={changeHandler}/>
                  {errors.name && <span style={{color:"red"}}>Name is required.</span>}
                </Col>
              </Row>
              <Row>
                <Col>
                   <Label style={{color:"gray",fontWeight:"bolder"}}>Mail id</Label>
                </Col>
                </Row>
              <Row style={{paddingBottom:"10px"}}>
                <Col>
                   <input name="mailid" className="form-control" type='email' placeholder="Enter the Mail id" ref={register({ required: true,pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} onChange={changeHandler}/>
                   {errors.mailid && <span style={{color:"red"}}>Mail id is required.</span>}
                </Col>
              </Row>
              <Row>
                <Col>
                   <Label style={{color:"gray",fontWeight:"bolder"}}>Password</Label>
                </Col>
              </Row>
              <Row style={{paddingBottom:"10px"}}>
                <Col>
                  <input type="password" className="form-control" name="password" placeholder="Enter the password" ref={register({ required: true,minLength:5,maxLength:20 })} onChange={changeHandler}/>
                  {errors.password && <span style={{color:"red"}}>Password is required.</span>}
                </Col>
              </Row>
              <Row>
                <Col>
                   <Label style={{color:"gray",fontWeight:"bolder"}}>Phone no</Label>
                </Col>
              </Row>
              <Row style={{paddingBottom:"10px"}}>
                <Col>
                   <input name="phoneno" type="number" className="form-control" placeholder="Enter the phone no" ref={register({ required: true,minLength:10 })} onChange={changeHandler}/>
                   {errors.phoneno && <span style={{color:"red"}}>Phone no is required.</span>}
                </Col>
              </Row>
              
              <br/>
              <div style={{textAlign:"center"}}><input className="btn btn-info" type="submit"/></div>
              </Form>
            </Container>  
          </Col>
        </Row>

      </div>
    );
}  

export default Signup;