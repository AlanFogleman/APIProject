import React from 'react';
import { AppRegistry, FlatList, ActivityIndicator, Text, View, Image} from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://www.scorebat.com/video-api/v1/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 200}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20, backgroundColor: 'forestgreen'}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection:'row', justifyContent: 'space-between', 
              alignItems:'center', padding:10, backgroundColor: 'lawngreen', margin: 10}}>
              <Text>{item.title}</Text>
              <Image source={{uri: item.thumbnail}} style={{width: 100, height: 70}}/>
            </View>
            )}
            
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
