import axios from 'axios';

// const endPoint = 'http://localhost:3001/api/channel'
const endPoint = 'https://socialite-backend.herokuapp.com/api/channel'

class CommentModel {
    static all(){
        let request = axios.get(endPoint);
        return request;
    }

    static create(NewComment, channel_id, event_id, post_id) {
        // let auth = {'headers': {'Authorization': `Bearer ${localStorage.token}`}};
        // let request = axios.post(`http://localhost:3001/api/channel/${ channel_id }/events/${ event_id }/posts/${ post_id }/comments`, NewComment);
        let request = axios.post(`https://socialite-backend.herokuapp.com/api/channel/${ channel_id }/events/${ event_id }/posts/${ post_id }/comments`, NewComment);

        return request;
    }




}

export default CommentModel;