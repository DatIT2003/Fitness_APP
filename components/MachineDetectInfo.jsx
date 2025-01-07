import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function MachineDetectInfo(classificationResult) {
  const getMachineDetails = (machineName) => {
    switch (machineName) {
      case 'lat-pull-down':
        return {
          name: 'Lat Pull Down',
          difficulty: 'Trung cấp',
          description: 'Phát triển và tăng cường cơ lưng trên.',
          instructions:
            'Ngồi vào máy và điều chỉnh đệm đầu gối. Nắm thanh kéo với tay cầm úp và kéo xuống ngực. Từ từ trở lại vị trí ban đầu.',
          targetMuscles: 'Cơ lưng trên',
          beginner: { reps: 12, sets: 3, weight: 'Nhẹ' },
          intermediate: { reps: 10, sets: 4, weight: 'Vừa' },
          expert: { reps: 8, sets: 5, weight: 'Nặng' },
        };
      case 'chest-press':
        return {
          name: 'Chest Press',
          difficulty: 'Dễ',
          description: 'Nhắm vào cơ ngực, cơ vai và cơ tam đầu.',
          instructions:
            'Ngồi hoặc nằm trên máy. Nắm tay cầm và đẩy về phía trước. Từ từ trở lại vị trí ban đầu.',
          targetMuscles: 'Cơ ngực, cơ vai, cơ tam đầu',
          beginner: { reps: 15, sets: 3, weight: 'Nhẹ' },
          intermediate: { reps: 12, sets: 4, weight: 'Vừa' },
          expert: { reps: 10, sets: 5, weight: 'Nặng' },
        };
      case 'chest-fly':
        return {
          name: 'Chest Fly',
          difficulty: 'Trung cấp',
          description: 'Cô lập và phát triển cơ ngực.',
          instructions:
            'Ngồi trên máy và điều chỉnh tay cầm. Kéo hai tay cầm lại phía trước, sau đó từ từ trở lại vị trí ban đầu.',
          targetMuscles: 'Cơ ngực',
          beginner: { reps: 12, sets: 3, weight: 'Nhẹ' },
          intermediate: { reps: 10, sets: 4, weight: 'Vừa' },
          expert: { reps: 8, sets: 5, weight: 'Nặng' },
        };
      case 'leg-press':
        return {
          name: 'Leg Press',
          difficulty: 'Khó',
          description: 'Nhắm vào cơ chân, bao gồm cơ đùi trước và cơ hamstring.',
          instructions:
            'Ngồi trên máy và đặt chân lên bệ. Đẩy bệ ra xa, duỗi thẳng chân. Từ từ trở lại vị trí ban đầu.',
          targetMuscles: 'Cơ đùi trước, cơ hamstring',
          beginner: { reps: 10, sets: 3, weight: 'Nhẹ' },
          intermediate: { reps: 8, sets: 4, weight: 'Vừa' },
          expert: { reps: 6, sets: 5, weight: 'Nặng' },
        };
      default:
        return {};
    }
  };

  return (
    <View style={styles.modalContent}>
      {classificationResult && (
        <>
          <Text style={styles.result}>
            Máy được nhận diện: {classificationResult}
          </Text>
          {classificationResult && (
            <View>
              <Text style={styles.machineInfoTitle}>Thông tin máy tập:</Text>
              {getMachineDetails(classificationResult) && (
                <>
                  <Text style={styles.machineInfoLabel}>Tên:</Text>
                  <Text style={styles.machineInfoText}>
                    {getMachineDetails(classificationResult).name}
                  </Text>
                  <Text style={styles.machineInfoLabel}>Mức độ khó:</Text>
                  <Text style={styles.machineInfoText}>
                    {getMachineDetails(classificationResult).difficulty}
                  </Text>
                  <Text style={styles.machineInfoLabel}>Mô tả:</Text>
                  <Text style={styles.machineInfoText}>
                    {getMachineDetails(classificationResult).description}
                  </Text>
                  <Text style={styles.machineInfoLabel}>Hướng dẫn:</Text>
                  <Text style={styles.machineInfoText}>
                    {getMachineDetails(classificationResult).instructions}
                  </Text>
                  <Text style={styles.machineInfoLabel}>Cơ bắp mục tiêu:</Text>
                  <Text style={styles.machineInfoText}>
                    {getMachineDetails(classificationResult).targetMuscles}
                  </Text>
                </>
              )}
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  machineInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  machineInfoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  machineInfoText: {
    fontSize: 14,
    marginTop: 2,
  },
});
