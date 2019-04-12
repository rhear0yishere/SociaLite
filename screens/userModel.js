import axios from 'axios';
// https://socialite-backend.herokuapp.com
const endPoint = 'http://localhost:3001/api/channel/5ca1364c1694f351481904b2/events'
class UserModel {

    static all(){
        // let request = axios.get(`https://socialite-backend.herokuapp.com/user`);
        let request = axios.get(`http://localhost:3001/user`);

        return request;
        }

    static create(addChannel, user_id) {
        let request = axios.post(`http://localhost:3001/user/login/${ user_id }`, addChannel);
        // let request = axios.post(`https://socialite-backend.herokuapp.com/user/login/${ user_id }`, addChannel);

        return request;
    }
}

export default UserModel;


// import axios from 'axios';
// // https://socialite-backend.herokuapp.com
// const endPoint = 'http://localhost:3001/api/channel/5ca1364c1694f351481904b2/events'
// class UserModel {

//     static all(){
//         let request = axios.get(`https://socialite-backend.herokuapp.com/user`);
//         // let request = axios.get(`http://localhost:3001/user`);

//         return request;
//         }

//     static create(addChannel, user_id) {
//         // let request = axios.post(`http://localhost:3001/user/login/${ user_id }`, addChannel);
//         let request = axios.post(`https://socialite-backend.herokuapp.com/user/login/${ user_id }`, addChannel);

//         return request;
//     }
// }

// export default UserModel;