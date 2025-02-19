import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native";

const sampleQuestions = [
  {
    id: "1",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  // Add more sample questions
];

export const QuizScreen = ({ navigation, route }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedOption) => {
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
          style={styles.optionButton}
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
  optionButton: {
    marginBottom: 10,
  },
});
