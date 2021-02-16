import React from "react";
import {Card,CardImg,CardBody} from 'reactstrap';
import boysclothing from '../Images/boys-clothing.jpg'
import summercollections from '../Images/summer-collections.jpg'
import off from '../Images/off.jpg'
import toysandgames from '../Images/toysandgames.jpg'
import {useHistory} from 'react-router-dom';

function Sales(){

    const history = useHistory();
    const routes = async(data)=>{
        try{
            console.log(data)
            if(data == "clothes"){
                history.push('/clothes/')
            }
            else if(data == "toys"){
                history.push('/toys/')        
            }
            else{
                history.push('/gifts/')
            }
        }catch(err){
            console.log(err)
        }
    }

   
   
    return(
        
        <div>
            <div style={{margin:"0px"}} class="card-columns">  
                <div>
                    <Card onClick={(e)=>routes("clothes")} className="card-columns-itm image">
                    <CardImg className="card-columns-items-img"  top src={boysclothing} alt="Card image cap"/>
                        <CardBody> 
                            <div className="over" style={{padding:"10px"}}>
                                <div>
                                    <h5 className="column-over">Boys <br/> Clothing</h5>
                                </div>
                                <div>
                                <div className="column-shop">Shop Now &gt;&gt;</div>
                                </div>
                            </div>
                        </CardBody> 
                    </Card>
                </div>
                <div>
                    <Card onClick={(e)=>routes("toys")} className="card-columns-items image">
                        <CardImg className="card-columns-items-image" top src={off} alt="Card image cap"/>
                        <CardBody>
                            <div className="over" style={{padding:"10px"}}>
                                <div>
                                    <h5 className="column-over">Sale Off 10%</h5>
                                </div>
                                <div>
                                    <div className="column-shop">Shop Now &gt;&gt;</div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <Card onClick={(e)=>routes("toys")} className="card-columns-items image">
                        <CardImg className="card-columns-items-image" top src={toysandgames} alt="Card image cap"/>
                        <CardBody>
                            <div className="over" style={{padding:"10px"}}>
                                <div>
                                    <h5 className="column-over">Toys & Game</h5>
                                </div>
                                <div>
                                    <div className="column-shop">Shop Now &gt;&gt;</div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <Card onClick={(e)=>routes("gifts")} className="card-columns-itm image">
                        <CardImg className="card-columns-items-img" top src={summercollections} alt="Card image cap"/>
                        <CardBody>
                            <div className="over" style={{padding:"10px"}}>
                                <div>
                                    <h5 className="column-over">Summer <br/> Collections</h5>
                                </div>
                                <div>
                                    <div className="column-shop">Shop Now &gt;&gt;</div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
   
}

export default Sales;