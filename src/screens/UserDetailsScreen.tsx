import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { mockUsers } from '../data/mockUsers';

type RootStackParamList = {
  UserList: undefined;
  AddUser: undefined;
  UserDetail: { userId: string };
};

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserDetail'>;

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  address: string;
}

const UserDetailScreen = () => {
  const route = useRoute<UserDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = route.params?.userId;
    
    if (userId) {
      const foundUser = mockUsers.find((u) => u.id === userId);
      if (foundUser) {
        setUser(foundUser);
      } else {
        Alert.alert('Error', 'User not found');
        navigation.goBack();
      }
    }
    setLoading(false);
  }, [route.params?.userId, navigation]);


  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{user.fullName}</Text>
      </View>

      <View style={styles.detailGroup}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{user.fullName}</Text>
      </View>

      <View style={styles.detailGroup}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.detailGroup}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>

      <View style={styles.detailGroup}>
        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>{user.role}</Text>
      </View>

      <View style={styles.detailGroup}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{user.address}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('UserList')}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  detailGroup: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 24,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserDetailScreen;