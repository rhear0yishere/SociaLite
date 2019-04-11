var React = require('react');
var ReactNative = require('react-native');
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput,Modal,TouchableHighlight} from 'react-native';
import ChannelModel from './channelModel'
import EventModel from './eventModel'
import { ListItem, SearchBar } from 'react-native-elements';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions  } from 'react-navigation';
import SettingsScreen from './SettingsScreen'
import { NativeRouter, Route, Link } from "react-router-native";



class LinkScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  state ={
    name :'',
    channels: [],
    events:[],
    allChannels: [],
    clickedChannel: '',
    email: this.props.email,
    modalVisible: false,

  }


  componentDidMount(){
   this.fetchData();
  }

 
   fetchData(){
     ChannelModel.all().then( (res) => {
       this.setState ({
         allChannels: res.data.channels
       })
 
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

setModalVisible(visible) {
  this.setState({modalVisible: visible});
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


  render() {

   
  
    // if(this.props.displayForm){

      return (

        
  <View style={styles.container}>


<View style={{marginTop: 20}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 50}}>
            <View>
            <FlatList
          data={this.state.allChannels}

          renderItem={({ item }) => (
        
          
                <ListItem
              // title={`${item._id}`}
              title={`${item.name}`}

              onPress={() => 
                this.setState({
                  channelId : item._id, 
              })}
            /> 
            
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />    

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Button 
         onPress={() => {
          this.setModalVisible(true);
        }}
        title= "View All Channels"/>

      </View>

      
        <Text>{this.state.channelId} CURRENT CHANNEL</Text>
        <SettingsScreen channelId= {this.state.channelId}/>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>


          </View>
        </ScrollView>
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
            </ScrollView>

      </View>
      );
      } 
   
    } 

export default LinkScreen;


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


