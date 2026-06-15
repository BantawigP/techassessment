import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UseCard from './src/components/UserCard';
import UserListScreen from './src/screens/UserListScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';
import AddUserScreen from './src/screens/AddUserScreen';

export type RootStackParamList = {
  UserList: undefined;
  AddUser: undefined;
  UserDetail: { userId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <UseCard 
        fullName="John Doe"
        email="john.doe@example.com"
        role="Admin"
        type="button"
      />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserList" component={UserListScreen} />
        <Stack.Screen name="UserDetail" component={UserDetailsScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});