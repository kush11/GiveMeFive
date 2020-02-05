import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';

class Loading extends PureComponent {
    goto = () => {
        return (
            <View style={styles.Container}>
                <View>
                    <Image resizeMode='contain' style={styles.imagelogo} source={require('../../assets/pick.png')} />
                </View>
                <View>
                    <Text style={styles.textView}
                    >
                        INTERPRETING RESPONSES
          </Text>
                </View>
                <View style={{ top: 70 }}>
                    <Progress.Bar progress={0.3} height={8} width={280} color="#41ab3e" animationType="timing" indeterminate={true} />
                </View>
            </View>
        );
    }

    render() {
        return (this.goto());
    }
}
const styles = StyleSheet.create({
    Container: {
        position: 'absolute',
        top: 60,
        left: 30,
        right: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagelogo: {
        height: 300,
        width: 300
    },
    textView: {
        top: 30, fontSize: 20, textAlign: 'center', color: '#A9A9A9'
    }

});
export default Loading;
