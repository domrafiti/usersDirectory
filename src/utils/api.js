import axios from 'axios';
const searchURL = "https://randomuser.me/api/?results=25&nat=us"

//getting employee data
const API = {
    getEmpData: function () {
        return axios.get(searchURL);
    }
};

export default API