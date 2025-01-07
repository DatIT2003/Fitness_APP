import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import CommonHeader from '../components/CommonHeader';

const ChatBot = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const scrollViewRef = useRef();

  const COHERE_API_KEY = process.env.EXPO_COHERE_API_KEY; // 
  const COHERE_URL = 'https://api.cohere.ai/v1/generate'; // URL API Cohere

  const addMessage = (author, content) => {
    setMessages((prevMessages) => [...prevMessages, { author, content }]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const getResponse = async () => {
    if (!text.trim()) return;

    addMessage('You', text);
    setText('');
    setIsLoading(true);

    // Kiểm tra câu hỏi về chế độ ăn uống
    if (text.toLowerCase().includes("eat") || text.toLowerCase().includes("diet") || text.toLowerCase().includes("meal")) {
      addMessage('Bot', 'For a healthy diet, I recommend eating balanced meals with lean proteins, whole grains, and plenty of vegetables.');
      setIsLoading(false);
      return;
    }

    // Kiểm tra câu hỏi về chế độ tập luyện
    if (text.toLowerCase().includes("exercise") || text.toLowerCase().includes("workout") || text.toLowerCase().includes("fitness")) {
      addMessage('Bot', 'For an effective workout, focus on strength training 3-4 times a week and include cardio exercises.');
      setIsLoading(false);
      return;
    }

    // Kiểm tra xem người dùng có yêu cầu nói tiếng Việt không
    if (text.toLowerCase().includes("can you speak vietnamese") || text.toLowerCase().includes("bạn có thể nói tiếng việt không")) {
      addMessage('Bot', 'Vâng, tôi có thể nói tiếng Việt!');
      setIsLoading(false);
      return;
    }

    // Tạo prompt yêu cầu trả lời ngắn gọn và trọng tâm
    const prompt = `Please provide a short and focused response to the following question: ${text}`;

    try {
      // Gửi yêu cầu tới Cohere API
      const response = await fetch(COHERE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${COHERE_API_KEY}`, // API Key từ Cohere
        },
        body: JSON.stringify({
          model: 'command-xlarge-nightly', // Chọn model của Cohere
          prompt: prompt,
          max_tokens: 100,  // Giới hạn số lượng token trong phản hồi
          temperature: 0.7,  // Điều chỉnh mức độ ngẫu nhiên của câu trả lời
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Cohere API.');
      }

      const data = await response.json();
      const botResponse = data.generations[0].text.trim(); // Làm sạch kết quả trả về

      // Trả lời ngắn gọn và trọng tâm
      addMessage('Bot', botResponse);

    } catch (error) {
      addMessage('Bot', 'Sorry, something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.mainBackgroundColor }]}>
      <CommonHeader title="AI ChatBot" navigation={navigation} style={{ marginRight: 20 }} />
      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={[styles.contentContainer, { backgroundColor: theme.backgroundColor }]}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={message.author === 'You' ? styles.userMessageContainer : styles.botMessageContainer}>
              <Text style={message.author === 'You' ? styles.userMessage : styles.botMessage}>
                {message.author === 'You' ? 'You: ' : 'Bot: '}
                {message.content}
              </Text>
            </View>
          ))}
          {isLoading && (
            <View style={styles.botMessageContainer}>
              <Text style={styles.botMessage}>Typing...</Text>
            </View>
          )}
        </ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
          <View style={[styles.inputContainer, { backgroundColor: theme.backgroundColor }]}>
            <TextInput
              style={[styles.textInput, { backgroundColor: theme.backgroundColor }]}
              value={text}
              onChangeText={setText}
              placeholder="Type your message..."
            />
            <TouchableOpacity style={styles.sendButton} onPress={getResponse}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  chatContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  userMessageContainer: {
    marginBottom: 10,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    backgroundColor: '#F1BE48',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  botMessageContainer: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  userMessage: {
    color: 'black',
    fontWeight: 'bold',
  },
  botMessage: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#F1BE48',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'black',
    fontWeight: '900',
  },
});

export default ChatBot;
