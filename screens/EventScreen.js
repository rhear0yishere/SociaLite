import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import ChannelModel from './channelModel'
import { ListItem, SearchBar } from 'react-native-elements';
import PostModel from './postModel'
import { ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  TouchableOpacity,
 ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput,Modal,TouchableHighlight} from 'react-native';
import EventModel from './eventModel'
import { Constants, ImagePicker, Permissions } from 'expo';

import AllChannels from './allChannels'

class EventScreen extends React.Component {
  static navigationOptions = {
    title: 'Events',
  };

  state = {
    allChannels: [],
    clickedEvent: '',
    modalVisible: false,
    modalVisible2: false,
    channelId: this.props.channelId,
    eventId: this.props.eventId,
    image: null,
    uploading: false,
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Text>HERE?</Text>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text>
      </View>
    );
  };


  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };
  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();

        this.setState({
          image: uploadResult.location
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };

  

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setModal2Visible(visible) {
    this.setState({modalVisible2: visible});
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

  componentWillMount(){
 
    this.fetchData();
  }

  componentWillReceiveProps(){

    this.fetchData();
  
  }


  fetchData(){
    ChannelModel.all().then( (res) => {
      for (i in res.data.channels){
        for (z in res.data.channels[i].events){
          console.log(res.data.channels[i].events[z]._id, "EVENTS")
          if ( res.data.channels[i].events[z]._id == this.props.eventId){
            this.setState ({
              allChannels: res.data.channels[i].events[z]
            })
          }
        }

      }
    
  })
}

editEvent = () => {
  let channel_id = this.props.channelId;
  let event_id = this.props.eventId
  let title = {
    title: this.state.title,
    location: this.state.location
  }

  EventModel.edit (title, channel_id, event_id)
}


createPost = (name) => {
  let newPost = {
    text:this.state.text,  
    image:this.state.image
  }
  let channel_id = this.props.channelId;
  let event_id = this.props.eventId
  PostModel.create(newPost, channel_id,event_id ).then((res) => {
    let posts = this.state.posts;
    let newPosts = posts.push(res.data);
    this.setState({ newPosts})
  })
  this.fetchData()
}


createAndHide = ()=>{
   this.createPost()
    this.setModal2Visible(!this.state.modalVisible2)
}

  render() {
    // this.fetchData()

    let {
      image
    } = this.state;

   
  
    return (

<ScrollView>


        <View style={{marginTop: 50}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 50}}>
            <View>
                  <TextInput 
                    placeholder="NEW EVENT TITLE"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(title) => this.setState({title})}
                    />

                <Button
                  onPress={
                    () => this.editEvent('editEvent')}
                  title="Submit Event Edit"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
                >

                <Text>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Edit Event</Text>
        </TouchableHighlight>
      </View>


      <View style={{marginTop: 20}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

<View style={styles.container}>
        <StatusBar barStyle="default" />
        <TextInput 
              placeholder="Post Text"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({text})}
              />
        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo" />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
      </View>
          <View style={{marginTop: 50}}>


            <View>
      
        <Button
            onPress={() => this.createAndHide()}

            title="Submit Post"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

            </View>
          </View>
        </Modal>
          
        <TouchableHighlight
          onPress={() => {
            this.setModal2Visible(true);
          }}>
          <Text>Create Post</Text>
        </TouchableHighlight>
      </View>

            <AllChannels
              allchannels= {this.state.allChannels.posts}
             hi= {this.state.channelId}
              event_id= {this.state.eventId}/>
              </ScrollView>
 
    )

            }
             }

export default EventScreen;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});

async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}