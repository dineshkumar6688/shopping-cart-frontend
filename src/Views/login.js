import React,{useState } from "react";
import {
  Card,
  Row,
  Col,
  CardImg, Container ,Label, CardBody ,Form,ModalHeader,ModalBody, ModalFooter,Button,Modal
} from "reactstrap";
import '../Styles/login.css'
import { lightSpeedIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import {Link,useHistory} from 'react-router-dom';
import login from '../Images/shop.jpg';
import Signup from '../Views/signup';
import {useStore} from '../Components/store';


function Login() {

  const { register, handleSubmit, errors } = useForm(); 
  const history = useHistory();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const updateUserDetails = useStore(state => state.updateUserDetails);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  const [allValues, setAllValues] = useState({
    name: '',
    password: '',
    mailid: '',
    phoneno: ''
 });

 const  addUser =async (data)=>{
   try{
       const res= await axios.post('http://localhost:5000/login',{ 
         mailid:data.mailid,
         password:data.password,  
       })
       
       if(res){
         console.log(res)
         alert("Login successful!!");
         var token = JSON.stringify(res.data.tokens[0].token);
         localStorage.setItem("token",token)

         var token = "Bearer "+JSON.parse(localStorage.getItem('token'))
         const options = {
          headers: {'Content-Type': 'application/json' ,'Authorization':token}
        };

        var result = await axios.get('http://localhost:5000/login/userDetails', options)

        if(result){
          await updateUserDetails(result.data,'userDetails');        }
     
       }
   }catch(err){
     console.log(err)
      if(err.response.data.message === "User does not exist!"){
        alert("User doesn't exists!");
      }
      if(err.response.data.message === "Password doesn't match"){
        alert("Incorrect Password");
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
                    <Button color="danger" onClick={toggle}>Signup</Button>
                    <Modal  isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle} close={closeBtn}></ModalHeader>
                      <Signup/>
                    </Modal>
      
                  </div>
                  </Col>
                </Row>
                <Row>
                  <Col >
                     <h3 style={{color:"gray",fontWeight:"bolder"}}>Login to start the shopping!!</h3>
                  </Col>
                </Row>
              </div>
              <Form onSubmit={handleSubmit(addUser)}>
              <Row>
                <Col>
                   <Label style={{color:"gray",fontWeight:"bolder"}}>Mail id</Label>
                </Col>
                </Row>
              <Row style={{paddingBottom:"10px"}}>
                <Col>
                   <input name="mailid" className="form-control" type='email' placeholder="Enter the Mail id" ref={register({ required: true ,pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} onChange={changeHandler}/>
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
                  <input type="password" className="form-control" name="password" placeholder="Enter the password" ref={register({ required: true,minLength:5,maxLength:20  })} onChange={changeHandler}/>
                  {errors.password && <span style={{color:"red"}}>Password is required.</span>}
                </Col>
              </Row>
                <div style={{textAlign:"center"}}><input className="btn btn-info" type="submit"/></div>
                <br/>
              </Form>
            </Container>  
          </Col>
         
          <Col sm={12} md={4} lg={4} className="overflow">
          <Card style={{top:"20%"}} className="card ">
            <CardImg top width="100%" src={login} alt="Card image cap" />
            <CardBody style={{textAlign:"center"}}><h6>"Happiness is not in money, but in shopping"</h6></CardBody>
          </Card>
          </Col>
        </Row>

      </div>
    );
}  

export default Login;