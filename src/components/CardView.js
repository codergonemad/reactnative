import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  Animated,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CardView = ({ data, onItemPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const handleScroll = useCallback((event) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / height);
    if (index !== currentIndex) {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(index);
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [currentIndex]);

  const renderItem = ({ item, index }) => (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.backgroundImage}
        blurRadius={3}
      />
      <BlurView intensity={60} style={styles.overlay} tint="dark">
        <View style={styles.content}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            {data.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressDot,
                  i === currentIndex && styles.progressDotActive
                ]}
              />
            ))}
          </View>

          {/* Title Section */}
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons 
              name="home-city" 
              size={24} 
              color="#fff" 
              style={styles.titleIcon}
            />
            <Text style={styles.title}>
              ₹{item.price} crore
              <Text style={styles.titleHighlight}> Premium Property</Text>
            </Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            {item.description}
          </Text>

          {/* Property Details */}
          <View style={styles.propertyDetails}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="tape-measure" size={20} color="#fff" />
              <Text style={styles.detailsText}>{item.size} sq ft</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="bed" size={20} color="#fff" />
              <Text style={styles.detailsText}>{item.bedrooms} bedrooms</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="home" size={20} color="#fff" />
              <Text style={styles.detailsText}>{item.propertyType}</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <MaterialCommunityIcons name="gesture-swipe-left" size={16} color="#999" />
            <Text style={styles.footerText}>
              swipe left for more at {item.source} • {item.time}
            </Text>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={data}
        renderItem={renderItem}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={height}
        showsVerticalScrollIndicator={false}
        vertical
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id.toString()}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  card: {
    height: height,
    width: width,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    justifyContent: 'center',
    zIndex: 1,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  titleHighlight: {
    color: '#007AFF',
  },
  description: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 28,
    marginBottom: 24,
  },
  propertyDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailsText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#999',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default CardView;