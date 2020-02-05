import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Give me Five</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    header: {
        flex: 0.5,
        paddingLeft: 15
    },
    headerTitle: { fontSize: 35, color: 'red' }

})