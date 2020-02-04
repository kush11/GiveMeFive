import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button, Alert } from 'react-native';
import Circle from './circle';
import * as Progress from 'react-native-progress';

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
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clickedData: '',
      wordCount: 0,
      letterCount: 0,
      addedWord: false,
      showData: []
    };
  }

  addData = (data) => {
    this.setState((prevState, props) => {
      return { clickedData: prevState.clickedData + data };
    })
  }

  renderItem1 = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25 }}>{item.word}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Circle word={item.count} />
        </View>
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        // alert(item.word);
        this.addData(item.word)
      }}>
        <Circle word={item.word} color={'red'} />
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
      count: this.state.clickedData.length
    };
    this.setState((prevState, props) => {
      return {
        wordCount: prevState.wordCount + 1,
        clickedData: '',
        showData: [...this.state.showData, wordAdd]
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
    if (this.state.wordCount === 5) {
      return (
        <View>
          <Text style={{ fontSize: 35, color: 'red' }}>Give me Five</Text>
          {Alert.alert(
            'Successfully Submitted...!!',
            'Restart the application...!!',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
              { text: 'OK', onPress: this.onOkPressed },
            ],
            { cancelable: false }
          )}
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 35, color: 'red' }}>Give me Five</Text>
        </View>
        <View>
          <Progress.Bar
            style={styles.progBar}
            progress={this.state.showData.length / 5}
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
            />
          </View>
          {this.state.clickedData !== '' ?
            <View style={{ flex: 0.5, flexDirection: 'row' }}>
              <View style={styles.bottom}>
                <Text>{`${this.state.clickedData}`}</Text>
              </View>
              <View style={{
                flexDirection: 'row'
              }}>
                <Button
                  title="Cancel"
                  onPress={() => this.cancelled()}
                  style={{ color: 'red', borderRadius: 25, marginRight: 5 }}
                />
                <Button
                  title="OK"
                  onPress={() => this.pushData()}
                />
              </View>
            </View> : null
          }
          <View style={{ flex: 2 }}>
            <FlatList
              data={this.state.showData}
              style={{ padding: 5 }}
              renderItem={this.renderItem1}
            />
          </View>
        </View>
        <View style={{ flex: 3 }}>
          <Image
            style={{ width: "100%", height: 200, resizeMode: 'cover' }}
            source={require('./assets/pick.png')}
          />
        </View>
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
    flex: 0.5
  },
})
