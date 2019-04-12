var React = require('react');
var ReactNative = require('react-native');
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput,Modal,TouchableHighlight} from 'react-native';
import ChannelModel from './channelModel'
import EventModel from './eventModel'
import { ListItem, SearchBar } from 'react-native-elements';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions  } from 'react-navigation';
import SettingsScreen from './SettingsScreen'
import { NativeRouter, Route, Link } from "react-router-native";
import UserModel from './userModel'


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
    modalVisible2: false,
    modalVisible3: false


  }


  componentDidMount(){
   this.fetchData();
   this.fetchUserData();
  }

 
   fetchData(){
     ChannelModel.all().then( (res) => {
       this.setState ({
         allChannels: res.data.channels
       })
 
     })
 
   }


   fetchUserData(){
    const { navigation } = this.props;
    const userId = navigation.getParam('userId', 'NO-ID');

    UserModel.all().then( (res) => {
      for (i in res.data){
        if (res.data[i]._id == {userId}.userId){
          this.setState ({
            userData: res.data[i].userChannels
          },()=>{
            console.log(this.state.userData)
          })
        }
      }

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
  this.fetchData();

}

addUserChannel = ()=>{
  const { navigation } = this.props;
  const userId = navigation.getParam('userId', 'NO-ID');
 
  let addingChannel = {
    addChannel: this.state.addChannel
  }
  let user_id = {userId}.userId
  UserModel.create(addingChannel,user_id).then((res)=>{
    let userChannels = this.state.userChannels;
    let newUserChannels= userChannels.push(res.data);
    this.setState({newUserChannels})
  })
}

setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

setModalVisible2(visible) {
  this.setState({modalVisible2: visible});
}

setModalVisible3(visible) {
  this.setState({modalVisible3: visible});
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
          visible={this.state.modalVisible3}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 50}}>
            <View>
            <FlatList
          data={this.state.userData}

          renderItem={({ item }) => (
        
          <View>
            
            <ListItem
              
              title={item.addChannel}
              onPress={() => 
                this.setState({
                  channelId : item.addChannel
              })}
            /> 

            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />    

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible3(!this.state.modalVisible3);
                }}>
                <Text>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>


        {/* <TouchableHighlight
                onPress={() => {
                  this.setModalVisible3(!this.state.modalVisible3);
                }}>
                <Text>View Your Channels</Text>
        </TouchableHighlight> */}



      

      </View>









    
    
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
        
          <View>
                <ListItem
              // title={`${item._id}`}
              title={`${item.name}`}

              onPress={() => 
                this.setState({
                  channelId : item._id, 
                  channelName: item.name
              },()=>{
                this.setModalVisible(!this.state.modalVisible)
              })}
            /> 

            {/* <Button
            title= "ADD CHANNEL TO PROFILE"
            onPress={() => 
              this.addUserChannel()
             }

             onPress={() => 
              this.setState({
                addChannel: item._id
              }, ()=>{
                  this.addUserChannel()
              })
             }
            /> */}
            </View>
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />    

            </View>
          </View>
        </Modal>
        <Button 
         onPress={() => {
          this.setModalVisible2(true);
        }}
        title= "Create New Channel"/>
        <Button 
         onPress={() => {
          this.setModalVisible(true);
        }}
        title= "Select A Channel"/>

      </View>

 

      
        <Text style={{fontSize: 60}}>{this.state.channelName}</Text>
        <SettingsScreen channelId= {this.state.channelId}/>

        <View style={{marginTop: 20}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 50}}>
            <View>
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

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible2(!this.state.modalVisible2);
                }}>
                <Text>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>



      </View>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>


          </View>
        </ScrollView>
        <ScrollView>
  
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


