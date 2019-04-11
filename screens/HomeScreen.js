
var React = require('react');
var ReactNative = require('react-native');
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
// import { Button, ThemeProvider } from 'react-native-elements';

import Yelp from './googlePlaces'

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

STORAGE_KEY = 'id_token';


import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  state = {
    email: '',
    password: '',
    LoggedIn: '',
    user: null,
    userId: '',
 }

 _userLogin= async () => { 

  var value = "yes";
  const {navigate} = this.props.navigation;
  if (value) { // if validation fails, value will be null
    // fetch("http://localhost:3001/user/login", {
      fetch("https://socialite-backend.herokuapp.com/user/login", {

      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email, 
        password: this.state.password, 
        
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        userId: responseData.user._id
      })

      AlertIOS.alert(
        this.state.email
      ),
      this._onValueChange(STORAGE_KEY, responseData.signedJwt)
    }) .then (()=>{
      this.setState({
        LoggedIn: true,
        user: this.state.email
      })
      this.props.navigation.navigate('Links', {
        itemId: 86,
        LoggedIn: this.state.LoggedIn,
        nav:this.props.navigation 
      });
    })
    .done();
  } 
}
 _userSignup = async() => {
  var value= "yes";
  if (value) { // if validation fails, value will be null

    // fetch('http://localhost:3001/user/signup', {
      fetch('https://socialite-backend.herokuapp.com/user/signup', {

      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email, 
        password: this.state.password, 
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this._onValueChange(STORAGE_KEY, responseData.signedJwt),
      AlertIOS.alert(
        "Signup Success!",
        "Click the button to get a Chuck Norris quote!", STORAGE_KEY
      )
    })
    .done();
  }}

  render() {
    const {navigate} = this.props.navigation;

     return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this._userLogin('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

  

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this._userSignup('register')}>
            <Text>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this._userLogout('Logout')}>
        <Text>Logout</Text>
      </TouchableHighlight>

      <Text>Welcome {this.state.user}</Text>
      <Text>ID {this.state.userId}</Text>


      <Button
          title="PLACEHOLDER BUTTON Channels"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Links', {
              itemId: 86,
              LoggedIn: this.state.LoggedIn
            });
          }}
        />

      </View>


        </ScrollView>

      </View>

    );

  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async _userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert("Logout Success!")
      this.setState({
        LoggedIn: false,
        user: null,
        userId:''
  
      })
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

 alert(){
  AlertIOS.alert(
    "Login Success!",
    "Click the button to get a Chuck Norris quote!"
  )
 }

}

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

AppRegistry.registerComponent('SociaLite', () => SociaLite);
