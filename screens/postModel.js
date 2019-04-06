import axios from 'axios';

const endPoint = 'http://localhost:3001/api/channel/5ca1364c1694f351481904b2/events'
class PostModel {

    static create(NewPost, channel_id, event_id) {
        let request = axios.post(`http://localhost:3001/api/channel/${ channel_id }/events/${ event_id }/posts`, NewPost);
        return request;
    }
}

export default PostModel;