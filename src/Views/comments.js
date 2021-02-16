import React,{useState} from "react";
import {Row,Col,Card,CardImg,Label, Container,Form} from 'reactstrap';
import ReactStars from "react-rating-stars-component";
import { useForm } from 'react-hook-form';
import axios from 'axios'
import {useStore} from '../Components/store';
import {useHistory} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Comments(){

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm(); 
    var product = useStore(state => state.productId);
    
   

    const [allValues, setAllValues] = useState({
        custName: '',
        email: '',
        comment: '',
        rating : 0,
        setRate : false
     });


    const changeHandler = async(e) => {
        await setAllValues({...allValues, [e.target.name]: e.target.value})
        
     }
        
    
      const  addComment =async (data)=>{
        try{
            console.log(data)
            if(allValues.setRate == false){
                alert("Please select a rating");
            }else{
            const res= await axios.post('https://child-shopping-backend.herokuapp.com/product/comments?name='+product.name,{ 
              email:data.email,
              custName:data.custName,  
              comment:data.comment,
              rating:allValues.rating
            })
            if(res){
                console.log(res)
                alert("Comment has been added successfully!!");
              }
           
        }
             
        }catch(err){
          console.log(err)
        }  
     }

    return(
        <div>
            <br/>
            <h1>Add a review</h1>
            <br/>
            <h6>Your email address will not be published. Required fields are marked</h6>
            <h6>Your rating</h6>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                name="rating"
                value={allValues.rating}
                onChange={async(e, newValue) => {
                    await setAllValues({...allValues, rating: newValue, setRate : true})
                   
                }}
                />
            </Box>
            <h6>Your review</h6>
            <Form onSubmit={handleSubmit(addComment)}>
            <Row style={{margin:"0px",paddingBottom:"10px"}}>
                <textarea name="comment" className="form-control" ref={register({ required: true,minLength:5 })} onChange={changeHandler}rows="10"></textarea>
                {errors.comment && <span style={{color:"red"}}>Comment is required.</span>}
            </Row>
              <Row style={{margin:"0px"}}>
                <Col>
                   <Label style={{color:"gray",fontWeight:"bolder"}}>Name</Label>
                </Col>
                <Col>
                   <Label style={{color:"gray",fontWeight:"bolder"}}>Email</Label>
                </Col>
                </Row>
               
              <Row style={{margin:"0px",paddingBottom:"10px"}}>
                <Col>
                   <input name="custName" className="form-control" ref={register({ required: true,minLength:5,maxLength:20  })} onChange={changeHandler}/>
                   {errors.custName && <span style={{color:"red"}}>Name is required.</span>}
                </Col>
                <Col>
                  <input type="mailid" className="form-control" name="email" ref={register({ required: true ,pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} onChange={changeHandler}/>
                  {errors.email && <span style={{color:"red"}}>Email is required.</span>}
                </Col>
              </Row>
                <Row style={{margin:"0px"}}><input className="btn btn-info" type="Submit"/></Row>
                <br/>
              </Form>
        </div>
    )
}

export default Comments;