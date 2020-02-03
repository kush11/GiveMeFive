import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const circle = ({
    word = 'Default',color
}) => (
        <View style={{padding:10}}>
            <View style={[{...styles.circle, backgroundColor: color ? 'transparent' : 'red'}]}>
                <Text>{word}</Text>
            </View>
        </View>
    );

const styles = StyleSheet.create({
    circle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        borderColor: 'red',
        borderWidth:5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default circle;
