import axios from "axios";

export const getProductApi=async()=>{
    const result=await axios.get('/api/product')
    return result.data.data
}

