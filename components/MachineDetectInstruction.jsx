import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card } from 'react-native-elements';
import { useTheme } from '../context/ThemeContext';

export default function MachineDetectInstruction() {
  const { theme } = useTheme();

  return (
    <View>
      <Card
        title="Cấp độ Người mới bắt đầu"
        containerStyle={[
          styles.instructionCardContainer,
          {
            backgroundColor: theme.backgroundColor,
          },
        ]}>
        <Text style={{ fontSize: 13, fontWeight: '500' }}>
          Bước 1: Chọn hình ảnh từ phương tiện bằng cách nhấn
          <TouchableOpacity activeOpacity={0.6} style={styles.buttonStyle}>
            <Text
              style={[
                styles.buttonTitleStyle,
                {
                  color: theme.textColor,
                },
              ]}>
              {' '}
              CHỌN HÌNH ẢNH{' '}
            </Text>
          </TouchableOpacity>{' '}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '500' }}>
          Bước 2: Tải lên hình ảnh lên máy chủ bằng cách nhấn
          <TouchableOpacity activeOpacity={0.6} style={styles.buttonStyle}>
            <Text
              style={[
                styles.buttonTitleStyle,
                {
                  color: theme.textColor,
                },
              ]}>
              {' '}
              PHÁT HIỆN MÁY{' '}
            </Text>
          </TouchableOpacity>
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '500' }}>
          Bước 3: Làm theo hướng dẫn được cung cấp trên máy
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#F1BE48',
    borderRadius: 7.5,
    borderColor: 'grey',
    borderBottomWidth: 3,
    elevation: 11,
  },
  buttonTitleStyle: {
    color: 'white',
    fontWeight: '600',
  },
  instructionCardContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 20,
    elevation: 10,
  },
});
