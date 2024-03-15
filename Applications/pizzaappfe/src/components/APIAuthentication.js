import axios from 'axios';

class APIAuthentication {

    signin = (username, password) => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }

        return axios.post(`http://localhost:8080/authenticate`, { username, password }, { headers: headers })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log(JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch(error => {
                console.log("Error in processing request" + error);
                throw error;
            })
    }

    register = (username, email, phone, password) => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
        return axios.post(`http://localhost:8080/register`, {
            username,
            email,
            phone,
            password
        }, { headers: headers });
    }

    signOut() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new APIAuthentication();
