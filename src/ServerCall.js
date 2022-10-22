import axios from 'axios'
//const baseUrl='http://localhost:2020/'
const baseUrl="https://stepupserver.herokuapp.com/"
class ServerCall{

   static sendGetReq(url){
       return axios.get(baseUrl+url)
    }

   static  sendPostReq(url,data){
        return axios.post(baseUrl+url,data)
    }

   static sendPutReq(url,data){
       return axios.put(baseUrl+url,data)
    }
   static sendDelReq(url,data){
        return axios.delete(baseUrl+url,data)
    }
}

export default ServerCall