import React from "react";
import Footer from '../Components/footer.js'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import mario from '../Images/mario.jpg';
import smiley from '../Images/smiley.jpg';
import crane from '../Images/crane.jpg';
import warrior from '../Images/warrior.jpg';
import pokeball from '../Images/pokeball.jpg';
import blocks from '../Images/blocks.jpg';
import car from '../Images/car.jpg';
import baby from '../Images/baby.jpg';
import diecasttrain from '../Images/diecast-train.jpg'
import {Row,Col,Jumbotron,Button} from 'reactstrap';
import '../Styles/home.css';
import Countdown from 'react-countdown';   
import offers from '../Images/offers.jpg';
import Price from 'react-price';
import Popular from '../Views/popularDetails';
import BestSeller from '../Views/bestSeller';
import Category from "../Views/category.js";
import Sales from '../Views/sales'
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import {useStore} from '../Components/store';
import RecentBlog from '../Views/recentBlog'


function Home(){

    const history = useHistory();
    var specialOffer = useStore(state => state.specialOffer);
    console.log(specialOffer)
    const updateId = useStore(state => state.updateId);

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

    return(
        <div>
            <Row style={{margin:"0px"}}>
                <Col sm={12} md={12}>
                <Carousel autoPlay>
                    <div>
                        <img width="50%" src={baby} />
                        <p className="legend">Legend 1</p>
                    </div>
                    <div>
                        <img src={diecasttrain} />
                        <p className="legend">Legend 2</p>
                    </div>
                    <div>
                        <img src={mario} />
                        <p className="legend">Legend 3</p>
                    </div>
                    <div>
                        <img src={smiley} />
                        <p className="legend">Legend 4</p>
                    </div>
                    <div>
                        <img src={car} />
                        <p className="legend">Legend 5</p>
                    </div>
                    <div>
                        <img src={crane} />
                        <p className="legend">Legend 6</p>
                    </div>
                    <div>
                        <img src={warrior} />
                        <p className="legend">Legend 7</p>
                    </div>
                    <div>
                        <img src={blocks} />
                        <p className="legend">Legend 8</p>
                    </div>
                    <div>
                        <img src={pokeball} />
                        <p className="legend">Legend 9</p>
                    </div>
                </Carousel>
                </Col>
            </Row>
            <div>
                <Category/>
            </div>
            <div>
                <Sales/>
            </div>
            <div>
                <BestSeller/>
            </div>
            <div style={{paddingTop:"80px"}}>
               
                <Row style={{margin:"0px"}}>
                    <Jumbotron>
                        <Row style={{margin:"0px"}}>
                        <Col md={7}>
                        <img width="100%" src={offers}/>
                        </Col>
                        <Col md={5}>
                            <div style={{textAlign:"center"}}>
                                <h3 style={{color:"#E75480"}}>Special Offers</h3>
                                <div style={{paddingTop:"10px"}}>
                                    <h2 style={{color:"darkblue"}}>
                                        Deal off the day
                                    </h2>
                                    <h3 style={{color:"#E75480"}}>Sale 30% off</h3>
                                </div>
                                <div style={{paddingTop:"20px",paddingBottom:"20px"}}>
                                    <Countdown date={Date.now() + 99900000} />
                                </div>
                                <h2  style={{color:"darkblue"}}>{specialOffer[0].name}</h2>
                                <div style={{paddingTop:"20px",paddingBottom:"20px"}}>
                                    <span>
                                        <span style={{color:"#E75480"}}><Price cost={specialOffer[0].fromPrice} currency="$"/></span>
                                        <span style={{color:"gray"}}><Price cost={100.00} currency="$" type="old"/></span>
                                    </span> 
                                </div>
                                <Button className="shop" onClick={()=>productDetails(specialOffer[0]._id)}>Shop Now</Button>
                             </div>
                        </Col>
                        </Row>
                    </Jumbotron>
                </Row>
            </div>
            <div><Popular/></div>
            <div>
                <Row style={{margin:"0px"}}>
                    <Col><h1 style={{textAlign:"center",color:"darkblue",paddingTop:"80px",paddingBottom:"40px"}}>Recent Blog</h1></Col>
                </Row>
                <br/>
                <RecentBlog/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Home;
