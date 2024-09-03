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
export default {
    getCategory,
    getCategoryList,
    getSliders,
    getAllProducts,
    deliveryBanner,
    getProductsByCategory
}