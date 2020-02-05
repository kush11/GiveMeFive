import React, { PureComponent } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { formatData, appAlert, appOkAlert } from './src/functions/appFunction';
import { data, numColumns } from './src/shared/common';
import Header from './src/components/header';
import ProgressBar from './src/components/progressbar';
import PlayingWords from './src/components/playingWords';
import TypeWord from './src/components/typeWord';
import UndoWord from './src/components/undoWord';
import RenderLetter from './src/components/renderLetter';
import RenderWord from './src/components/renderWord';
import Loading from './src/shared/loading';
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
      deletedOrder: [],
      spinner: false
    };
  }

  addData = (resData, id) => {
    data.forEach((res) => {
      if (res.word === resData && res.id === id) {
        res.color = 'red';
        res.disabled = true
      }
    });
    this.setState((prevState, props) => {
      return { clickedData: prevState.clickedData + resData };
    })

  }

  cancelled = () => {
    this.setState({
      clickedData: '',
      typedWord: ''
    })
  }

  onDuplicateEnter = () => { this.setState((prevState, props) => { return { clickedData: '', }; }) }

  pushData = () => {
    let data = this.state.showData.filter(item => item.word === this.state.clickedData);
    if (this.state.wordCount === 5) {
      appOkAlert('You need to restart the application to proceed...!!', 'Restart the application...!!', this.onOkPressed)
    }
    else if (data.length !== 0) {
      appOkAlert('Duplicates are not allowed...!!', 'Enter next word...!!', this.onDuplicateEnter)
    }
    else {
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
  }

  undoData = () => {
    let undoedWord = this.state.deletedOrder.pop();
    this.state.showData.filter((item) => {
      (item.word === undoedWord.word) ? item.status = 'active' : null
    })
    this.setState((prevState, props) => {
      return {
        wordCount: prevState.wordCount + 1,
        deleted: this.state.deletedOrder.length !== 0 ? true : false
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
    this.setState({ spinner: true });
    setTimeout(() => {
      this.setState((prevState, props) => {
        return {
          wordCount: 0,
          clickedData: '',
          showData: [],
          spinner: false
        };
      });
    }, 1000);

  }
  renderWord = ({ item }) => {
    if (item.status === 'active') {
      return (<RenderWord text={item.word} word={item.count} delete={() => this.deleteWord(item)} />)
    }
  }
  renderLetter = ({ item }) => {
    return (<RenderLetter addData={() => this.addData(item.word, item.id)} word={item.word} />);
  };

  render() {
    const { showData, clickedData, wordCount, deleted, spinner } = this.state;
    if (spinner) {
      return (<Loading />)
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/background.png')} style={styles.imgBackground}>

          <Header />

          <ProgressBar progress={showData.filter((item) => item.status === 'active').length / 5} />

          <View style={styles.center}>

            <PlayingWords
              data={formatData(data, numColumns)}
              renderItem={this.renderLetter}
              numColumns={numColumns}
              keyExtractor={item => item.id} />

            {clickedData !== '' ? <TypeWord text={clickedData} cancel={this.cancelled} push={this.pushData} /> : null}

            <View style={{ flex: 5.5 }}>

              <PlayingWords extraData={wordCount}
                data={showData}
                renderItem={this.renderWord}
                keyExtractor={item => item.key} />

            </View>

            {deleted ? <UndoWord undoWord={this.undoData} /> : null}

          </View>

          {wordCount === 5 ? appAlert('Congratulations...!!', 'Kindly reset the application...!!', this.onOkPressed) : null}

        </ImageBackground>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: { width: '100%', height: '100%' },
  container: {
    flex: 1
  },
  center: {
    flex: 5
  }
})