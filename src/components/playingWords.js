import React, { PureComponent } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default class PlayingWords extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.top}>
                <FlatList
                    extraData={this.props.extraData}
                    data={this.props.data}
                    renderItem={this.props.renderItem}
                    numColumns={this.props.numColumns}
                    keyExtractor={this.props.keyExtractor}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    top: {
        flex: 2,
        paddingVertical: 5
    },

})