import React,{useState} from "react";
import {Row,Col,Card,CardImg, Container} from 'reactstrap';
import {useStore} from '../Components/store';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
const date = require('date-and-time');
import LinesEllipsis from 'react-lines-ellipsis'

function RecentBlog(){

    const history = useHistory();
    var recentBlogs = useStore(state => state.recentBlogs);
    const updateId = useStore(state => state.updateId);

    const productDetails = async(data)=>{
        try{
            var info = await axios.get('https://child-shopping-backend.herokuapp.com/blog?id='+data);
            await updateId(info,'productId');
            history.push('/blogdesc/')
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <Container>
            <Row style={{margin:"0px"}}>  
                { 
                    recentBlogs.map((res,index)=> 
                    <Col sm={6} md={4} id={index} style={{padding:"10px"}}>
                               
                            <img onClick={()=>productDetails(res._id)} className="card-img-top products-img" width="100%" src={res.images[0]}/>
                            <br/>
                            <br/>
                            <h6 style={{fontSize:"13px",color:"gray"}}>{date.format(new Date(res.date),'MMM DD, YYYY')}</h6>
                            <h6 style={{paddingTop:"2px",color:"darkblue"}}>{res.name}</h6> 
                                              
                            <LinesEllipsis style={{paddingTop:"14px",color:"gray"}}
                                text = {res.desc[0]}
                                maxLine='3'
                                ellipsis='...'
                                trimRight
                                />
                            <br/>
                            <h6 style={{color:"#E75480",cursor:"pointer"}} onClick={()=>productDetails(res._id)}>Read More</h6>
                    </Col> 
                    )}          
            </Row>
            </Container>
        </div>
    )
}

export default RecentBlog;