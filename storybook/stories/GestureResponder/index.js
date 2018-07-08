// Test React Native Gesture Responder System
// See: https://facebook.github.io/react-native/docs/gesture-responder-system
import React from 'react';
import GestureResponderEvent from './components/GestureResponderEvents';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';

export const loadStories = () => {
    storiesOf('GestureResponder', module)
        .add('show events', () => (
            <GestureResponderEvent
                onStartShouldSetPanResponder={action('onStartShouldSetPanResponder')}
                onStartShouldSetPanResponderCapture={action('onStartShouldSetPanResponderCapture')}
                onMoveShouldSetPanResponder={action('onMoveShouldSetPanResponder')}
                onMoveShouldSetPanResponderCapture={action('onMoveShouldSetPanResponderCapture')}
                onPanResponderGrant={action('onPanResponderGrant')}
                onPanResponderMove={action('onPanResponderMove')}
                onPanResponderTerminationRequest={action('onPanResponderTerminationRequest')}
                onPanResponderRelease={action('onPanResponderRelease')}
                onPanResponderTerminate={action('onPanResponderTerminate')}
                onShouldBlockNativeResponder={action('onShouldBlockNativeResponder')}
            />
        ));
}