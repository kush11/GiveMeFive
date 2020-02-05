import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class TypeWord extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.typedView}>
                <View style={styles.bottom}>
                    <Text style={styles.text}>{`${this.props.text}`}</Text>
                </View>
                <View style={styles.buttonView}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={this.props.cancel}
                            style={[styles.button, { backgroundColor: 'red' }]}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: 'green' }]}
                            onPress={this.props.push}
                        >
                            <Text>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: { flex: 1, marginRight: 5, borderRadius: 12, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
    bottom: {
        flex: 2.5,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonView: {
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'space-between'
    },
    text: { fontWeight: "bold", fontSize: 20 },
    typedView: { flex: 0.5, flexDirection: 'row', paddingLeft: 50 }
})