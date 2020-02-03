import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList , Image, TouchableOpacity} from 'react-native';
import Circle from './circle';
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};
const numColumns = 5;
const data = [
  {
    "id": '1',
    "word": "P"
  },
  {
    "id": '2',
    "word": "L"
  },
  {
    "id": '3',
    "word": "P"
  },
  {
    "id": '4',
    "word": "T"
  },
  {
    "id": '5',
    "word": "S"
  },
  {
    "id": '6',
    "word": "A"
  },
  {
    "id": '7',
    "word": "C"
  },
  {
    "id": '8',
    "word": "E"
  },
  {
    "id": '9',
    "word": "H"
  },
  {
    "id": '10',
    "word": "D"
  }
]
const word = ["APPLE","HEAD","PLACE","SPACE","HELP"];
let showData = [{"word": "APPLE"}];

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clickedData:''
    };
  }

  addData =(data)=>{
    let add = this.state.clickedData.concat(data);
    this.setState({clickedData:add})
    console.log(word.find((data)=> data===this.state.clickedData));
    
    if(word.find((data)=> data===this.state.clickedData)){
      alert('dada')
      let wordAdd ={
        word:this.state.clickedData,
        count: this.state.clickedData.length
      };
      showData.push(wordAdd);
      console.log(showData);
      this.setState({clickedData:''})
    }
    console.log(this.state.clickedData)
}

renderItem1 = ({item}) =>{
  return(
    <View style={{height:70, flexDirection:'row'}}>
      <View style={{padding:10,flex:2, justifyContent:'center'}}>
        <Text style={{fontSize:25}}>{item.word}</Text>
      </View>
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <Circle word={item.count}/>
      </View>
    </View>
  )
}

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>{
        // alert(item.word);
        this.addData(item.word)
      }}>
          <Circle word={item.word} color={'red'}/>
      </TouchableOpacity>
    );
  };
 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 35, color:'red' }}>Give me Five</Text>
        </View>
        <View style={styles.center}>
          <View style={styles.top}>
            <FlatList
              data={formatData(data, numColumns)}
              style={{padding:5}}
              renderItem={this.renderItem}
              numColumns={numColumns}
            />
          </View>
          <View style={styles.bottom}>
          <FlatList
              data={showData}
              style={{padding:5}}
              renderItem={this.renderItem1}
            />   
          </View>
        </View>
        <View style={styles.footer}>
        <Image
          style={{width:"100%",height: 200,resizeMode: 'cover'}}
          source={require('./assets/pick.png')}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 0.5,
    paddingLeft: 25,
    justifyContent: 'flex-end',
    borderBottomWidth:10,
    borderBottomColor:'red'
  },
  center: {
    flex: 3
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  bottom: {
    flex: 1.7
  },
  footer: {
    flex: 1.45,
  }
})
