import React, {Component} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

const Container = Animated.createAnimatedComponent(styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: #F5FCFF;
    zIndex: -1;
`);

const StyledText = styled.Text`
    fontSize: 17;
`;


export default class PinchDemo extends Component {

    constructor(props) {
        super(props);

        this._lastScale = 1;
        this._baseScale = new Animated.Value(1);
        this._pinchScale = new Animated.Value(1);
        this._containerScale = Animated.multiply(this._baseScale, this._pinchScale);
        this._onPinchGestureEvent = Animated.event(
            [{nativeEvent: {scale: this._pinchScale}}]
        );
        this._onPinchHandlerStateChange = this._onPinchHandlerStateChange.bind(this);
    }

    _onPinchHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastScale *= event.nativeEvent.scale;
            this._baseScale.setValue(this._lastScale);
            this._pinchScale.setValue(1);
        }
    };

    render() {
        return (
            <PinchGestureHandler
                onGestureEvent={this._onPinchGestureEvent}
                onHandlerStateChange={this._onPinchHandlerStateChange}
            >
                <Container
                    style={{
                        ...this.props.style,
                        transform: [
                            {scale: this._containerScale}
                        ]
                    }}
                >
                    <StyledText>
                        Hello Pinch
                    </StyledText>
                </Container>
            </PinchGestureHandler>
        )
    }
}