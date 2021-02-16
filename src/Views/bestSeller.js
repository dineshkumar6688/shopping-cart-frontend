import React,{useState} from "react";
import {Row,Col,Card,CardImg, Container} from 'reactstrap';
import {useStore} from '../Components/store';
import {useHistory} from 'react-router-dom';
import axios from 'axios'


function BestSeller(){
    const history = useHistory();
    var bestSeller = useStore(state => state.bestSeller);
    const updateId = useStore(state => state.updateId);
    var userDetails = useStore(state => state.userDetails);
    console.log(userDetails)
   
    const productDetails = async(data)=>{
        try{
            console.log(data)
            var info = await axios.get('https://child-shopping-backend.herokuapp.com/product?id='+data);
            await updateId(info,'productId');
            history.push('/product/')
        }catch(err){
            console.log(err)
        }
    }
    
    const getId = async(value,type)=>{
        try{
            
            if(type == "cart"){
                if(loggedIn == true){
                var token = "Bearer "+JSON.parse(localStorage.getItem('token'))
                var info = await axios.get('https://child-shopping-backend.herokuapp.com/product?id='+value);
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,'Authorization':token},
                    body: JSON.stringify({ quantity : 2,data: info})
                };
                fetch("http://localhost:5000/login/addToCart", requestOptions)
                    .then(() => {
                        alert("Product has been added to Cart!")
                    })
            }else{
                alert("User is not logged in!")
            }
            }else{
                if(loggedIn == true){
                    var token = "Bearer "+JSON.parse(localStorage.getItem('token'))
                    var info = await axios.get('https://child-shopping-backend.herokuapp.com/product?id='+value);
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' ,'Authorization':token},
                        body: JSON.stringify({ quantity:2,data : info.data })
                    };
                    fetch("http://localhost:5000/login/addToLiked", requestOptions)
                    .then(() => {
                        alert("Product has been added to Liked list!")
                    })
                }else{
                    alert("User is not logged in!");
                }
            }
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div>
            <Container>
            <div>
                <div style={{paddingTop:"100px"}}>
                    <Row style={{margin:"0px"}}>
                        <Col><h1 style={{textAlign:"center",color:"darkblue"}}>Bestseller</h1></Col>
                    </Row>
                </div>
                <div style={{paddingTop:"50px"}}>
                <Row style={{margin:"0px",textAlign:"center"}}>
                        {
                            bestSeller.map((res,index)=>
                            <Col sm={6} md={3} id={index} onClick={()=>productDetails(res._id)} style={{padding:"10px"}}>
                                <Card  className="products-card" >
                                    <CardImg onClick={()=>productDetails(res._id)} className="products-img" src={res.img}></CardImg>
                                    <h6 style={{paddingTop:"10px",color:"darkblue"}}>{res.name}</h6>
                                    <span className="popular-price" style={{color:"gray"}}><span>{res.fromPrice}$</span>-<span>{res.toPrice}$</span></span>
                                    <div className="bar">
                                        <span className="addToCart" onClick={()=>getId(res._id,"cart")}>
                                            <i class="fa fa-shopping-bag fa-1x" aria-hidden="true"/>
                                        </span>
                                        <span className="addToLiked" onClick={()=>getId(res._id,"liked")}>
                                            <i class="fa fa-heart fa-1x" aria-hidden="true"/>
                                        </span>
                                    </div>
                                    
                                </Card>
                            </Col>
                        )}
                        </Row>
                </div>
            </div>
            </Container>
        </div>
    )
   
}

export default BestSeller;