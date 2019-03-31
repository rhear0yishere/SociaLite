
var React = require('react');
var ReactNative = require('react-native');

var t = require('tcomb-form-native');

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
var Form = t.form.Form;
var Person = t.struct({
  username: t.String,
  password: t.String
});
const options = {};

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: ''
 }
 onClickListener = (viewId) => {
  var value= "yes";
  if (value) { // if validation fails, value will be null
    fetch("http://localhost:3001/users", {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.email, 
        password: this.state.password, 
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this._onValueChange(STORAGE_KEY, responseData.id_token),
      AlertIOS.alert(
        "Signup Success!",
        "Click the button to get a Chuck Norris quote!"
      )
    })
    .done();
  }}
  

  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}> HELLLLLO </Text>
            <Text> {this.state.email} </Text>
            <Text> {this.state.password} </Text>

          </View>


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

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text>Register</Text>
        </TouchableHighlight>
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

  async _getProtectedQuote() {
    var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    fetch("http://localhost:3001/api/protected/random-quote", {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + DEMO_TOKEN
      }
    })
    .then((response) => response.text())
    .then((quote) => { 
      AlertIOS.alert(
        "Chuck Norris Quote:", quote)
    })
    .done();
  }

  async _userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert("Logout Success!")
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _userSignup() {
    var value= "yes";
    if (value) { // if validation fails, value will be null
      fetch("http://localhost:3001/users", {
        method: "POST", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.email, 
          password: this.state.password, 
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        this._onValueChange(STORAGE_KEY, responseData.id_token),
        AlertIOS.alert(
          "Signup Success!",
          "Click the button to get a Chuck Norris quote!"
        )
      })
      .done();
    }
  }

 alert(){
  AlertIOS.alert(
    "Login Success!",
    "Click the button to get a Chuck Norris quote!"
  )
 }

  _userLogin() { 
    var value = "this.refs.form.getValue()";
    if (value) { // if validation fails, value will be null
      fetch("http://localhost:3001/sessions/create", {
        method: "POST", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: value.email, 
          password: value.password, 
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        AlertIOS.alert(
          "Login Success!",
          "Click the button to get a Chuck Norris quote!"
        ),
        this._onValueChange(STORAGE_KEY, responseData.id_token)
      })
      .done();
    } 
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