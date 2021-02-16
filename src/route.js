import Home from './Views/home.js'
import Login from './Views/login.js'
import Signup from './Views/signup.js'
import Shop from './Views/shop.js'
import Blog from './Views/blog.js'
import Contact from './Views/contact.js'
import Pages from './Views/pages.js'
import Items from './Views/items.js'
import Toys from './Views/toys.js'
import Clothes from './Views/clothes.js'
import Accessories from './Views/accessories.js'
import Essentials from './Views/essentials.js'
import Gifts from './Views/gifts.js'
import Furniture from './Views/furniture.js'
import BlogDesc from './Views/BlogDesc'


const Routes = [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/blogdesc",
      name: "blogdesc",
      component: BlogDesc
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop
    },
    {
      path: "/blog",
      name: "blog",
      component: Blog
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact
    },
    {
      path: "/pages",
      name: "pages",
      component: Pages
    },
    {
      path:"/product/",
      name:"product",
      component: Items
    },
    {
      path:"/toys/",
      name:"toys",
      component: Toys
    },
    {
      path:"/clothes/",
      name:"clothes",
      component: Clothes
    },
    {
      path:"/accessories/",
      name:"accessories",
      component: Accessories
    },
    {
      path:"/essentials/",
      name:"essentials",
      component: Essentials
    },
    {
      path:"/gifts/",
      name:"gifts",
      component: Gifts
    },
    {
      path:"/furniture/",
      name:"furniture",
      component: Furniture
    },
  ];
  
export default Routes;