import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  UserList: undefined;
  AddUser: undefined;
  UserDetail: { userId: string };
};

type UseCardNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface UseCardProps {
  userId?: string;
  fullName?: string;
  email?: string;
  role?: string;
  type?: 'detail' | 'list' | 'button';
}

const UseCard: React.FC<UseCardProps> = ({
  userId,
  fullName,
  email,
  role,
  type = 'list',
}) => {
  const navigation = useNavigation<UseCardNavigationProp>();

  const handleNavigateToDetail = () => {
    if (userId) {
      navigation.navigate('UserDetail', { userId });
    }
  };

  const handleNavigateToAddUser = () => {
    navigation.navigate('AddUser');
  };

  const handleNavigateToUserList = () => {
    navigation.navigate('UserList');
  };

  // User Detail Card
  if (type === 'detail') {
    return (
      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Full Name</Text>
        <Text style={styles.detailValue}>{fullName}</Text>

        <Text style={styles.detailLabel}>Email</Text>
        <Text style={styles.detailValue}>{email}</Text>

        <Text style={styles.detailLabel}>Role</Text>
        <Text style={styles.detailValue}>{role}</Text>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleNavigateToUserList}
        >
          <Text style={styles.buttonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // User List Card (clickable)
  if (type === 'list') {
    return (
      <TouchableOpacity 
        style={styles.listCard}
        onPress={handleNavigateToDetail}
      >
        <Text style={styles.cardTitle}>{fullName}</Text>
        <Text style={styles.cardSubtitle}>{email}</Text>
        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>{role}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // Navigation Button Card
  if (type === 'button') {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.navButton, styles.listButton]}
          onPress={handleNavigateToUserList}
        >
          <Text style={styles.buttonText}>View Users</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, styles.addButton]}
          onPress={handleNavigateToAddUser}
        >
          <Text style={styles.buttonText}>Add User</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  // List Card Styles
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  roleContainer: {
    backgroundColor: '#E3F2FD',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  roleText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },

  // Detail Card Styles
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },

  // Button Container Styles
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  navButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  listButton: {
    backgroundColor: '#007AFF',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default UseCard;