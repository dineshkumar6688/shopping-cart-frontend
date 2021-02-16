import React from "react";
import {Row,Col,Card,CardImg, Container,Button} from 'reactstrap';
import {useStore} from '../Components/store';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import '../Styles/popularProducts.css'


function Popular(){
    const history = useHistory();
    var popularProducts = useStore(state => state.popularProducts);    
    const updateId = useStore(state => state.updateId);
    var id = useStore(state => state.productId);    

    const productDetails = async(data)=>{
        try{
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
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,'Authorization':token},
                    body: JSON.stringify({ cart : value })
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
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' ,'Authorization':token},
                        body: JSON.stringify({ liked : value })
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

    const products = async(data)=>{
        try{
            history.push('/shop/')
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div>
            <Container>
              <div>
                <div>
                    <Row style={{margin:"0px"}}>
                        <Col><h1 style={{textAlign:"center",color:"darkblue",paddingTop:"80px",paddingBottom:"40px"}}>Popular Products</h1></Col>
                    </Row>
                </div>
                <div>
                    <Row style={{margin:"0px",textAlign:"center"}}>
                        {
                            popularProducts.map((res,index)=>
                            <Col sm={6} md={3} id={index} style={{padding:"10px"}}>
                                <Card  className="products-card" >
                                    <CardImg onClick={()=>productDetails(res._id)} className="products-img" src={res.img}></CardImg>
                                    <h6 style={{paddingTop:"10px",color:"darkblue"}}>{res.name}</h6>
                                    <span className="popular-price" style={{color:"gray"}}><span>{res.fromPrice}$</span>-<span>{res.toPrice}$</span></span>
                                    <div className="bar">
                                        <span className="addToCart" onClick={()=>getId(res,"cart")}>
                                            <i class="fa fa-shopping-bag fa-1x" aria-hidden="true"/>
                                        </span>
                                        <span className="addToLiked" onClick={()=>getId(res,"liked")}>
                                            <i class="fa fa-heart fa-1x" aria-hidden="true"/>
                                        </span>
                                    </div>
                                    
                                </Card>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
            <div style={{textAlign:"center",paddingTop:"70px",paddingBottom:"50px"}}>
                <Button onClick={products} className="products-button">All Products</Button>
            </div>
            </Container>
        </div>
    )
   
}

export default Popular;