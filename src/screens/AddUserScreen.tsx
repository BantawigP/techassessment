import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { mockUsers } from '../data/mockUsers';

type RootStackParamList = {
  UserList: undefined;
  AddUser: undefined;
  UserDetail: { userId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddUser'>;

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  address: string;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  address: string;
}

const ROLE_OPTIONS = ['Rider', 'Merchant', 'Local Seller'];

const AddUserScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    address: '',
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.role.trim()) newErrors.role = 'Role is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';

    if (form.email && mockUsers.some(user => user.email.toLowerCase() === form.email.toLowerCase())) {
    newErrors.email = 'Email already exists';
  }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (form.phone && !/^\d{10,}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number (min 10 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newUser: User = {
        id: String(mockUsers.length + 1),
        ...form,
      };

      mockUsers.push(newUser);
      
      Alert.alert('Success', `${newUser.fullName} has been added!`, [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('UserList');
          },
        },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={form.fullName}
          onChangeText={(text) => setForm({ ...form, fullName: text })}
        />
        {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
          keyboardType="phone-pad"
        />
        {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Role *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={form.role}
            onValueChange={(itemValue: string) =>
              setForm({ ...form, role: itemValue })
            }
          >
            <Picker.Item label="Select a role..." value="" />
            {ROLE_OPTIONS.map((roleOption) => (
              <Picker.Item key={roleOption} label={roleOption} value={roleOption} />
            ))}
          </Picker>
        </View>
        {errors.role && <Text style={styles.error}>{errors.role}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter address"
          value={form.address}
          onChangeText={(text) => setForm({ ...form, address: text })}
          multiline
          numberOfLines={3}
        />
        {errors.address && <Text style={styles.error}>{errors.address}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add User</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
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
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  error: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddUserScreen;