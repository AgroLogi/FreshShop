const {default: axios} = require("axios")

const axiosClient=axios.create({
    baseURL:"http://192.168.1.5:1337/api",
})

const getCategory=()=>axiosClient.get('/categories?populate=*')

const getCategoryList=()=>axiosClient.get('/categories?populate=*').then(res=>{
    return res.data.data;
})

const getSliders=()=>axiosClient.get('/sliders?populate=*').then(res=>{
    return res.data.data;
})
export default {
    getCategory,
    getCategoryList,
    getSliders
}