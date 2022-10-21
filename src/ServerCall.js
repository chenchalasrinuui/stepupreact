import axios from 'axios'
const baseUrl='http://localhost:2020/'

class ServerCall{

   static sendGetReq(url){
       return axios.get(baseUrl+url)
    }

   static  sendPostReq(url,data){
        return axios.post(baseUrl+url,data)
    }

   static sendPutReq(){
        
    }
   static sendDelReq(){
        
    }
}

export default ServerCall