import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Circle from '../shared/circle';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RenderWord extends PureComponent {
    constructor(props) { super(props); }

    render() {
        return (
            <View style={styles.viewContent}>
                <View style={styles.textContent}>
                    <Text style={styles.viewText}>{this.props.text}</Text>
                </View>
                <View style={styles.viewCircle}>
                    <Circle word={this.props.word} color={'red'} />
                </View>
                <View style={styles.viewIcon}>
                    <Icon size={25} name="close" color={'black'} onPress={this.props.delete}></Icon>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContent: { flex: 2, justifyContent: 'center', paddingLeft: 30 },
    viewContent: { flex: 0.5, flexDirection: 'row' },
    viewText: { fontWeight: "bold", fontSize: 30, color: 'black', textDecorationLine: 'underline' },
    viewCircle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    viewIcon: { flex: 0.5, justifyContent: 'center', alignItems: 'center' }

})