import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ViewToggle = ({ viewMode, onToggle }) => {
  return (
    <BlurView intensity={70} style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.button, viewMode === 'card' && styles.activeButton]}
          onPress={() => onToggle('card')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="view-grid"
            size={20}
            color={viewMode === 'card' ? '#fff' : '#666'}
          />
          <Text style={[styles.buttonText, viewMode === 'card' && styles.activeText]}>
            Cards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, viewMode === 'list' && styles.activeButton]}
          onPress={() => onToggle('list')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="view-list"
            size={20}
            color={viewMode === 'list' ? '#fff' : '#666'}
          />
          <Text style={[styles.buttonText, viewMode === 'list' && styles.activeText]}>
            List
          </Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  toggleContainer: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  activeText: {
    color: '#fff',
  },
});

export default ViewToggle;