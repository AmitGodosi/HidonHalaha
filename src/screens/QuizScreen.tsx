import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";

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
      <Text style={styles.question}>
        {sampleQuestions[currentQuestion].question}
      </Text>
      {sampleQuestions[currentQuestion].options.map((option, index) => (
        <Button
          key={index}
          title={option}
          onPress={() => handleAnswer(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
});
