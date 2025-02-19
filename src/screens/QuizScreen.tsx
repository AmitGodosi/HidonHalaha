
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

type QuizScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Quiz">;
  route: RouteProp<RootStackParamList, "Quiz">;
};

const sampleQuestions: Question[] = [
  {
    id: "1",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
];

export const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }: QuizScreenProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const handleAnswer = (selectedOption: number): void => {
    if (selectedOption === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate("Result", { score });
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="help-circle" size={48} color="#4A90E2" style={styles.icon} />
      <Text style={styles.question}>
        {sampleQuestions[currentQuestion].question}
      </Text>
      {sampleQuestions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleAnswer(index)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
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
});
