import { Alert } from 'react-native';

export const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};

export const appAlert = (heading, title, func) => {
    Alert.alert(
        heading,
        title,
        [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
            { text: 'OK', onPress: func },
        ],
        { cancelable: false }
    )

}

export const appOkAlert = (heading, title, func) => {
    Alert.alert(
        heading,
        title,
        [
            { text: 'OK', onPress: func },
        ],
        { cancelable: false }
    )

}