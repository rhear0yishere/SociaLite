import axios from 'axios';

const endPoint = 'http://localhost:3001/api/channel'
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

}

export default ChannelModel;