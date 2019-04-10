import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput} from 'react-native';
import axios from 'axios';



class Yelp extends Component {

  componentWillReceiveProps() {
    const config = {
        headers: {'Authorization': 'Bearer iHpi2TtumFKHMqHI10EIrlBQQMOlx13iiicob9kJ7kGBle8lYdHXeuNHbsM1O2qGw-Ow1odGrThCgktT94QgtewS07vy-a-ia-hHT55Nhc5xYilvPjy1zN_IXoetXHYx'},
        params: {
          term: this.props.term,
          location: this.props.location
        }
      };
    axios.get('https://api.yelp.com/v3/businesses/search', config)
    .then(response => console.log(response.data.businesses));
    console.log(this.props.term, "???????")
    }
  
  render(){
    return (
      <View>
        <Text> My first yelp authentication request </Text>
      </View>
    );
  }
}

export default Yelp;