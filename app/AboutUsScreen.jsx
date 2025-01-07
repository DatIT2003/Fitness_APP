import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../context/ThemeContext';
import CommonHeader from '../components/CommonHeader';

const AboutUsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const openGitHubProfile = (profileUrl) => {
    Linking.openURL(profileUrl);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.mainBackgroundColor },
      ]}>
      <CommonHeader
        title="Giới thiệu"
        navigation={navigation}
        style={{
          marginTop: 35,
          marginRight: 20,
          marginLeft: -15,
          marginBottom: 20,
        }}
      />
      <Text style={[styles.description, { color: theme.textColor }]}>
        Chào mừng bạn đến với ứng dụng thể dục của chúng tôi! Chúng tôi cam kết giúp bạn đạt được mục tiêu thể dục của mình thông qua các tính năng đổi mới và khuyến nghị cá nhân hóa.
      </Text>
      <Text style={[styles.head, { color: theme.textColor }]}>
        Các tính năng của ứng dụng bao gồm:
      </Text>
      <Text style={[styles.feature, { color: theme.textColor }]}>
        1. Tính năng Camera Thông minh:
      </Text>
      <Text style={[styles.featureDescription, { color: theme.textColor }]}>
        Tính năng camera thông minh cho phép bạn chụp hoặc tải lên một bức ảnh của bất kỳ máy tập gym nào, và nó sẽ cung cấp thông tin về cách sử dụng máy tập, lợi ích của nó và khuyến nghị các bài tập bạn có thể thực hiện với nó.
      </Text>
      <Text style={[styles.feature, { color: theme.textColor }]}>
        2. Khuyến nghị chế độ ăn uống:
      </Text>
      <Text style={[styles.featureDescription, { color: theme.textColor }]}>
        Nhận khuyến nghị chế độ ăn uống cá nhân hóa phù hợp với mục tiêu thể dục và sở thích ăn uống của bạn. Dù bạn đang tìm cách giảm cân, tăng cơ hay duy trì lối sống lành mạnh, ứng dụng của chúng tôi cung cấp hướng dẫn dinh dưỡng để hỗ trợ hành trình của bạn.
      </Text>
      <Text style={[styles.feature, { color: theme.textColor }]}>
        3. Khuyến nghị bài tập:
      </Text>
      <Text style={[styles.featureDescription, { color: theme.textColor }]}>
        Nhận khuyến nghị bài tập tùy chỉnh dựa trên mức độ thể dục, sở thích và mục tiêu của bạn. Dù bạn là người mới bắt đầu hay một vận động viên có kinh nghiệm, ứng dụng của chúng tôi cung cấp nhiều chế độ tập luyện khác nhau để giúp bạn duy trì động lực và đạt được kết quả.
      </Text>
      <Text
        style={{
          color: theme.textColor,
          fontSize: 17,
          textAlign: 'center',
          marginBottom: 3,
        }}>
        Được xây dựng bởi
      </Text>
      <View style={styles.credits}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => openGitHubProfile('https://github.com/DatIT2003/')}>
            <Image
              source={require('../assets/icons/meme.jpg')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={{ color: theme.textColor, textAlign: 'center' }}>
              Văn Đạt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openGitHubProfile('https://github.com/vulee98')}>
            <Image
              source={require('../assets/icons/m1.jpg')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={{ color: theme.textColor, textAlign: 'center' }}>
              Văn Vũ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openGitHubProfile('https://github.com/')}>
            <Image
              source={require('../assets/icons/m2.jpg')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={{ color: theme.textColor, textAlign: 'center' }}>
              Ngọc Tùng
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openGitHubProfile('https://github.com/')}>
            <Image
              source={require('../assets/icons/m3.jpg')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={{ color: theme.textColor, textAlign: 'center' }}>
              Anh Tuấn
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.contact, { color: theme.textColor, fontSize: 17 }]}>
        Nếu có bất kỳ câu hỏi hoặc phản hồi nào, vui lòng liên hệ với chúng tôi qua{' '}
        <Text
          style={{ color: '#dc9e11', fontWeight: '900' }}
          onPress={() => Linking.openURL('mailto:nguyenvandat2033@gmail.com')}>
          nguyenvandat2033@gmail.com'
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  feature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: hp(2.5),
  },
  featureDescription: {
    fontSize: wp(4.5),
    marginLeft: wp(7),
    marginBottom: wp(4),
  },
  credits: {
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
    marginRight: 5,
  },
  contact: {
    fontSize: wp(3.8),
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default AboutUsScreen;
