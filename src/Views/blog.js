import React,{useState} from "react";
import {Row,Col,Card,CardImg,Badge, Button, Container} from 'reactstrap';
import {useStore} from '../Components/store';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
const date = require('date-and-time');
import LinesEllipsis from 'react-lines-ellipsis'
import SubBlog from '../Views/subBlog'
import ReactPaginate from 'react-paginate';
import '../Styles/pagination.css'


function Blog(){

    const history = useHistory();
    var recentBlogs = useStore(state => state.recentBlogs);
    const updateId = useStore(state => state.updateId);
    const [perPage, setPerPage] = useState(3);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    var count = Math.ceil(recentBlogs.length / perPage);

    const productDetails = async(data)=>{
        try{
            var info = await axios.get('https://child-shopping-backend.herokuapp.com/blog?id='+data);
            await updateId(info,'productId');
            history.push('/blogdesc/')
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

    const slice=recentBlogs.slice(offset,offset + perPage);


    return(
        <div>
            <div style={{paddingBottom:"30px"}}>
                <div class="containers">
                <div class="center">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/">
                        Home
                    </Link>
                    <Typography className="crumbs">Blogs</Typography>
                </Breadcrumbs>
                </div>
                </div>
            </div>
            <br/>
            <br/>
            <Container>
                <Row style={{margin:"0px"}}>
                    <Col md={9}>
                    { 
                    slice.map((res,index)=> 
                    <Col sm={6} md={12} id={index} style={{padding:"10px"}}>
                               
                            <img onClick={()=>productDetails(res._id)} className="card-img-top products-img" width="100%" src={res.images[0]}/>
                            <br/>
                            <br/>
                            <h6 style={{paddingTop:"2px",color:"darkblue"}} onClick={()=>productDetails(res._id)}>{res.name}</h6> 
                            <div style={{color:"#383838"}}>
                            babie . {date.format(new Date(res.date),'MMM DD, YYYY')} . Blog
                            </div>
                                              
                            <LinesEllipsis style={{paddingTop:"14px",color:"gray"}}
                                text = {res.desc[0]}
                                maxLine='4'
                                ellipsis='...'
                                trimRight
                                />
                            <br/>
                            <h6 style={{color:"darkblue",cursor:"pointer"}} onClick={()=>productDetails(res._id)}>Read More</h6>
                    </Col> 
                    )}          
                        
                    </Col>
                    <Col md={3}><SubBlog/></Col>
                </Row>
                <br/>
                <br/>
                <Row style={{margin:"0px",textAlign:"center"}}>
                {recentBlogs.length<1 ? (
          <div><br/>
            <h5>Sorry,we cannot find any blogs currently since the site is in maintainence</h5>
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
        </div>
    )
}

export default Blog;