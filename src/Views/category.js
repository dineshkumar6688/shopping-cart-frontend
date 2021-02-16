import React,{useState} from "react";
import {Row,Col,Card,CardImg,CardBody, Container} from 'reactstrap';
import toys from '../Images/toys.jpg'
import clothes from '../Images/clothes.jpg'
import accessories from '../Images/accessories.jpg'
import essentials from '../Images/essentials.jpg'
import gifts from '../Images/gifts.jpg'
import furniture from '../Images/furniture.jpg';
import '../Styles/home.css'
import {useHistory} from 'react-router-dom';


function Category(){

    const history = useHistory();
    const categoryRoutes = async(name)=>{
        try{
            if(name == "toys"){
                history.push('/toys/')
            }
            else if(name == "clothes"){
                history.push('/clothes/')
            }
            else if(name == "accessories"){
                history.push('/accessories/')
            }
            else if(name == "essentials"){
                history.push('/essentials/')
            }
            else if(name == "gifts"){
                history.push('/gifts/')
            }
            else if(name == "furniture"){
                history.push('/furniture/')
            }
        }catch(err){
            console.log(err)
        }
    }
  

   
    return(
        <div>
            <Container>
            <div>
                <Row style={{margin:"0px"}}> 
                    <Col xs={6} sm={12} md={2} className="items">
                        <Card onClick={()=>{categoryRoutes("toys")}}>
                            <CardImg className="items-card" top  src={toys} alt="Card image cap" />
                            <CardBody style={{textAlign:"center"}}>
                                <h6 className="items-name">Toys</h6>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs={6} sm={12} md={2} className="items">
                        <Card onClick={()=>{categoryRoutes("clothes")}}>
                            <CardImg className="items-card" top src={clothes} alt="Card image cap" />
                            <CardBody style={{textAlign:"center"}}>
                                <h6 className="items-name">Clothes</h6>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs={6} sm={12} md={2} className="items">
                        <Card onClick={()=>{categoryRoutes("accessories")}}>
                            <CardImg className="items-card" top src={accessories} alt="Card image cap" />
                            <CardBody style={{textAlign:"center"}}>
                                <h6 className="items-name">Accessories</h6>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs={6} sm={12} md={2} className="items">
                        <Card onClick={()=>{categoryRoutes("essentials")}}>
                            <CardImg className="items-card" top src={essentials} alt="Card image cap" />
                            <CardBody style={{textAlign:"center"}}>
                                <h6 className="items-name">Essentials</h6>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs={6} sm={12} md={2} className="items">
                        <Card onClick={()=>{categoryRoutes("gifts")}}>
                            <CardImg top className="items-card" src={gifts} alt="Card image cap" />
                            <CardBody style={{textAlign:"center"}}>
                                <h6 className="items-name">Gifts</h6>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs={6} sm={12} md={2} className="items">
                        <Card onClick={()=>{categoryRoutes("furniture")}}>
                            <CardImg className="items-card" top src={furniture} alt="Card image cap" />
                            <CardBody style={{textAlign:"center"}}>
                                <h6 className="items-name">Furniture</h6>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            </Container>
        </div>
    )
   
}

export default Category;