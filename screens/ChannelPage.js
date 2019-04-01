var React = require('react');
var ReactNative = require('react-native');
import ChannelModel from './channelModel'


var {
  AppRegistry,
  AsyncStorage,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  AlertIOS,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,

} = ReactNative;

class CreateChannelForm extends React.Component {

  state ={
    channels: this.props.channels,
    clicked: this.props.matchClick
  }


  componentWillReceiveProps(){
      this.setState({
        channels: this.props.channels,
        clicked: this.props.matchClick
      })
  }
 


  render() {

    // if(this.state.channels[5]._id == this.state.clicked){
    //     return (
    //         <View style={styles.container}>
    //         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    //             <Text>A Match!</Text>
    //         </ScrollView>
    
    //       </View>
    //       );

    // } else{
        return(
            <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text>NOT A MATCH!</Text>
            </ScrollView>
    
          </View>

        )


    }

    
    } 
  // }


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


