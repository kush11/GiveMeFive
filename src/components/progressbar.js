import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export default class ProgressBar extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Progress.Bar
                    style={styles.progBar}
                    progress={this.props.progress}
                    width={null}
                    color="red"
                    unfilledColor="#ffffff"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    progBar: {
        borderRadius: 0,
        borderWidth: 0,
        marginLeft: -1,
        padding: 0
    },

})