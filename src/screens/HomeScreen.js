import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardView from '../components/CardView';
import ListView from '../components/ListView';

// Import the sample data directly in the component file if you haven't set up the data file yet
const sampleNewsData = [
  {
    id: 1,
    title: "New Technology Breakthrough",
    description: "Scientists discover revolutionary quantum computing method",
    date: "2024-03-15",
    image: "https://placeholder.com/tech1.jpg",
    category: "Technology"
  },
  {
    id: 2,
    title: "Global Climate Initiative",
    description: "World leaders announce ambitious climate action plan",
    date: "2024-03-14",
    image: "https://placeholder.com/climate1.jpg",
    category: "Environment"
  },
  // ... you can add more items as needed
];

const HEADER_HEIGHT = 60;

const HomeScreen = () => {
  const [viewMode, setViewMode] = useState('card');
  const { width } = useWindowDimensions();
  const slideAnim = useState(new Animated.Value(0))[0];
  const fadeAnim = useState(new Animated.Value(1))[0];

  const toggleView = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setViewMode(current => (current === 'card' ? 'list' : 'card'));
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const slideIn = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 40,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  // Use sampleNewsData instead of newsData
  const processedNewsData = useMemo(() => {
    return sampleNewsData
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(item => ({
        ...item,
        key: item.id.toString(),
      }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <BlurView intensity={70} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.viewToggle}
            onPress={toggleView}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={viewMode === 'card' ? 'view-grid' : 'view-list'}
              size={24}
              color="#007AFF"
            />
          </TouchableOpacity>
        </View>
      </BlurView>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, width],
                }),
              },
            ],
          },
        ]}
      >
        {viewMode === 'card' ? (
          <CardView 
            data={processedNewsData}
            onItemPress={slideIn}
          />
        ) : (
          <ListView 
            data={processedNewsData}
            onItemPress={slideIn}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    height: HEADER_HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  viewToggle: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,122,255,0.1)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default HomeScreen;