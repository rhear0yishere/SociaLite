// import axios from 'axios';
// // https://socialite-backend.herokuapp.com
// // const endPoint = 'http://localhost:3001/api/channel/5ca1364c1694f351481904b2/events'
// // const endPoint = 'https://socialite-backend.herokuapp.com/api/channel/5ca1364c1694f351481904b2/events'

// class EventModel {
//     // static all(){
//     //     let request = axios.get(endPoint);
//     //     return request;
//     // }
//     static create(NewEvent, channel_id) {
//         let request = axios.post(`http://localhost:3001/api/channel/${ channel_id }/events`, NewEvent);
//         // let request = axios.post(`https://socialite-backend.herokuapp.com/api/channel/${ channel_id }/events`, NewEvent);

//         return request;
//     }

//     static edit(title, channel_id, event_id) {
//         // let request = axios.post(`https://socialite-backend.herokuapp.com/api/channel/${ channel_id }/events/${ event_id }/edit`, title);

//         let request = axios.post(`http://localhost:3001/api/channel/${ channel_id }/events/${ event_id }/edit`, title);
//         return request;
//     }
// }

// export default EventModel;



import axios from 'axios';
// https://socialite-backend.herokuapp.com
// const endPoint = 'http://localhost:3001/api/channel/5ca1364c1694f351481904b2/events'
// const endPoint = 'https://socialite-backend.herokuapp.com/api/channel/5ca1364c1694f351481904b2/events'

class EventModel {
    // static all(){
    //     let request = axios.get(endPoint);
    //     return request;
    // }
    static create(NewEvent, channel_id) {
        // let request = axios.post(`http://localhost:3001/api/channel/${ channel_id }/events`, NewEvent);
        let request = axios.post(`https://socialite-backend.herokuapp.com/api/channel/${ channel_id }/events`, NewEvent);

        return request;
    }

    static edit(title, channel_id, event_id) {
        let request = axios.post(`https://socialite-backend.herokuapp.com/api/channel/${ channel_id }/events/${ event_id }/edit`, title);

        // let request = axios.post(`http://localhost:3001/api/channel/${ channel_id }/events/${ event_id }/edit`, title);
        return request;
    }
}

export default EventModel;