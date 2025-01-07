import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DietShow() {
  const route = useRoute();
  const { theme } = useTheme();
  const { goal } = route.params;

  const [caloriesInfo, setCaloriesInfo] = useState({
    totalCalories: 2000,
    breakfastCalories: 500,
    lunchCalories: 700,
    dinnerCalories: 800,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCalorieLimitExceeded, setIsCalorieLimitExceeded] = useState(false);

  // Lấy dữ liệu calo từ AsyncStorage
  useEffect(() => {
    const fetchCaloriesInfo = async () => {
      try {
        const storedNutritionData = await AsyncStorage.getItem('nutritionDetails');
        if (storedNutritionData) {
          const nutritionDetails = JSON.parse(storedNutritionData);
          const mappedNutritionDetails = {
            totalCalories: nutritionDetails.totalCalories,
            breakfastCalories: nutritionDetails.breakfastCalories,
            lunchCalories: nutritionDetails.lunchCalories,
            dinnerCalories: nutritionDetails.dinnerCalories,
          };
          setCaloriesInfo(mappedNutritionDetails);
        } else {
          console.warn('Không tìm thấy dữ liệu dinh dưỡng trong AsyncStorage.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu calo từ AsyncStorage:', error);
      }
    };

    fetchCaloriesInfo();
  }, []);

  // Tìm kiếm món ăn qua Edamam API
  const fetchIngredients = async (query) => {
    const appId = '9bf32ef1';
    const appKey = process.env.EXPO_FOOD_API_KEY;

    try {
      if (!query.trim()) {
        console.warn('Không có truy vấn nào được cung cấp.');
        setSearchResults([]);
        return;
      }

      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${appKey}`
      );

      if (!response.ok) {
        console.error('Lỗi API:', await response.text());
        setSearchResults([]);
        return;
      }

      const data = await response.json();
      const uniqueResults = [];
      const seenNames = new Set();

      data.hints.forEach((hint) => {
        const name = hint.food.label;
        if (seenNames.has(name)) return;

        seenNames.add(name);

        const calories = hint.food.nutrients?.ENERC_KCAL || 0;
        const weightPerServing = hint.measures?.[0]?.weight || 0;
        const unit = hint.measures?.[0]?.label || 'g';

        if (calories > 0 && weightPerServing > 0) {
          uniqueResults.push({
            name,
            category: hint.food.category || 'Khác',
            calories,
            weightPerServing,
            unit,
            image: hint.food.image || null,
          });
        }
      });

      setSearchResults(uniqueResults);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm nguyên liệu:', error);
      setSearchResults([]);
    }
  };

  // Thêm món ăn vào danh sách đã chọn
  const handleAddItem = (item) => {
    if (isCalorieLimitExceeded) return;

    setSelectedItems((prevItems) => {
      const updatedItems = [
        ...prevItems,
        {
          ...item,
          inputWeight: item.weightPerServing,
          calculatedCalories: item.calories,
        },
      ];

      const totalCalories = updatedItems.reduce((total, i) => total + parseFloat(i.calculatedCalories || 0), 0);

      if (totalCalories > caloriesInfo.totalCalories) {
        Alert.alert(
          'Cảnh báo',
          'Bạn đã chọn vượt quá lượng calo cho phép trong ngày!',
          [{ text: 'OK' }]
        );
        setIsCalorieLimitExceeded(true);
      }

      return updatedItems;
    });
  };

  // Cập nhật calo khi thay đổi khối lượng món ăn
  const handleWeightChange = (index, newWeight) => {
    setSelectedItems((prevItems) => {
      const updatedItems = [...prevItems];
      const currentItem = updatedItems[index];
      const newCalories = ((currentItem.calories / currentItem.weightPerServing) * newWeight).toFixed(2);
      updatedItems[index] = {
        ...currentItem,
        inputWeight: newWeight,
        calculatedCalories: newCalories,
      };
      return updatedItems;
    });
  };

  // Xóa món ăn khỏi danh sách
  const handleRemoveItem = (index) => {
    setSelectedItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      setIsCalorieLimitExceeded(false); // Reset cảnh báo calo khi xóa món
      return updatedItems;
    });
  };

  // Tính tổng calo đã chọn
  const calculateTotalCalories = () => {
    return selectedItems.reduce((total, item) => total + parseFloat(item.calculatedCalories || 0), 0).toFixed(2);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.mainBackgroundColor }]}>
      <View style={styles.caloriesInfo}>
        <Text style={[styles.sectionHeader, { color: theme.textColor }]}>Thông tin Calo:</Text>
        <Text style={{ color: theme.textColor }}>Tổng Calo mỗi ngày: {caloriesInfo.totalCalories}</Text>
        <Text style={{ color: theme.textColor }}>Calo Bữa sáng: {caloriesInfo.breakfastCalories}</Text>
        <Text style={{ color: theme.textColor }}>Calo Bữa trưa: {caloriesInfo.lunchCalories}</Text>
        <Text style={{ color: theme.textColor }}>Calo Bữa tối: {caloriesInfo.dinnerCalories}</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Hôm nay bạn muốn ăn gì...?"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={() => fetchIngredients(searchQuery)}
      />

      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.searchResult, isCalorieLimitExceeded && styles.disabledItem]}
            onPress={() => handleAddItem(item)}
            disabled={isCalorieLimitExceeded}
          >
            <View style={styles.resultContent}>
              {item.image && <Image source={{ uri: item.image }} style={styles.resultImage} />}
              <View style={styles.resultDetails}>
                <Text style={styles.resultText}>{item.name}</Text>
                <Text style={styles.resultText}>Danh mục: {item.category}</Text>
                <Text style={styles.resultText}>Calo: {item.calories} kcal</Text>
                <Text style={styles.resultText}>Khối lượng: {item.weightPerServing} {item.unit}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedItems.length > 0 && (
        <View style={styles.selectedItemsContainer}>
          <Text style={styles.sectionHeader}>Món đã chọn</Text>
          {selectedItems.map((item, index) => (
            <View key={index} style={styles.selectedItemRow}>
              <Text style={[styles.resultText, styles.fixedWidth]}>{item.name}</Text>
              <TextInput
                style={[styles.weightInput, styles.fixedWidth]}
                keyboardType="numeric"
                value={item.inputWeight.toString()}
                onChangeText={(value) => handleWeightChange(index, parseFloat(value) || 0)}
              />
              <Text style={[styles.resultText, styles.fixedWidth]}>{item.calculatedCalories} kcal</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(index)}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.totalCalories}>Tổng calo đã chọn: {calculateTotalCalories()} kcal</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  caloriesInfo: { padding: 10, backgroundColor: '#f8f8f8', borderRadius: 5, marginBottom: 20 },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchResult: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  disabledItem: { opacity: 0.6 },
  resultContent: { flexDirection: 'row', alignItems: 'center' },
  resultImage: { width: 50, height: 50, marginRight: 10, borderRadius: 5 },
  resultDetails: { flex: 1 },
  resultText: { fontSize: 16 },
  selectedItemsContainer: { marginTop: 20 },
  selectedItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  weightInput: {
    height: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  fixedWidth: {
    flex: 1,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalCalories: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginTop: 10 },
});