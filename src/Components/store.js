import create from 'zustand'

 const [useStore] = create(set => ({
    products:[],
    specialOffer:'',
    bestSeller:[],
    popularProducts:[],
    productId:'',
    toys:[],
    clothes:[],
    accessories:[],
    essentials:[],
    gifts:[],
    furniture:[],
    recentBlogs:[],
    userDetails:[],
    modal:{
    signin:false,
    signup:false
    },
    relatedPost:{
        prev:0,
        next:1
    },
    updateUserDetails:(prop)=>{console.log(prop)
        set(state => ({userDetails:prop}))},
    updateModal:(prop)=>{console.log(prop)
        set(state =>{state.modal.signin =prop.signin,state.modal.signup =prop.signup})},
    updateRelatedPost:(prop)=>{console.log(prop)
        set(state =>{state.relatedPost.prev =prop.prev,state.relatedPost.next =prop.next})},
    updateLogin:(prop)=>{console.log(prop.data)
        set(state => ({login:prop.data}))},
    updateId:(prop)=>{console.log(prop.data)
        set(state => ({productId:prop.data}))},
    updateRecentBlog:(prop)=>{
        set(state => ({recentBlogs:prop.filter(item=>item)}))},
    updateProduct:(prop)=>{
        set(state => ({products:prop.filter(item=>item)}))},
    updateSpecial:(prop)=>{
        set(state => ({specialOffer:prop.filter(item=>item)}))},
    updateBest:(prop)=>{
        set(state => ({bestSeller:prop.filter(item=>item)}))},
    updateToys:(prop) =>
        set(state => ({toys:prop.filter(item=>item)})),
    updateClothes:(prop) =>
        set(state => ({clothes:prop.filter(item=>item)})),
    updateAccessories:(prop) =>
        set(state => ({accessories:prop.filter(item=>item)})),
    updateEssentials:(prop) =>
        set(state => ({essentials:prop.filter(item=>item)})),
    updateGifts:(prop) =>
        set(state => ({gifts:prop.filter(item=>item)})),
    updateFurniture:(prop) =>
        set(state => ({furniture:prop.filter(item=>item)})),
    updatePopular:(prop) =>
        set(state => ({popularProducts:prop.filter(item=>item)})),
    }))

 export {useStore}; 