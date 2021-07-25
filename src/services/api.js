import axios from "axios";

async function getServers() {
    return axios.get("https://devtool-challenge.herokuapp.com/api/get-servers").then((res) => {
   console.log("RES: " ,res)
    return res.data;
  });
}

 async function getMetrics() {
   return axios.get("https://devtool-challenge.herokuapp.com/api/metrics").then((res) => {
 
     return res.data;
   });
 }

export { getServers , getMetrics};
