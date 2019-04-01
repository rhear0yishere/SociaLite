import axios from 'axios';

const endPoint = 'http://localhost:3001/events'
class EventModel {
    static all(){
        let request = axios.get(endPoint);
        return request;
    }

    static create(NewEvent) {
        let request = axios.post(endPoint, NewEvent);
        return request;
    }
}

export default EventModel;