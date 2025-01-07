import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

export default function ActivityLevel() {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const { selectedGender, age, height, weight } = route.params;
  const [activityLvl, setActivityLvl] = useState(null);

  const goToGoalSelection = () => {
    if (age && height && weight && selectedGender && activityLvl) {
      navigation.navigate('GoalSelection', {
        selectedGender: route.params.selectedGender,
        age: age,
        height: height,
        weight: weight,
        activityLvl: activityLvl,
      });
    } else {
      alert('Vui lòng chọn mức độ hoạt động');
    }
  };

  const handleActivityLevelSelection = (level) => {
    setActivityLvl(level);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.mainBackgroundColor },
      ]}>
      <Text style={[styles.header, { color: theme.textColor }]}>
        Chọn Mức Độ Hoạt Động
      </Text>

      <TouchableOpacity
        style={[styles.btn, activityLvl === 'sedentary' && styles.selectedBtn]}
        onPress={() => handleActivityLevelSelection('sedentary')}>
        <Text style={styles.btnText}>Ít vận động</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btn,
          activityLvl === 'lightly_active' && styles.selectedBtn,
        ]}
        onPress={() => handleActivityLevelSelection('lightly_active')}>
        <Text style={styles.btnText}>Hoạt động nhẹ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btn,
          activityLvl === 'moderately_active' && styles.selectedBtn,
        ]}
        onPress={() => handleActivityLevelSelection('moderately_active')}>
        <Text style={styles.btnText}>Hoạt động vừa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, activityLvl === 'active' && styles.selectedBtn]}
        onPress={() => handleActivityLevelSelection('active')}>
        <Text style={styles.btnText}>Hoạt động nhiều</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btn,
          activityLvl === 'very_active' && styles.selectedBtn,
        ]}
        onPress={() => handleActivityLevelSelection('very_active')}>
        <Text style={styles.btnText}>Rất năng động</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.proceedBtn} onPress={goToGoalSelection}>
        <Text style={styles.btnText}>Tiếp tục</Text>
      </TouchableOpacity>
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
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  btn: {
    paddingHorizontal: 15,
    backgroundColor: '#EAEAEA',
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  selectedBtn: {
    backgroundColor: '#FFD700',
  },
  btnText: {
    fontSize: 16,
  },
  proceedBtn: {
    marginTop: 40,
    backgroundColor: '#EFA900',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
});
