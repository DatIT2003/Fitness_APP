import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Dimensions, 
  Alert,
  ScrollView 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function GoalSelection() {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();

  // Chuyển đổi giới tính từ 'Nam'/'Nữ' sang 'male'/'female'
  const selectedGender = route.params.selectedGender === 'Nam' ? 'male' : 'female';
  const { age, height, weight, activityLvl } = route.params;

  // State quản lý các thông tin
  const [bmi, setBMI] = useState(0);
  const [bmiCategory, setBMICategory] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [detailedRecommendation, setDetailedRecommendation] = useState('');
  const [goal, setGoal] = useState('');
  const [nutritionDetails, setNutritionDetails] = useState(null);
  const [isRecommendationModalVisible, setIsRecommendationModalVisible] = useState(true);
  const [isGoalSelectionVisible, setIsGoalSelectionVisible] = useState(false);

  // Cấu trúc khuyến nghị chi tiết theo giới tính
  const genderRecommendations = {
    male: {
      categories: [
        { 
          min: 0, 
          max: 18.5, 
          category: 'Thiếu cân', 
          recommendation: 'Tăng cân',
          detailedRecommendation: 'Nam giới thiếu cân cần tập trung xây dựng khối cơ, bổ sung dinh dưỡng đầy đủ và tập luyện sức mạnh.'
        },
        { 
          min: 18.5, 
          max: 24, 
          category: 'Bình thường', 
          recommendation: 'Duy trì cân nặng',
          detailedRecommendation: 'Nam giới ở mức bình thường nên duy trì chế độ ăn cân đối, tập luyện đều đặn để phát triển sức khỏe toàn diện.'
        },
        { 
          min: 24, 
          max: 27, 
          category: 'Thừa cân', 
          recommendation: 'Giảm cân',
          detailedRecommendation: 'Nam giới thừa cân nên giảm lượng nạp năng lượng, tăng cường tập cardio và luyện tập sức mạnh.'
        },
        { 
          min: 27, 
          max: 32, 
          category: 'Béo phì độ I', 
          recommendation: 'Giảm cân',
          detailedRecommendation: 'Nam giới béo phì độ I cần một chế độ ăn kiêng khoa học, kết hợp tập luyện để giảm mỡ thừa.'
        },
        { 
          min: 32, 
          max: 100, 
          category: 'Béo phì độ II', 
          recommendation: 'Giảm cân',
          detailedRecommendation: 'Nam giới béo phì độ II cần can thiệp y tế, chế độ ăn kiêng nghiêm ngặt và tập luyện chuyên sâu.'
        }
      ]
    },
    female: {
      categories: [
        { 
          min: 0, 
          max: 18.5, 
          category: 'Thiếu cân', 
          recommendation: 'Tăng cân',
          detailedRecommendation: 'Nữ giới thiếu cân nên bổ sung dinh dưỡng, tập luyện nhẹ nhàng để tăng cân an toàn và cân đối.'
        },
        { 
          min: 18.5, 
          max: 23, 
          category: 'Bình thường', 
          recommendation: 'Duy trì cân nặng',
          detailedRecommendation: 'Nữ giới ở mức bình thường nên duy trì chế độ ăn cân đối, tập luyện nhẹ nhàng để giữ dáng.'
        },
        { 
          min: 23, 
          max: 25, 
          category: 'Thừa cân', 
          recommendation: 'Giảm cân',
          detailedRecommendation: 'Nữ giới thừa cân nên điều chỉnh chế độ ăn, tập các bài tập cardio và yoga để giảm cân.'
        },
        { 
          min: 25, 
          max: 30, 
          category: 'Béo phì độ I', 
          recommendation: 'Giảm cân',
          detailedRecommendation: 'Nữ giới béo phì độ I cần chế độ ăn kiểm soát, tập luyện đều đặn để giảm mỡ thừa.'
        },
        { 
          min: 30, 
          max: 100, 
          category: 'Béo phì độ II', 
          recommendation: 'Giảm cân',
          detailedRecommendation: 'Nữ giới béo phì độ II cần sự hỗ trợ chuyên nghiệp, chế độ ăn kiêng và tập luyện chuyên sâu.'
        }
      ]
    }
  };

  // Hàm tính BMR (Basal Metabolic Rate)
  const calculateBMR = (gender, weight, height, age) => {
    return gender === 'male'
      ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
      : 447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age);
  };

  // Hàm tính TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = (bmr, activityLevel) => {
    const activityMultiplier = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    return bmr * activityMultiplier[activityLevel];
  };

  // Hàm phân bổ calo cho các bữa ăn
  const calculateMealCalories = (dailyCalories, goal) => {
    let breakfastCalories, lunchCalories, dinnerCalories;

    if (goal === 'gain') {
      breakfastCalories = Math.round(dailyCalories * 0.25);
      lunchCalories = Math.round(dailyCalories * 0.35);
      dinnerCalories = Math.round(dailyCalories * 0.40);
    } else if (goal === 'lose') {
      breakfastCalories = Math.round(dailyCalories * 0.30);
      lunchCalories = Math.round(dailyCalories * 0.40);
      dinnerCalories = Math.round(dailyCalories * 0.30);
    } else { // maintain
      breakfastCalories = Math.round(dailyCalories * 0.25);
      lunchCalories = Math.round(dailyCalories * 0.35);
      dinnerCalories = Math.round(dailyCalories * 0.40);
    }

    return {
      totalCalories: Math.round(dailyCalories),
      breakfastCalories,
      lunchCalories,
      dinnerCalories
    };
  };

  // Tính toán BMI và khuyến nghị
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100; // Chuyển đổi chiều cao từ cm sang m
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBMI(bmiValue);
    
    // Xác định phân loại BMI
    const category = genderRecommendations[selectedGender].categories.find(cat => 
      bmiValue >= cat.min && bmiValue < cat.max
    );
    
    if (category) {
      setBMICategory(category.category);
      setRecommendation(category.recommendation);
      setDetailedRecommendation(category.detailedRecommendation);
    }
  };

  useEffect(() => {
    calculateBMI(weight, height);
  }, [weight, height]);

  // Tính toán calo theo mục tiêu
  const calculateCaloriesForGoal = async (selectedGoal) => {
    const bmr = calculateBMR(selectedGender, weight, height, age);
    const tdee = calculateTDEE(bmr, activityLvl);
    
    let dailyCalories;
    switch (selectedGoal) {
      case 'gain':
        dailyCalories = tdee + 500;
        break;
      case 'lose':
        dailyCalories = tdee - 500;
        break;
      default: // maintain
        dailyCalories = tdee;
    }
    
    const nutritionDetails = calculateMealCalories(dailyCalories, selectedGoal);
    
    // Lưu trữ thông tin vào AsyncStorage
    const userNutritionData = {
      selectedGender,
      age,
      height,
      weight,
      activityLvl,
      goal: selectedGoal,
      bmi,
      bmiCategory,
      nutritionDetails
    };
    
    try {
      // Lưu toàn bộ thông tin người dùng
      await AsyncStorage.setItem('userNutritionData', JSON.stringify(userNutritionData));
      
      // Lưu riêng từng thông tin
      await AsyncStorage.setItem('userGoal', selectedGoal);
      await AsyncStorage.setItem('nutritionDetails', JSON.stringify(nutritionDetails));
      
      // Chuyển sang màn hình DietShow
      navigation.navigate('DietShow', userNutritionData);
    } catch (error) {
      console.error('Lỗi khi lưu trữ dữ liệu:', error);
      Alert.alert('Lỗi', 'Không thể lưu trữ dữ liệu. Vui lòng thử lại.');
    }
  };

  const handleContinueFromRecommendation = () => {
    setIsRecommendationModalVisible(false);
    setIsGoalSelectionVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.mainBackgroundColor }]}>
      <Modal
        visible={isRecommendationModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Kết Quả BMI</Text>
            <Text style={styles.modalText}>BMI: {bmi.toFixed(2)}</Text>
            <Text style={styles.modalText}>Phân loại: {bmiCategory}</Text>
            <Text style={styles.modalText}>Khuyến nghị: {recommendation}</Text>
            <Text style={styles.modalDetailText}>{detailedRecommendation}</Text>
            <TouchableOpacity 
              style={styles.continueButton} 
              onPress={handleContinueFromRecommendation}
            >
              <Text style={styles.continueButtonText}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isGoalSelectionVisible && (
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Chọn Mục Tiêu Của Bạn</Text>
          <TouchableOpacity 
            style={styles.goalButton} 
            onPress={() => calculateCaloriesForGoal('gain')}
          >
            <Text style={styles.goalButtonText}>Tăng Cân</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.goalButton} 
            onPress={() => calculateCaloriesForGoal('maintain')}
          >
            <Text style={styles.goalButtonText}>Duy Trì Cân Nặng</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.goalButton} 
            onPress={() => calculateCaloriesForGoal('lose')}
          >
            <Text style={styles.goalButtonText}>Giảm Cân</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
 },
  modalDetailText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#EFA900',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goalButton: {
    width: '100%',
    backgroundColor: '#EFA900',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  goalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});