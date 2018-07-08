import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PanResponder} from 'react-native';
import styled from 'styled-components';

const StyledView = styled.View`
    flex: 1;
    backgroundColor: #F5FCFF;
`;


export default class GestureResponderEvents extends Component {
    constructor(props) {
        super(props);

        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => {
                _.invoke(this.props, 'onStartShouldSetPanResponder', evt, gestureState);
                return true;
            },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                _.invoke(this.props, 'onStartShouldSetPanResponderCapture', evt, gestureState);
                return true;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                _.invoke(this.props, 'onMoveShouldSetPanResponder', evt, gestureState);
                return true;
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                _.invoke(this.props, 'onMoveShouldSetPanResponderCapture', evt, gestureState);
                return true;
            },

            onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!

                // gestureState.d{x,y} will be set to zero now
                _.invoke(this.props, 'onPanResponderGrant', evt, gestureState);
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                _.invoke(this.props, 'onPanResponderMove', evt, gestureState);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => {
                _.invoke(this.props, 'onPanResponderTerminationRequest', evt, gestureState);
                return true;
            },
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                _.invoke(this.props, 'onPanResponderRelease', evt, gestureState);
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
                _.invoke(this.props, 'onPanResponderTerminate', evt, gestureState);
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                _.invoke(this.props, 'onShouldBlockNativeResponder', evt, gestureState);
                return true;
            },
        });
    }

    render() {
        return (
            <StyledView {...this._panResponder.panHandlers} />
        );
    }
}

GestureResponderEvents.propTypes = {
    onStartShouldSetPanResponder: PropTypes.func,
    onStartShouldSetPanResponderCapture: PropTypes.func,
    onMoveShouldSetPanResponder: PropTypes.func,
    onMoveShouldSetPanResponderCapture: PropTypes.func,
    onPanResponderGrant: PropTypes.func,
    onPanResponderMove: PropTypes.func,
    onPanResponderTerminationRequest: PropTypes.func,
    onPanResponderRelease: PropTypes.func,
    onPanResponderTerminate: PropTypes.func,
    onShouldBlockNativeResponder: PropTypes.func
};