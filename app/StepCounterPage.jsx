import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import CircularProgress from 'react-native-circular-progress-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

export default function StepCounterPage() {
  const { theme } = useTheme();
  const [stepCount, setStepCount] = useState(0);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [lastMagnitude, setLastMagnitude] = useState(0);
  const [lastPeak, setLastPeak] = useState(0);
  
  useEffect(() => {
    subscribe();
    loadStepCountFromStorage();
    resetStepCountIfNecessary();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    saveStepCountToStorage();
  }, [stepCount]);

  const subscribe = async () => {
    await Accelerometer.setUpdateInterval(100); // Update every 100ms
    
    Accelerometer.addListener(accelerometerData => {
      setAcceleration(accelerometerData);
      detectStep(accelerometerData);
    });
  };

  const unsubscribe = () => {
    Accelerometer.removeAllListeners();
  };

  const detectStep = (data) => {
    // Calculate the magnitude of acceleration
    const magnitude = Math.sqrt(
      Math.pow(data.x, 2) + 
      Math.pow(data.y, 2) + 
      Math.pow(data.z, 2)
    );

    // Detect a step when there's a significant acceleration change
    const accelerationThreshold = 1.2;
    const timeThreshold = 250; // Minimum time between steps (ms)
    const now = Date.now();

    if (
      magnitude > accelerationThreshold && 
      magnitude > lastMagnitude && 
      now - lastPeak > timeThreshold
    ) {
      setStepCount(prev => prev + 1);
      setLastPeak(now);
    }

    setLastMagnitude(magnitude);
  };

  const loadStepCountFromStorage = async () => {
    try {
      const storedStepCount = await AsyncStorage.getItem('stepCount');
      if (storedStepCount !== null) {
        setStepCount(parseInt(storedStepCount));
      }
    } catch (error) {
      console.error('Error loading step count:', error);
    }
  };

  const saveStepCountToStorage = async () => {
    try {
      await AsyncStorage.setItem('stepCount', String(stepCount));
    } catch (error) {
      console.error('Error saving step count:', error);
    }
  };

  const resetStepCountIfNecessary = async () => {
    try {
      const lastResetTime = await AsyncStorage.getItem('lastResetTime');
      if (lastResetTime) {
        const timeDifference = Date.now() - parseInt(lastResetTime);
        const millisecondsIn24Hours = 24 * 60 * 60 * 1000;
        if (timeDifference >= millisecondsIn24Hours) {
          setStepCount(0);
          await AsyncStorage.setItem('lastResetTime', String(Date.now()));
        }
      } else {
        await AsyncStorage.setItem('lastResetTime', String(Date.now()));
      }
    } catch (error) {
      console.error('Error resetting step count:', error);
    }
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const distance = (stepCount / 1300).toFixed(4);
  const caloriesBurnt = (distance * 60).toFixed(4);

  return (
    <View
      style={[
        styles.container,
        {
          width: windowWidth,
          height: windowHeight,
          backgroundColor: theme.mainBackgroundColor,
        },
      ]}>
      <View style={styles.header}>
        <Text style={[styles.headingText, { color: theme.textColor }]}>
          Trạng thái: Đang theo dõi
        </Text>
      </View>

      <View style={styles.circularProgressContainer}>
        <CircularProgress
          value={stepCount}
          maxValue={6500}
          radius={windowWidth * 0.4}
          textColor={theme.textColor}
          activeStrokeColor={theme.logOutButton}
          inActiveStrokeColor={`${theme.logOutButton}80`}
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={10}
          activeStrokeWidth={10}
          title={'Số bước'}
          titleColor={theme.logOutButton}
          titleStyle={{ fontWeight: 'bold' }}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.infoText, { color: theme.textColor }]}>
          Mục tiêu: 6500 bước (5km)
        </Text>
        <Text style={[styles.infoText, { color: theme.textColor }]}>
          Số bước hiện tại: {stepCount}
        </Text>
        <Text style={[styles.infoText, { color: theme.textColor }]}>
          Khoảng cách: {distance} km
        </Text>
        <Text style={[styles.infoText, { color: theme.textColor }]}>
          Calo đã đốt: {caloriesBurnt} calo
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  circularProgressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
  },
});