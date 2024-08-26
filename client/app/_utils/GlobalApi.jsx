const {default: axios} = require("axios")

const axiosClient=axios.create({
    baseURL:"http://192.168.1.4:1337/api",
})
4
const getCategory=()=>axiosClient.get('/categories?populate=*')

const getCategoryList=()=>axiosClient.get('/categories?populate=*').then(res=>{
    return res.data.data;
    console.log(res.data.data);
})

const getSliders=()=>axiosClient.get('/sliders?populate=*').then(res=>{
    return res.data.data;
})

const getAllProducts=()=>axiosClient.get('/products?populate=*').then(res=>{
    return res.data.data;
})
export default {
    getCategory,
    getCategoryList,
    getSliders,
    getAllProducts
}