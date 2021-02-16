import React, { Component} from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from '../Components/navbar.js'
import routes from "../route.js";
import {useStore} from '../Components/store'

function Admin(props) {
    const updateRecentBlog = useStore(state => state.updateRecentBlog)
    updateRecentBlog(props.state.recentBlogs,'recentBlogs');
    const updateProduct = useStore(state => state.updateProduct)
    updateProduct(props.state.products,'products');
    const updateSpecial = useStore(state => state.updateSpecial)
    updateSpecial(props.state.specialOffer,'specialOffer');
    const updateSeller = useStore(state => state.updateBest)
    updateSeller(props.state.bestSeller,'bestSeller');
    const updatePopular = useStore(state => state.updatePopular)
    updatePopular(props.state.popularProducts,'popularProducts');
    const updateToys = useStore(state => state.updateToys)
    updateToys(props.state.toys,'toys')
    const updateClothes = useStore(state => state.updateClothes)
    updateClothes(props.state.clothes,'clothes')
    const updateAccessories = useStore(state => state.updateAccessories)
    updateAccessories(props.state.accessories,'accessories')
    const updateEssentials = useStore(state => state.updateEssentials)
    updateEssentials(props.state.essentials,'essentials')
    const updateGifts = useStore(state => state.updateGifts)
    updateGifts(props.state.gifts,'gifts')
    const updateFurniture = useStore(state => state.updateFurniture)
    updateFurniture(props.state.furnitures,'furniture')
    
 function getRoutes(routes) {
    return routes.map((prop, key) => {
      return (
        <Route
          exact path={prop.path}
          render={props => (
            <prop.component
              {...props}
            />
          )}
          key={key}
        />
      );
    });
  }
 function PageNotFound() {
    return (
    <div style={{padding:"70px",
      textAlign:"center",
      backgroundColor:"violet"
    }} >
      <h1>404</h1>
      <h2>Page Not found</h2>
      <p>We cannot find the page you are looking for</p>
      </div>
    );
  };
  /**/
    return (
      <div className="wrapper">
        <div id="main-panel" className="main-panel" >
          <Navbar />
          <Switch>{getRoutes(routes)}
          <Route component={PageNotFound()} />
          </Switch>
        </div>
      </div>
    );
  
}

export default Admin;
