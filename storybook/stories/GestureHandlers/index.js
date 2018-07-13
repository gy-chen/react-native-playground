// Test react-native-gesture-handler
// See: https://github.com/kmagiera/react-native-gesture-handler
import React from 'react';
import styled from 'styled-components';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {PinchGestureHandler} from 'react-native-gesture-handler';
import PinchDemo from './components/PinchDemo';

const PinchGestureHandlerView = styled.View`
    flex: 1;
    backgroundColor: #F5FCFF;
`;

export const loadStories = () => {
    storiesOf('react-native-gesture-handlers', module)
        .add('show PinchGestureHandler events', () => {
            return (
                <PinchGestureHandler
                    onGestureEvent={action('onGestureEvent')}
                    onHandlerStateChange={action('onHandlerStateChange')}
                >
                    <PinchGestureHandlerView/>
                </PinchGestureHandler>
            )
        })
        .add('pinch demo', () => (<PinchDemo/>));
};