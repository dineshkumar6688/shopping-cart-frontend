import React,{useState} from "react";
import {Row,Col,Card,CardImg,Badge, Button, Container,InputGroup,InputGroupAddon,Input} from 'reactstrap';
import {useStore} from '../Components/store';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function SubBlog() {

    var recentBlogs = useStore(state => state.recentBlogs);
    var length = recentBlogs.length;
    const history = useHistory();
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
            <InputGroup>
                <Input />
                <InputGroupAddon addonType="prepend"><Button color="info"><i class="fa fa-search"></i></Button></InputGroupAddon>
            </InputGroup>
            <br/>
            <br/>
            <div style={{color:"darkblue"}}>Recent Posts</div>
            <br/>
            <div>
          
                <div>
                    <img onClick={()=>productDetails(recentBlogs[length-1]._id)} src={recentBlogs[length-1].images[0]} width="40%"/>
                    <div style={{color:"darkblue"}} onClick={()=>productDetails(recentBlogs[length-1]._id)}>{recentBlogs[length-1].name}</div>
                    <br/><br/>
                </div>
                <div>
                    <img onClick={()=>productDetails(recentBlogs[length-2]._id)} src={recentBlogs[length-2].images[0]} width="40%"/>
                    <div style={{color:"darkblue"}} onClick={()=>productDetails(recentBlogs[length-2]._id)}>{recentBlogs[length-2].name}</div>
                    <br/><br/>
                </div>
                <div>
                    <img onClick={()=>productDetails(recentBlogs[length-3]._id)} src={recentBlogs[length-3].images[0]} width="40%"/>
                    <div style={{color:"darkblue"}} onClick={()=>productDetails(recentBlogs[length-3]._id)}>{recentBlogs[length-3].name}</div>
                    <br/><br/>
                </div>
                
            </div>
        </div>
    )

}

export default SubBlog;