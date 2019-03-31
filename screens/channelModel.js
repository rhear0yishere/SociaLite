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

    // static update (updatePost) {
    //     let auth = {'headers': {'Authorization': `Bearer ${localStorage.token}`}};
    //     let tipData = updatePost;
    //     let request = axios.put(`${ endPoint }/${JSON.stringify(tipData)}`,{},auth);
    //     return request;
    // }

    // static delete (tip) {
    //     let auth = {'headers': {'Authorization': `Bearer ${localStorage.token}`}};

    //     let request = axios.delete(`${ endPoint }/${tip._id }`,auth);
    //     return request; 
    // }

}

export default ChannelModel;