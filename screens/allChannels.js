
          {/* <View>

                <FlatList
                 data={this.props.allchannels.comments}
                 renderItem={({ item }) => (
                  <View>
                  <ListItem
                    title={`${item.text}`}
                 
                  />
                  )}
                />
                <View> */}


import React from 'react';
import { ExpoLinksView } from '@expo/samples';
import { ListItem, SearchBar } from 'react-native-elements';
import { ScrollView, StyleSheet, Text,Button,View,FlatList,TextInput,Modal,TouchableHighlight, Image,SectionList} from 'react-native';
import CommentModel from './commentModel.js'


class AllChannels extends React.Component {

state = {
    postId: '',
    modalVisible: false,
}


setModalVisible(visible) {
  this.setState({modalVisible: visible});
}

createComment = (name) => {
  let newComment = {
    text:this.state.text,  
  }
  let channel_id = this.props.hi
  let event_id = this.props.event_id
  let post_id = this.state.postId
  CommentModel.create(newComment, channel_id,event_id,post_id ).then((res) => {
    let comments = this.state.comments;
    let newComments = comments.push(res.data);
    this.setState({ newComments})
  })
}



  render() {

    console.log(this.props.allchannels, "PROPS")
   
  
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
                  <Text>WILL IT OPEN?</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Done</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>View All Comments</Text>
        </TouchableHighlight>
      </View>
      
      <View>
            </View>


  
          
              <FlatList
              data={this.props.allchannels}
              renderItem={({ item }) => (
              <View>
                <ListItem
                  title={`${item.text}`}
                />
                   <Image
                    style={{width: 200, height: 200, marginLeft:50}}
                    source={{uri:`${item.image}`}}
                 /> 
                <Text>COMMENTS</Text>
                <SectionList 
                style={{marginLeft:40}}
                  renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: 'bold' }}>{title}</Text>} 
                  sections={[ 
                    { data: item.comments, renderItem: ({ item, index, section: { title, data } }) => <Text>{item.text}</Text> }, 
                    ]} 
                  keyExtractor={(item, index) => item.name + index} 
                />
                  
                  <TextInput 
                    placeholder="Comment"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({text})}
                    />
                   <Button
                  title="comment"
                  onPress={() => 
                    this.setState({
                      postId: item._id
                    }, ()=>{
                      this.createComment()
                    })
                  }
                />
              </View>
              )}
                /> 
              </ScrollView>
                  );
                }
              }

export default AllChannels;


