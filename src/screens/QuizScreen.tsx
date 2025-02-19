import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  source: string; // Added source property
}

type QuizScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Quiz">;
  route: RouteProp<RootStackParamList, "Quiz">;
};

const sampleQuestions: Question[] = [
  {
    id: "1",
    question: "מתי מותר להחזיר סיר לפלטה בשבת?",
    options: ["תמיד מותר", "רק כשהתבשיל עדיין חם", "אסור בכל מקרה", "רק אם הפלטה מכוסה"],
    correctAnswer: 1,
    source: "שולחן ערוך אורח חיים סימן רנג סעיף ב",
  },
  {
    id: "2",
    question: "כמה זמן צריך להמתין בין בשר לחלב?",
    options: ["שעה אחת", "שלוש שעות", "שש שעות", "שתים עשרה שעות"],
    correctAnswer: 2,
    source: "שולחן ערוך יורה דעה סימן פט סעיף א",
  },
  {
    id: "3",
    question: "מהו הזמן המאוחר ביותר לתפילת שחרית?",
    options: ["חצות היום", "שעה רביעית", "סוף היום", "עלות השחר"],
    correctAnswer: 1,
    source: "משנה ברכות",
  },
  {
    id: "4",
    question: "איזה ברכה מברכים על פיתה?",
    options: ["המוציא לחם", "מזונות", "שהכל", "בורא פרי האדמה"],
    correctAnswer: 0,
    source: "משנה ברכות",
  },
  // Add 9 more questions here...  (This is a placeholder, add actual questions)
  { id: "5", question: "Question 5?", options: ["A", "B", "C", "D"], correctAnswer: 0, source: "Source 5" },
  { id: "6", question: "Question 6?", options: ["A", "B", "C", "D"], correctAnswer: 1, source: "Source 6" },
  { id: "7", question: "Question 7?", options: ["A", "B", "C", "D"], correctAnswer: 2, source: "Source 7" },
  { id: "8", question: "Question 8?", options: ["A", "B", "C", "D"], correctAnswer: 3, source: "Source 8" },
  { id: "9", question: "Question 9?", options: ["A", "B", "C", "D"], correctAnswer: 0, source: "Source 9" },
  { id: "10", question: "Question 10?", options: ["A", "B", "C", "D"], correctAnswer: 1, source: "Source 10" },
  { id: "11", question: "Question 11?", options: ["A", "B", "C", "D"], correctAnswer: 2, source: "Source 11" },
  { id: "12", question: "Question 12?", options: ["A", "B", "C", "D"], correctAnswer: 3, source: "Source 12" },
  { id: "13", question: "Question 13?", options: ["A", "B", "C", "D"], correctAnswer: 0, source: "Source 13" },
  { id: "14", question: "Question 14?", options: ["A", "B", "C", "D"], correctAnswer: 1, source: "Source 14" },

];

export const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }: QuizScreenProps) => {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [showSourcePopup, setShowSourcePopup] = useState(false);


  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const storedQuestions = await AsyncStorage.getItem('questions');
        if (storedQuestions) {
          setQuestions(JSON.parse(storedQuestions));
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };
    loadQuestions();
  }, []);

  const handleAnswer = (selectedOption: number): void => {
    setSelectedAnswer(selectedOption);
    setShowFeedback(true);

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowSourcePopup(true);
    }, 1000);
  };

  const handleNext = () => {
    setShowSourcePopup(false);
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate("Result", { score, totalQuestions: questions.length });
    }
  };

  const handleEndGame = () => {
    navigation.navigate("Result", { score, totalQuestions: questions.length });
  };

  const getOptionStyle = (index: number): StyleProp<ViewStyle> => {
    if (!showFeedback) return styles.optionButton;

    if (index === questions[currentQuestion].correctAnswer) {
      return [styles.optionButton, styles.correctOption];
    }

    if (index === selectedAnswer && index !== questions[currentQuestion].correctAnswer) {
      return [styles.optionButton, styles.wrongOption];
    }

    return styles.optionButton;
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="help-circle" size={48} color="#4A90E2" style={styles.icon} />
      <Text style={styles.question}>
        {questions[currentQuestion].question}
      </Text>
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={getOptionStyle(index)}
          onPress={() => handleAnswer(index)}
          disabled={showFeedback}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {showSourcePopup && (
        <View style={styles.popup}>
          <View style={styles.popupContent}>
            <Text style={styles.sourceText}>מקור: {questions[currentQuestion].source}</Text>
            <View style={styles.popupButtons}>
              <TouchableOpacity style={styles.popupButton} onPress={handleNext}>
                <Text style={styles.popupButtonText}>המשך לשאלה הבאה</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.popupButton} onPress={handleEndGame}>
                <Text style={styles.popupButtonText}>סיים משחק</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F6F8',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    color: '#2C3E50',
    fontWeight: '600',
  },
  optionButton: {
    width: '100%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
  },
  correctOption: {
    backgroundColor: '#90EE90', // Light Green
  },
  wrongOption: {
    backgroundColor: '#FF6347', // Tomato Red
  },
  popup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  sourceText: {
    fontSize: 16,
    marginBottom: 10,
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  popupButton: {
    padding: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 5,
    margin: 5,
  },
  popupButtonText: {
    color: '#fff',
  },
});