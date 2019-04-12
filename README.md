# SociaLite

### Making plans with your friends can be rough. I made this app to make that process a little bit easier. I also made this to practice using React Native which I have never used before.

![Screenshot ](../master/assets/images/IMAGE.png)


## View App

https://expo.io/@rhear0yishere/SociaLite


# Tech Stack (MERN):
- Mongo DB
- Express JS
- React Native
- Node JS

# React Native 

React Native lets you build mobile apps using only JavaScript. It uses the same design as React, letting you compose a rich mobile UI using declarative components.
- https://facebook.github.io/react-native/

# Expo 

The Expo SDK is a set of libraries written natively for each platform which provides access to the device's system functionality (things like the camera, push notifications, contacts, local storage, and other hardware and operating system APIs) from JavaScript. The SDK is designed to smooth out differences in platforms as much as possible, which makes your project very portable because it can run in any native environment containing the Expo SDK.
Expo also provides UI components to handle a variety of use-cases that almost all apps will cover but are not built into React Native core, e.g. icons, blur views, and more.
- https://docs.expo.io/versions/latest/






![Screenshot ](../master/assets/images/screenshot.png)



![ ](../master/assets/images/GIF.gif)




## What I'm Proud Of


### Front End 

#### Comments in SectionList nested in Flatlist
- Allows for threaded comments

```    <SectionList 
                style={{marginLeft:40}}
                  renderSectionHeader={({ section: { title } }) => <Text style={{ fontWeight: 'bold' }}>{title}</Text>} 
                  sections={[ 
                    { data: item.comments, renderItem: ({ item, index, section: { title, data } }) => <Text>{item.text}</Text> }, 
                    ]} 
                  // keyExtractor={(item, index) => item.name + index} 
                /> 
```

### Backend

#### Getting to embedded data 
- accessing embedded data 
```
  makeComment: (req, res) =>{
        let newComment= new db.Comment({
          text: req.body.text,
        })
        let channelId = req.params.channel_id;
          db.Channel.findById(channelId, function(err, channel) {
            if (err) res.send(err);
              else {
                for (i in channel.events ){
                    for (z in channel.events[i].posts){
                        if(channel.events[i].posts[z]._id==req.params.post_id){
                            let postArray = channel.events[i].posts[z].comments
                             postArray.push(newComment)
                            channel.save()
                            res.json(newComment)
                        }
                    }
                }
                  }
                }) 
}
```
                


# Installation 

- npm install expo-cli --global

- cd <PROJECT NAME>
 
- expo start

## Wireframes and User Stories 
https://trello.com/b/CyZQ39Sv/socialite


## Future 
- Make actual user specific content 
- Style 
- Full Crud on Everything 
- Secured Routes 
