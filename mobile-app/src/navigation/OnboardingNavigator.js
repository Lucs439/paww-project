import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import Feature1Screen from '../screens/onboarding/Feature1Screen';
import Feature2Screen from '../screens/onboarding/Feature2Screen';
import Feature3Screen from '../screens/onboarding/Feature3Screen';
import Feature4Screen from '../screens/onboarding/Feature4Screen';
import Feature5Screen from '../screens/onboarding/Feature5Screen';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' }
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Feature1" component={Feature1Screen} />
      <Stack.Screen name="Feature2" component={Feature2Screen} />
      <Stack.Screen name="Feature3" component={Feature3Screen} />
      <Stack.Screen name="Feature4" component={Feature4Screen} />
      <Stack.Screen name="Feature5" component={Feature5Screen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator; 