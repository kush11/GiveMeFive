import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import Circle from '../shared/circle';

export default class RenderLetter extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.addData}>
                <Circle word={this.props.word} />
            </TouchableOpacity>

        );
    }
}