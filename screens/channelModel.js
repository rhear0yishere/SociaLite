import axios from 'axios';

// const endPoint = 'http://localhost:3001/api/channel'
const endPoint = 'https://socialite-backend.herokuapp.com/api/channel'

class ChannelModel {
    static all(){
        let request = axios.get(endPoint);
        return request;
    }

    static create(NewPost) {
        // let auth = {'headers': {'Authorization': `Bearer ${localStorage.token}`}};
        let request = axios.post(endPoint, NewPost);
        return request;
    }

    static delete(channel_id) {
        // let auth = {'headers': {'Authorization': `Bearer ${localStorage.token}`}};
        // let request = axios.delete(`http://localhost:3001/api/channel/${ channel_id }`);
        let request = axios.delete(`https://socialite-backend.herokuapp.com/api/channel/${ channel_id }`);

        return request;
    }



}

export default ChannelModel;