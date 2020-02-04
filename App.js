import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, Image,ImageBackground, TouchableOpacity, Button, Alert } from 'react-native';
import Circle from './circle';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome'

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
let data = [
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
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clickedData: '',
      wordCount: 0,
      letterCount: 0,
      addedWord: false,
      showData: [],
      deleted: false,
      deletedOrder: []
    };
  }

  addData = (resData, id) => {
    data.forEach((res) => {
      console.log(res.word);
      if (res.word === resData && res.id === id) {
        res.color = 'red';
        res.disabled = true
      }
      console.log("after change", data);
    });
    this.setState((prevState, props) => {
      return { clickedData: prevState.clickedData + resData };
    })

  }

  renderItem1 = ({ item }) => {
    if (item.status === 'active') {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 2, justifyContent: 'center', paddingLeft: 30 }}>
            <Text style={{ fontSize: 25 }}>{item.word}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Circle word={item.count} color={'red'} />
          </View>
          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <Icon size={25} name="close" color={'red'} onPress={() => this.deleteWord(item)}></Icon>
          </View>
        </View>
      )
    }
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        // alert(item.word);
        this.addData(item.word, item.id)
      }}
      >
        <Circle word={item.word} />
      </TouchableOpacity>
    );
  };

  cancelled = () => {
    this.setState({
      clickedData: '',
      typedWord: ''
    })
  }

  pushData = () => {
    let wordAdd = {
      word: this.state.clickedData,
      count: this.state.clickedData.length,
      status: 'active'
    };
    this.setState((prevState, props) => {
      return {
        wordCount: prevState.wordCount + 1,
        clickedData: '',
        showData: [...this.state.showData, wordAdd]
      };
    })
  }

  undoData = () => {
    let undoedWord = this.state.deletedOrder.pop();
    this.state.showData.filter((item) => {
      item.word === undoedWord.word ? item.status = 'active' : null
    })
    this.setState((prevState, props) => {
      return {
        wordCount: prevState.wordCount + 1,
        deleted: this.state.deletedOrder.length != 0 ? true : false
      };
    })
  }

  deleteWord = (item) => {
    item.status = 'inactive';
    this.setState((prevState, props) => {
      return {
        wordCount: prevState.wordCount - 1,
        deleted: true,
        deletedOrder: [...this.state.deletedOrder, item]
      };
    })
  }
  onOkPressed = () => {
    this.setState((prevState, props) => {
      return {
        wordCount: 0,
        clickedData: '',
        showData: []
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 35, color: 'red' }}>Give me Five</Text>
        </View>
        <View>
          <Progress.Bar
            style={styles.progBar}
            progress={this.state.showData.filter((item) => item.status === 'active').length / 5}
            width={null}
            color="red"
            unfilledColor="#ffffff"
          />
        </View>
        <View style={styles.center}>
          <View style={styles.top}>
            <FlatList
              data={formatData(data, numColumns)}
              renderItem={this.renderItem}
              numColumns={numColumns}
              keyExtractor={item => item.id}
            />
          </View>
          {this.state.clickedData !== '' ?
            <View style={{ flex: 0.5, flexDirection: 'row', paddingLeft: 50 }}>
              <View style={styles.bottom}>
                <Text style={{ fontSize: 20 }}>{`${this.state.clickedData}`}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => this.cancelled()}
                    style={{ flex: 1, backgroundColor: 'red', borderRadius: 12, borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={{ flex: 1, backgroundColor: 'green', borderRadius: 12, borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => this.pushData()}
                  >
                    <Text>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View> : null
          }
          <View style={{ flex: 5.5 }}>
            <FlatList
              extraData={this.state.wordCount}
              data={this.state.showData}
              renderItem={this.renderItem1}
              keyExtractor={item => item.key}
            />
            <Image
              style={{
                height: '50%',
                width: '100%',
                backgroundColor: 'transparent',
                position: "absolute",
                bottom: 0,
                
              }}
              source={require('./assets/pick.png')}
            />
          </View>
          {this.state.deleted ?
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                backgroundColor: 'gray',
                position: "absolute",
                bottom: 20,
                right: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}
              onPress={() => this.undoData()}
            >
              <Icon size={25} name="undo" color={'red'} onPress={() => this.undoData()}></Icon>
              <Text style={{ size: 30 }}>Undo</Text>
            </TouchableOpacity> : null}
        </View>
        {this.state.wordCount === 5 ? Alert.alert(
          'Successfully Submitted...!!',
          'Restart the application...!!',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
            { text: 'OK', onPress: this.onOkPressed },
          ],
          { cancelable: false }
        ) : null}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  progBar: {
    borderRadius: 0,
    borderWidth: 0,
    marginLeft: -1,
    padding: 0
  },
  header: {
    flex: 0.5,
    paddingLeft: 15
  },
  center: {
    flex: 5
  },
  top: {
    flex: 2,
    paddingVertical: 5
  },
  bottom: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: 'center'
  },
})