
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const AdminScreen = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleOptionChange = (text: string, index: number) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question || options.some(opt => !opt)) {
      Alert.alert('שגיאה', 'נא למלא את כל השדות');
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      question,
      options,
      correctAnswer,
    };

    try {
      const existingQuestions = await AsyncStorage.getItem('questions');
      const questions = existingQuestions ? JSON.parse(existingQuestions) : [];
      questions.push(newQuestion);
      await AsyncStorage.setItem('questions', JSON.stringify(questions));
      
      // Reset form
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(0);
      
      Alert.alert('הצלחה', 'השאלה נוספה בהצלחה');
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בשמירת השאלה');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>הוספת שאלה חדשה</Text>
      
      <TextInput
        style={styles.questionInput}
        placeholder="הכנס שאלה"
        value={question}
        onChangeText={setQuestion}
        multiline
      />

      {options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <TextInput
            style={styles.optionInput}
            placeholder={`אפשרות ${index + 1}`}
            value={option}
            onChangeText={(text) => handleOptionChange(text, index)}
          />
          <TouchableOpacity
            style={[
              styles.radioButton,
              correctAnswer === index && styles.radioButtonSelected
            ]}
            onPress={() => setCorrectAnswer(index)}
          >
            <MaterialCommunityIcons
              name={correctAnswer === index ? "radiobox-marked" : "radiobox-blank"}
              size={24}
              color="#4A90E2"
            />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>הוסף שאלה</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F6F8',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  questionInput: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  radioButton: {
    padding: 5,
  },
  radioButtonSelected: {
    backgroundColor: '#E8F0FE',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
