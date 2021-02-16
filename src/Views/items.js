import React,{useState} from "react";
import {Row,Col,Card,CardImg,Badge, Button, Container,Table} from 'reactstrap';
import Price from 'react-price';
import {useStore} from '../Components/store';
import { Carousel } from 'react-responsive-carousel';
import '../Styles/app.css'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import '../Styles/items.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import SubCategory from "./subCategory";
import Comments from './comments'
import Avatar from 'react-avatar';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


function Items(){

    const[value,setValue] = useState({
        from : 0,
        to : 90
    });

    var product = useStore(state => state.productId);
    var Size = (product.details.length)-1
    var commentSize =  (product.comments.length);
    var loggedIn = useStore(state => state.loggedIn);

    const getId = async(value,type)=>{
        try{
            
            if(type == "cart"){
                if(loggedIn == true){
                var token = "Bearer "+JSON.parse(localStorage.getItem('token'))
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,'Authorization':token},
                    body: JSON.stringify({ quantity:2,data : value })
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
                        body: JSON.stringify({ quantity:2,data : value })
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
    

    const handleChange = (e)=>{
        setValue((prevState)=>{
            return({
                ...prevState,
                from : e[0],
                to : e[1]
            })
        })
    }

    return(
        <div>
            <div style={{paddingBottom:"30px"}}>
                <div class="containers">
                <div class="center">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/">
                        Home
                    </Link>
                    <Typography className="crumbs">Product</Typography>
                    <Typography className="crumbs">{product.name}</Typography>
                </Breadcrumbs>
                </div>
                </div>
            </div>
            <Container>
            <Row style={{margin:"0px"}}>
                <Col md={5}>
                    <div>
                        <Carousel autoPlay stopOnHover>
                         {
                            product.img.map((res)=>   
                                <img width="100%" src={res} /> 
                            )}
                        </Carousel>
                    </div>
                </Col>
                <Col md={4}>
                    <Row style={{margin:"0px"}}>
                        <h1 className="item-name" style={{color:"darkblue"}}>{product.name}</h1>
                    </Row>
                    <br/>
                    <Row style={{margin:"0px"}}>
                        <h3 className="item-price" style={{color:"gray"}}>
                            <Price cost={product.fromPrice} currency="$"/>-<Price cost={product.toPrice} currency="$"/>
                        </h3>
                    </Row>
                    <br/>
                    <Row style={{margin:"0px"}}>
                        <h4>
                            <p className="item-desc" style={{color:"gray"}}>{product.desc}</p>
                        </h4>
                    </Row>
                    <br/>
                    <hr/>
                    <Row style={{margin:"0px"}}>
                        <Col xs={3} sm={3} md={2}>Size</Col>
                        {product.details.map((res)=>
                        <Col xs={3} md={2}><Button className="dot">{res.size}</Button></Col>)}
                    </Row>
                    <hr/>
                    <Row style={{margin:"0px"}}>
                    <div style={{textAlign:"center"}} class="btn-group">
                        <Button style={{borderColor:"white",backgroundColor:"#F8F8F8",color:"black"}}>-</Button>
                        <Button style={{borderColor:"white",backgroundColor:"#F8F8F8",color:"black"}}>1</Button>
                        <Button style={{borderColor:"white",backgroundColor:"#F8F8F8",color:"black"}}>+</Button>
                    </div>
                    <span style={{paddingLeft:"10px"}}>
                        <Button style={{backgroundColor:"darkblue"}} onClick={()=>getId(product,"cart")}>Add to cart</Button>
                    </span>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <Button style={{backgroundColor:"gray"}}  onClick={()=>getId(product,"liked")}><i class="fa fa-heart fa-1x" aria-hidden="true"/> Add to Wishlist</Button>
                        </Col>
                    </Row>
                    <hr/>
                </Col>
                <Col md={3}>
                    <SubCategory/>
                </Col>
            </Row>
            <br/>
                            
            <Row style={{margin:"0px"}}>
                <Col md={12}>
                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Additional information</Tab>
                            <Tab>Reviews({commentSize})</Tab>
                        </TabList>
                        <TabPanel>
                            <h2>Description</h2>
                            <p>{product.desc}</p>
                        </TabPanel>
                        <TabPanel>
                        <Container>
                            <br/>
                            <h2>Additional information</h2>
                            <br/>
                           
                            <div>
                                <div className="form-control">
                                    <span>Color</span>
                                    <span>
                                    {product.details.map((data, index) => {
                                        
                                    return (
                                        
                                        <span>{index!=Size?data.color+",":data.color}</span>
                                    )
                                    })}
                                    </span>
                                </div>
                                <div className="form-control">
                                    <span>Size</span>
                                    <span>
                                    {product.details.map((data, index) => {
                                    return (
                                        <span>{index!=Size?data.color+",":data.size}</span>
                                    )
                                    })}
                                    </span>
                                </div>
                            </div>
                            </Container>
                            <br/>
                            <br/>
                            <br/>
                        </TabPanel>
                        <TabPanel>
                            <br/>
                            <h2>Reviews</h2>
                            <br/>
                            <div>
                                {commentSize < 0? 
                                <div>
                                    <div>There are no reviews yet.</div>
                                    <br/>
                                    <div>Be the first to review "{product.name}"</div>
                                </div>
                                :
                                <div>{
                                    product.comments.map((x,id)=>{
                                        return(
                                        <div>
                                       
                                        <Row style={{margin:"0px"}}>
                                            <Col md={2}>
                                            <Avatar width="100%" src="https://www.infersgroup.com/img/team/placeholder.jpg" name="Wim Mostmans" />
                                            </Col>
                                            <Col md={5}>
                                                <div>Your review is awaiting approval</div>
                                                <div>
                                               
                                                    <Rating
                                                    name="rating"
                                                    value={x.rating}
                                                    readOnly
                                                    />
                                                </div>
                                                <div>{x.comment}</div>
                                            </Col>
                                        </Row>
                                        <hr/>
                                        </div>
                                        )
                                    })
                                }</div>
                                }
                            </div>
                           <div> 
                               <Comments/>
                            </div>
                               
                          
                        </TabPanel>
                    </Tabs>
                   
                       
                  
                   
                </Col>
            </Row>
        </Container>
    </div>
    )
   
}

export default Items;