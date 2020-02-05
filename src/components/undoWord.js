import React, { PureComponent } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class UndoWord extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity
                style={styles.undoButton}
                onPress={this.props.undoWord}
            >
                <Icon size={25} name="undo" color={'red'}></Icon>
                <Text style={{ size: 30 }}>Undo</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    undoButton: {
        height: 60,
        width: 60,
        backgroundColor: 'gray',
        position: "absolute",
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    }
})