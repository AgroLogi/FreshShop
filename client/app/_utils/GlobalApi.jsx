const {default: axios} = require("axios")

const axiosClient=axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
})
4
const getCategory=()=>axiosClient.get('/categories?populate=*')

const getCategoryList=()=>axiosClient.get('/categories?populate=*').then(res=>{
    return res.data.data;
    
})

const getSliders=()=>axiosClient.get('/sliders?populate=*').then(res=>{
    return res.data.data;
})

const getAllProducts=()=>axiosClient.get('/products?populate=*').then(res=>{
    return res.data.data;
})
const deliveryBanner=()=>axiosClient.get('/banners?populate=*').then(res=>{
    return res.data.data;
})

const getProductsByCategory=(category)=>axiosClient.get('/products?filters[categories][name][$in]='+category+'&populate=*').then(res=>{
    return res.data.data;
})
const registerUser=(username, email, password)=>axiosClient.post('auth/local/register',{
    username:username,
    email:email,
    password:password
})

const Login=(email, password)=>axiosClient.post('/auth/local',{
    identifier:email,
    password:password
})


const addToCart=(data,jwt)=>axiosClient.post('/user-carts',data,{
    headers:{
        Authorization:'Bearer '+jwt
    }
})

const getTotalCartItems=(Uid, jwt)=>axiosClient.get('/user-carts?filters[Uid][$eq]='+Uid+'&[populate][products][populate][images][populate][0]=url',{
    headers:{
        Authorization:'Bearer '+jwt
    }
}).then(res=>{
    const data=res.data.data;
    const cartItemsList=data.map((item, index)=>(
        {
            name:item.attributes.products?.data[0].attributes.name,
            quantity:item.attributes.quantity,
            amount:item.attributes.amount,
            image:item.attributes.products?.data[0].attributes.images?.data[0].attributes.url,
            actualPrice:item.attributes.products?.data[0].attributes.SellingPrice,
            id:item.id,
            product:item.attributes.products?.data[0].id

        }
    ))
    return cartItemsList;
})
   

const deleteCartItem=(id, jwt)=>axiosClient.delete('/user-carts/'+id, 
{
    headers:{
        Authorization:'Bearer '+jwt
}

})


const createOrder=(data,jwt)=>axiosClient.post("/create-orders",data,{
    headers:{
        Authorization:'Bearer '+jwt
    }
})

 


export default {
    getCategory,
    getCategoryList,
    getSliders,
    getAllProducts,
    deliveryBanner,
    getProductsByCategory,
    registerUser,
    Login,
    addToCart,
    getTotalCartItems,
    deleteCartItem,
    createOrder
}