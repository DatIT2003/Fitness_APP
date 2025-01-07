import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(require('../assets/icons/avatar.png'));

  const updateAvatar = async (uri) => {
    try {
      await AsyncStorage.setItem('avatarURI', JSON.stringify(uri)); // Chuyển URI thành chuỗi
      setAvatar(uri);
    } catch (error) {
      console.error('Lỗi khi lưu URI avatar:', error);
    }
  };

  return (
    <AvatarContext.Provider value={{ avatar, updateAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar phải được sử dụng trong AvatarProvider');
  }
  return context;
};
