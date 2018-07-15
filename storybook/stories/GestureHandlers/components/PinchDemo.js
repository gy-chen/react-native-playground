import React, {Component} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

const Container = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: #F5FCFF;
    zIndex: -1;
`;

const AnimatedContainer = Animated.createAnimatedComponent(styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
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

        this._baseCenterX = new Animated.Value(0);
        this._baseCenterY = new Animated.Value(0);
        this._lastFocalX = 0;
        this._baseFocalX = new Animated.Value(0);
        this._lastFocalY = 0;
        this._baseFocalY = new Animated.Value(0);
        this._lastTranslateX = 0;
        this._baseTranslateX = new Animated.Value(0);
        this._containerTranslateX = Animated.add(this._baseTranslateX, Animated.multiply(
            Animated.add(new Animated.Value(1), Animated.multiply(-1, this._pinchScale)),
            Animated.add(this._baseFocalX, Animated.multiply(-1, this._baseCenterX)))
        );
        this._lastTranslateY = 0;
        this._baseTranslateY = new Animated.Value(0);
        this._containerTranslateY = Animated.add(this._baseTranslateY, Animated.multiply(
            Animated.add(new Animated.Value(1), Animated.multiply(-1, this._pinchScale)),
            Animated.add(this._baseFocalY, Animated.multiply(-1, this._baseCenterY))
        ));
        this._onPinchGestureEvent = Animated.event(
            [{
                nativeEvent: {
                    scale: this._pinchScale
                }
            }]
        );
        this._onPinchHandlerStateChange = this._onPinchHandlerStateChange.bind(this);
        this._onLayout = this._onLayout.bind(this);
    }

    _onLayout({nativeEvent: {layout: {x, y, width, height}}}) {
        this._lastCenterX = width / 2.;
        this._baseCenterX.setValue(this._lastCenterX);
        this._lastCenterY = height / 2.;
        this._baseCenterY.setValue(this._lastCenterY);
    }

    _onPinchHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.BEGAN) {
            this._lastFocalX = event.nativeEvent.focalX;
            this._baseFocalX.setValue(this._lastFocalX);
            this._lastFocalY = event.nativeEvent.focalY;
            this._baseFocalY.setValue(this._lastFocalY);
        }

        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastScale *= event.nativeEvent.scale;
            this._baseScale.setValue(this._lastScale);
            this._pinchScale.setValue(1);

            this._lastTranslateX += (1 - event.nativeEvent.scale) * (this._lastFocalX - this._lastCenterX);
            this._baseTranslateX.setValue(this._lastTranslateX);
            this._lastTranslateY += (1 - event.nativeEvent.scale) * (this._lastFocalY - this._lastCenterY);
            this._baseTranslateY.setValue(this._lastTranslateY);
        }
    };

    render() {
        return (
            <PinchGestureHandler
                onGestureEvent={this._onPinchGestureEvent}
                onHandlerStateChange={this._onPinchHandlerStateChange}
            >
                <Container
                    onLayout={this._onLayout}
                >
                    <AnimatedContainer
                        style={{
                            ...this.props.style,
                            transform: [
                                {scale: this._containerScale},
                                {translateX: this._containerTranslateX},
                                {translateY: this._containerTranslateY}
                            ]
                        }}>
                        <StyledText>
                            Hello Pinch
                        </StyledText>
                    </AnimatedContainer>
                </Container>
            </PinchGestureHandler>
        )
    }
}