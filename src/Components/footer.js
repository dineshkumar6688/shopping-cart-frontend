import React,{ Component,useState } from "react";
import { Container,Row,Col,Input } from "reactstrap";
import '../Styles/footer.css'
import 'font-awesome/css/font-awesome.css'
import {useHistory} from 'react-router-dom';

function Footer(){ 
    
    const history = useHistory();

    const shop = async(data)=>{
        history.push('/shop')
    }

    return(
        <div className="footer">
            <Container>
                <Row style={{margin:"0px"}}>
                    <Col sm={12} md={3}>
                        <Row style={{margin:"0px"}}>
                            <h3 style={{color:"#E75480",paddingTop:"10px"}}>Toy World</h3>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <div style={{paddingRight:"10px",paddingTop:"10px"}}>
                                A baby & kids store thaAt based in New York. We are crafting beautiful, quality products with an affordable price.
                            </div>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <div style={{paddingTop:"20px",paddingRight:"5px"}}>
                                <span className="social">
                                    <i class="fa fa-facebook" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div style={{paddingTop:"20px",paddingRight:"5px"}}>
                                <span className="social">
                                    <i class="fa fa-twitter" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div style={{paddingTop:"20px"}}>
                                <span className="social">
                                    <i class="fa fa-instagram" aria-hidden="true"></i>
                                </span>
                            </div>
                        </Row>
                    </Col>
                    <Col sm={12} md={3}>
                        <Row style={{margin:"0px"}}>
                            <h3 style={{paddingTop:"10px",color:"darkblue"}}>Company</h3>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <span className="footer-items">About Us</span>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <span className="footer-items">FAQs</span>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <span className="footer-items">Comming Soon</span>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <span className="footer-items">Blogs</span>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <span className="footer-items">Contact</span>
                        </Row>
                    </Col>
                    <Col sm={12} md={3}>
                        <Row style={{margin:"0px"}}>
                            <h3 style={{paddingTop:"10px",color:"darkblue"}}>Shop</h3>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <span className="footer-items">My Account</span>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <span className="footer-items">Wishlist</span>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <span className="footer-items">Track My Order</span>
                        </Row>
                        <Row style={{margin:"0px"}}>
                            <span className="footer-items" onClick={shop}>Shop</span>
                        </Row>
                    </Col>
                    <Col sm={12} md={3}>
                        <Row style={{margin:"0px"}}>
                            <h3 style={{paddingTop:"10px",color:"darkblue"}}>Newsletter</h3>
                        </Row>
                        <Row style={{margin:"0px"}} className="footer-items">
                            <div>Get 20% off for your first order by signing up to our newsletter to get the latest news & offers</div>
                        </Row>
                        <Row style={{paddingTop:"20px",margin:"0px"}}>
                            <Input placeholder="your@lemail.com"/>
                        </Row>
                        <Row style={{paddingTop:"40px",margin:"0px"}}>Note: Your email address will not be published. You can unsubscribe any time you want by using unsubscribe link.</Row>
                    </Col>
                </Row>
            </Container>
            <br/><br/><br/><br/><br/>
            <Row style={{margin:"0px"}}>
                <Col>
                    <div style={{textAlign:"center",backgroundColor:"#DCDCDC",paddingTop:"10px",paddingBottom:"10px"}}>
                        &copy; {new Date().getFullYear()} Miuzin Store. All Rights Reserved. Designed by Haintheme.
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Footer;