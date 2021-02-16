import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import {Row,Col,Card,CardImg, Container} from 'reactstrap';
import {useStore} from '../Components/store';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Footer from '../Components/footer'
import { makeStyles } from '@material-ui/core/styles';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import ReactPaginate from 'react-paginate';
import '../Styles/pagination.css'

function Shop(){   
    
    const[value,setValue] = useState({
        from : 0,
        to : 90
    });
    const history = useHistory();
    var products = useStore(state => state.products);    
    const updateId = useStore(state => state.updateId);
    const [perPage, setPerPage] = useState(12);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

   

    var count = Math.ceil(products.length / perPage);

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
            var info = await axios.get('https://child-shopping-backend.herokuapp.com/product?id='+data);
            await updateId(info,'productId');
            history.push('/product/')
        }catch(err){
            console.log(err)
        }
    }
    
    const handlePageClick=(e)=>{
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        
        setCurrentPage(selectedPage);
        setOffset(offset)

      }

    const slice=products.slice(offset,offset + perPage);

    return(
        <div>
            <div style={{paddingBottom:"30px"}}>
                <div class="containers">
                <div class="center">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/">
                        Home
                    </Link>
                    <Typography className="crumbs">Shop</Typography>
                </Breadcrumbs>
                </div>
                </div>
            </div>
            <br/>
            <br/>
            <Container>    
                <Row style={{margin:"0px"}}> 
                    <Col md={9}>
                        <Row style={{margin:"0px"}}>
                            <Col xs={12} sm={6} md={3}>
                                <h6>Showing all the results</h6>
                            </Col>
                            <Col className="offset-md-6" xs={12} sm={6} md={2}>
                                <div style={{textAlign:"end"}} class="dropdown">
                                    <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Default sorting
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Sort by popularity</a>
                                        <a class="dropdown-item" href="#">Sort by average rating</a>
                                        <a class="dropdown-item" href="#">Sort by latest</a>
                                        <a class="dropdown-item" href="#">Sort by price:low to high</a>
                                        <a class="dropdown-item" href="#">Sort by price:high to low</a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <br/> 
                        <Row style={{margin:"0px",textAlign:"center"}}>
                        { 
                            slice.map((res,index)=>
                            <Col sm={6} md={4} id={index} style={{padding:"10px"}}>
                              
                                <Card onClick={()=>productDetails(res._id)} className="products-card" >
                                    <CardImg className="products-img" src={res.img}/>
                                    <h6 style={{paddingTop:"10px",color:"darkblue"}}>{res.name}</h6>
                                    <span className="popular-price" style={{color:"gray"}}><span>{res.fromPrice}$</span>-<span>{res.toPrice}$</span></span>
                                </Card>
                            </Col>
                        )}
                        </Row>
                    </Col>
                    <Col md={3}>
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
                    </Col>
                </Row>  
                <br/>
                <br/>
                <Row style={{margin:"0px",textAlign:"center"}}>
                {products.length<1 ? (
          <div><br/>
            <h5>Sorry,we cannot find any products currently since the site is in maintainence</h5>
            </div>
            
            ):count>1 ? (
              <div style={{left: '35%', top: '35%',
              transform: 'translate(-35%, -35%)',position: 'relative', }}>
                 <ReactPaginate StyledTextField
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={count}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    </div>
                    ):
                    (<div></div>)
                }
              </Row>
                </Container>
                <hr/>
            <Container>
                <br/>
                <Row>
                    <Footer/>
                </Row>
            </Container>
        </div>
    )
}

export default Shop;