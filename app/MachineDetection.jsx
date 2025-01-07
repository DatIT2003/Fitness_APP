import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import MachineDetectInstruction from '../components/MachineDetectInstruction';
import { useTheme } from '../context/ThemeContext';
import CommonHeader from '../components/CommonHeader';
import { ScrollView } from 'react-native-gesture-handler';

// Thay bằng API KEY của bạn
const GEMINI_API_KEY = process.env.EXPO_GEMINI_API_KEY;

export default function MachineDetection() {
  const [image, setImage] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { theme } = useTheme();
  const navigation = useNavigation();

  // Yêu cầu quyền truy cập thư viện ảnh
  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Xin lỗi', 'Chúng tôi cần quyền truy cập thư viện ảnh');
        return false;
      }
      return true;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImage(selectedImage.uri);
      setClassificationResult(null);
      setIsImageSelected(true);
    }
  };

  const detectMachine = async () => {
    if (!image) {
      Alert.alert('Thông báo', 'Vui lòng chọn ảnh trước');
      return;
    }

    setIsLoading(true);
    try {
      const base64Image = await convertImageToBase64(image);
      
      if (!base64Image) {
        throw new Error('Không thể chuyển đổi ảnh');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                { 
                  text: `Bạn là chuyên gia phân tích dụng cụ phòng gym. 
                  Hãy phân tích kỹ hình ảnh này và cung cấp thông tin chi tiết về máy tập như sau:

                  1. Tên máy tập chính xác
                  2. Mức độ khó (Dễ/Trung Bình/Khó)
                  3. Mô tả ngắn về máy tập
                  4. Hướng dẫn sử dụng chi tiết
                  5. Các nhóm cơ chính được tập
                  6. Khuyến cáo số lần lặp và số hiệp cho từng cấp độ
                  
                  Trả lời ngắn gọn, chính xác và dễ hiểu.`
                },
                {
                  inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Image
                  }
                }
              ]
            }]
          })
        }
      );

      const responseData = await response.json();
      
      // Kiểm tra và trích xuất kết quả
      const machineInfoText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text || 'Không thể nhận diện';
      
      setClassificationResult(machineInfoText);
      setBottomSheetVisible(true);
    } catch (error) {
      console.error('Lỗi nhận diện:', error);
      Alert.alert('Lỗi', 'Không thể nhận diện dụng cụ');
    } finally {
      setIsLoading(false);
    }
  };

  // Chuyển đổi hình ảnh sang base64
  const convertImageToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result.split(',')[1];
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Lỗi chuyển đổi ảnh:', error);
      return null;
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.mainBackgroundColor }]}>
      <CommonHeader title="Nhận diện dụng cụ" navigation={navigation} />

      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.buttonContainer}>
        <View style={styles.horizontalButtons}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={pickImage}
            style={styles.buttonStyle}>
            <Text
              style={[
                styles.buttonTitleStyle,
                { color: theme.textColor },
              ]}>
              CHỌN ẢNH
            </Text>
          </TouchableOpacity>
          {isImageSelected && (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={detectMachine}
              style={styles.buttonStyle}
              disabled={isLoading}>
              <Text
                style={[
                  styles.buttonTitleStyle,
                  { color: theme.textColor },
                ]}>
                {isLoading ? 'ĐANG NHẬN DIỆN...' : 'NHẬN DIỆN DỤNG CỤ'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <MachineDetectInstruction />
      </View>
      <Modal
        isVisible={bottomSheetVisible}
        style={styles.bottomModal}
        swipeDirection={['down']}
        onSwipeComplete={() => setBottomSheetVisible(false)}
        onBackdropPress={() => setBottomSheetVisible(false)}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.mainBackgroundColor },
          ]}>
          {classificationResult && ( <>
              <Text
                style={[
                  styles.result,
                  { color: theme.textColor },
                ]}>
                Chi Tiết Dụng Cụ
              </Text>
              <ScrollView>
                <Text
                  style={[
                    styles.machineInfoText,
                    { color: theme.textColor },
                  ]}>
                  {classificationResult}
                </Text>
              </ScrollView>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 5,
  },
  image: {
    width: wp(90),
    height: hp(40),
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
    borderColor: '#333',
    borderWidth: 3,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: 'purple',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderBottomColor: 'black',
    borderColor: 'grey',
    borderBottomWidth: 3,
    elevation: 11,
  },
  buttonTitleStyle: {
    color: 'white',
    fontWeight: '600',
  },
  horizontalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  machineInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold', // In đậm tên dụng cụ
    marginBottom: 10,
    textAlign: 'center',
  },
  machineInfoText: {
    fontSize: 14,
    marginTop: 2,
    lineHeight: 20, // Tăng khoảng cách giữa các dòng cho dễ đọc
  },
});