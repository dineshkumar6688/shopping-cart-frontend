import React, { useState } from "react";
import {Row,Col,Card,CardImg, Container} from 'reactstrap';
import {useStore} from '../Components/store';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Footer from '../Components/footer';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import ReactPaginate from 'react-paginate';
import '../Styles/pagination.css'


function SubCategory(){

    const history = useHistory();
    var toys = useStore(state => state.toys);
    const updateId = useStore(state => state.updateId);
    const [perPage, setPerPage] = useState(12);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    
    var count = Math.ceil(toys.length / perPage);

     
    const handlePageClick=(e)=>{
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        
        setCurrentPage(selectedPage);
        setOffset(offset)

      }

    const slice = toys.slice(offset,offset + perPage);


    const[value,setValue] = useState({
        from : 0,
        to : 90
    });

    const handleChange = (e)=>{
        setValue((prevState)=>{
            return({
                ...prevState,
                from : e[0],
                to : e[1]
            })
        })
    }

    const productDetails = async(data)=>{
        try{
            //console.log(data)
            var info = await axios.get('https://child-shopping-backend.herokuapp.com/product?id='+data);
            await updateId(info,'productId');
            history.push('/product/')
        }catch(err){
            console.log(err)
        }
    }

    const getId = async(data,type)=>{
        try{
            // console.log(data,type)
            if(type == "cart"){
                await axios.post('https://child-shopping-backend.herokuapp.com/product/addToCart?name='+data.name,{
                    cart: data
                });    
            }
            else {
                await axios.post('https://child-shopping-backend.herokuapp.com/product/addToLiked?name='+data.name,{
                    liked: data
                });
            }

        }catch(err){
            console.log(err)
        }
    }
   
    return(
        <div>
           <Row>
                            <h5>Categories</h5>
                        </Row>
                        <br/>
                        <Row>
                            <div>Clothes</div>
                        </Row>
                        <Row>
                            <div>Furniture</div>
                        </Row>
                        <Row>
                            <div>Gifts</div>
                        </Row>
                        <Row>
                            <div>Storage</div>
                        </Row>
                        <Row>
                            <div>Toys</div>
                        </Row>
                        <Row>
                            <div>Trending</div>
                        </Row>
                        <br/>
                        <Row><h5>Filter by price</h5></Row>
                        <br/>
                        <Row>
                            <Col md={12}>
                                <Range
                                    defaultValue={[value.from,value.to]}
                                    onChange={(e)=>handleChange(e)}
                                    step={10}
                                    pushable={true}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={5} md={5}>Filter</Col>
                            <Col sm={7} md={7}>Price: ${value.from} - ${value.to}</Col> 
                        </Row>
                        <br/>
                
        </div>
    )
   
}

export default SubCategory;