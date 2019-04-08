var React = require('react');
var ReactNative = require('react-native');
import ChannelModel from './channelModel'
import EventModel from './eventModel'
import { ListItem, SearchBar } from 'react-native-elements';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';


var {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,

} = ReactNative;

class CreateChannelForm extends React.Component {
  static navigationOptions = {
    title: 'Channels',
  };
  state ={
    name :'',
    channels: [],
    events:[],
    allChannels: [],
    clickedChannel: null ,
    email: this.props.email,
    channelId: '',
  
   
  }


  componentDidMount(){
   this.fetchData();
 
  }
 
 
   fetchData(){
     ChannelModel.all().then( (res) => {
       this.setState ({
         allChannels: res.data.channels
       })

       console.log(this.state.allChannels[63], "whole channel object")
       console.log(this.state.allChannels[63].events, "events array")
       console.log(this.state.allChannels[63].events[0], "gets first event of channel")
       console.log(this.state.allChannels[63].events[0].posts, "grabs all posts ")
       console.log(this.state.allChannels[63].events[0].posts[0], "grabs post info")
       console.log(this.state.allChannels[63].events[0].posts[0].comments, "gives back all comments")
       console.log(this.state.allChannels[63].events[0].posts[0].comments[0], "Grabs comment info")






      //  console.log(this.state.allChannels[4]._id, "channel 4 id") 
 
     })
 
   }
createChannel = (name) => {
  let newPost = {
    name:this.state.name,  
    }

  ChannelModel.create(newPost).then((res) => {
    let channels = this.state.channels;
    let newChannels = channels.push(res.data);
    this.setState({ newChannels })
  })
}

createEvent = (name) => {
  let newEvent = {
    title:this.state.title,  
    location:this.state.location
  }
  let channel_id = this.state.channelId;
  EventModel.create(newEvent, channel_id ).then((res) => {
    let events = this.state.events;
    let newEvents = events.push(res.data);
    this.setState({ newEvents })
  })
}

renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
      }}
    />
  );
};



// createPost = (name) => {
//   let newPost = {
//    text:this.state.title,  
//   }
//   let channel_id = this.state.channelId;
//   EventModel.create(newEvent, channel_id ).then((res) => {
//     let events = this.state.events;
//     let newEvents = events.push(res.data);
//     this.setState({ newEvents })
//   })
// }

  render() {

   
  
    if(this.props.displayForm){

      return (
        <View style={styles.container}>

<Text>{this.state.channelId} CURRENT CHANNEL</Text>

<FlatList
          data={this.state.allChannels}
          renderItem={({ item }) => (
            <ListItem
              // title={`${item._id}`}
              title={`${item.name}`}

              onPress={() => 

                this.setState({
                  channelId : item._id
              }, () => {
                this.props.nav.navigate('Settings', {
                  itemId: 86,
                  LoggedIn: this.state.LoggedIn,
                  channelId: this.state.channelId
              });
                })}

            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />    

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>


          </View>
        </ScrollView>

      </View>
      );
      } else{
          return(
            <ScrollView>
              <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Channel Name"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(name) => this.setState({name})}
                />
          </View>

          <Button
              onPress={() => this.createChannel('submit')}
              title="Submit Channel"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />


          <TextInput style={styles.inputs}
              placeholder="Event Title"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(title) => this.setState({title})}
              />
          <TextInput style={styles.inputs}
              placeholder="location"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(location) => this.setState({location})}
              />
        <Button
            onPress={() => this.createEvent('submitEvent')}
            title="Submit Event"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
            </ScrollView>
            
  
          )
      }
    } 
  }


export default CreateChannelForm;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    contentContainer: {
      paddingTop: 30,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
  
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },
    inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  
  
  });


