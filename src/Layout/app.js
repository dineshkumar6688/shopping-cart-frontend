import React, { Component } from 'react'
import Admin from '../Components/Admin'
 class App extends Component {
  constructor(props)
  {
      super(props)
      this.state={
        products:[],
        specialOffer:'',
        popularProducts:[],
        toys:[],
        clothes:[],
        accessories:[],
        essentials:[],
        gifts:[],
        furnitures:[],
        recentBlogs:[],
        fetched:false,
      }
  }
  async componentDidMount()
  {
      var products,specialOffer,bestSeller,popularProduct,toy,cloth,accessory,essential,gift,furniture,recentBlogs;
      products = await (await fetch('https://child-shopping-backend.herokuapp.com/product')).json()
      specialOffer = await (await fetch('https://child-shopping-backend.herokuapp.com/product?name=Mini Slippers')).json()
      bestSeller = await (await fetch('https://child-shopping-backend.herokuapp.com/product?limit=4')).json()
      popularProduct = await (await fetch('https://child-shopping-backend.herokuapp.com/product?limit=8')).json()
      toy = await (await fetch('https://child-shopping-backend.herokuapp.com/product?type=toy')).json()
      cloth = await (await fetch('https://child-shopping-backend.herokuapp.com/product?type=clothes')).json()
      accessory = await (await fetch('https://child-shopping-backend.herokuapp.com/product?type=accessories')).json()
      essential = await (await fetch('https://child-shopping-backend.herokuapp.com/product?type=essentials')).json()
      gift = await (await fetch('https://child-shopping-backend.herokuapp.com/product?type=gifts')).json()
      furniture = await (await fetch('https://child-shopping-backend.herokuapp.com/product?type=furniture')).json()
      recentBlogs = await (await fetch('https://child-shopping-backend.herokuapp.com/blog')).json()

      this.setState({ 
        products: products,
        specialOffer: specialOffer,
        bestSeller: bestSeller,
        popularProducts: popularProduct,
        toys: toy,
        clothes: cloth,
        accessories: accessory,
        essentials: essential,
        gifts: gift,
        furnitures: furniture,
        recentBlogs :recentBlogs,
        fetched: true
      })
  }
  render() {

    return (
      <div>{this.state.fetched?<Admin state={this.state}/>:<div/>}
      </div>
    )
  }
}
export default App;