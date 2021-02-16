import React,{useState} from "react";
import {Row,Col,Card,CardImg, Container} from 'reactstrap';
import {useStore} from '../Components/store';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Footer from '../Components/footer'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import ReactPaginate from 'react-paginate';
import '../Styles/pagination.css';
import SubCategory from '../Views/subCategory'



function Accessories(){

    const history = useHistory();
    var accessories = useStore(state => state.accessories);
    const updateId = useStore(state => state.updateId);

    const [perPage, setPerPage] = useState(12);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    
    var count = Math.ceil(accessories.length / perPage);

     
    const handlePageClick=(e)=>{
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        
        setCurrentPage(selectedPage);
        setOffset(offset)

      }

    const slice=accessories.slice(offset,offset + perPage);

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
            console.log(data)
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
            <div style={{paddingBottom:"30px"}}>
                <div class="containers">
                <div class="center">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/">
                        Home
                    </Link>
                    <Typography className="crumbs">Accessories</Typography>
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
                    </Col>
                    <Col md={3}>
                        <SubCategory/>
                    </Col>
                </Row>  
                <br/>
                <br/>
                <Row style={{margin:"0px",textAlign:"center"}}>
                {accessories.length<1 ? (
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

export default Accessories;