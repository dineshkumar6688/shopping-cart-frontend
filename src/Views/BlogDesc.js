import React,{useState} from "react";
import {Row,Col,Card,CardImg,Badge, Button, Container} from 'reactstrap';
import {useStore} from '../Components/store';
const date = require('date-and-time');
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import SubBlog from '../Views/subBlog'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Comment from '../Views/comments'


function BlogDesc() {

    const history = useHistory();
    var recentBlogs = useStore(state => state.productId);
    var relatedBlogs =  useStore(state => state.relatedPost)
    var updateRelatedPost = useStore(state => state.updateRelatedPost)
    var Blogs = useStore(state => state.recentBlogs);
    const updateId = useStore(state => state.updateId);
    var recent = useStore(state => state.recentBlogs);
    var length = recent.length;

    const PrevDetails = async(data)=>{
        try{
             
            if(relatedBlogs.prev != 0){
            await updateRelatedPost({
                prev:relatedBlogs.prev-1,
                next:relatedBlogs.next-1
            },'relatedPost');            
            var info = await axios.get('https://child-shopping-backend.herokuapp.com/blog?id='+data._id);
            await updateId(info,'productId');
            history.push('/blogdesc/')
        }
        }catch(err){
            console.log(err) 
        }
    }

    const NextDetails = async(data)=>{
        try{
            if(relatedBlogs.next < length-1){
            await updateRelatedPost({
                prev:relatedBlogs.prev+1,
                next:relatedBlogs.next+1
            },'relatedPost');
            var info = await axios.get('https://child-shopping-backend.herokuapp.com/blog?id='+data._id);
            await updateId(info,'productId');
            history.push('/blogdesc/')
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
                    <Link color="inherit" href="/blog">
                        Blog
                    </Link>
                    <Typography className="crumbs">{recentBlogs.name}</Typography>
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
                            <img width="100%" src={recentBlogs.images[0]}/>
                        </Row>
                        <br/>
                        <div style={{color:"#383838"}}>
                            babie . {date.format(new Date(recentBlogs.date),'MMM DD, YYYY')} . Blog
                        </div>
                        <br/>
                        <div>
                            {recentBlogs.desc[0]}
                        </div>
                        <br/>
                        <div style={{color:"darkblue"}}>Santa Claus is coming to town</div>
                        <br/>
                        <div style={{color:"#383838"}}>{recentBlogs.desc[1]}</div>
                        <br/>
                        <div style={{color:"darkblue"}}>It's all fun and games 'til Santa <br/>check the naughty list."</div>
                        <br/>
                        <Row style={{margin:"0px"}}>
                            <Col md={6}>
                                <img src={recentBlogs.images[1]} />
                            </Col>
                            <Col md={6}>
                                <img src={recentBlogs.images[2]} width="100%"/>
                            </Col>
                        </Row>
                        <div style={{paddingTop:"15px",paddingBottom:"18px",color:"darkblue"}}>Autumn/Winter Collection 2021 is available now</div>
                        <div style={{color:"#383838"}}>{recentBlogs.desc[1]}</div>
                        <br/>
                        <div style={{color:"darkblue"}}>"It's all fun and games 'til Santa check the naughty list."</div>
                        <br/>
                        <div><span style={{color:"darkblue"}}>Tags: </span><span style={{color:"#383838"}}>clothes</span> <span style={{color:"#383838"}}>collection</span> <span style={{color:"#383838"}}>fashion</span></div>
                        <br/>
                        <br/>
                        <div>Related Posts</div>
                        <br/>
                        <Row style={{margin:"0px"}}>
                            <Col md={3}>
                                <img src={Blogs[relatedBlogs.prev].images[0]} width="80%"/>
                            </Col>
                            <Col  md={3}>
                                <div style={{fontSize:"15px"}} onClick={()=>PrevDetails(Blogs[relatedBlogs.prev])}>
                                    <div style={{color:"#383838"}}>
                                       PREV POST 
                                    </div>
                                    <div style={{color:"darkblue"}}>
                                        {Blogs[relatedBlogs.prev].name}
                                    </div>
                                </div>
                            </Col>
                            <Col md={3}>
                                <img src={Blogs[relatedBlogs.next].images[0]} width="80%"/>
                            </Col>
                            <Col  md={3}>
                                <div style={{fontSize:"15px"}} onClick={()=>NextDetails(Blogs[relatedBlogs.next])}>
                                    <div style={{color:"#383838"}}>
                                       NEXT POST 
                                    </div>
                                    <div style={{color:"darkblue"}}>
                                        {Blogs[relatedBlogs.next].name}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <Comment/>
                    </Col>
                    <Col md={3}><SubBlog/></Col>
                </Row>
            </Container>
        </div>
    )
}

export default BlogDesc;