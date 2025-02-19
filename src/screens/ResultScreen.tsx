
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native';

export const ResultScreen = ({ navigation, route }) => {
  const { score, totalQuestions } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete!</Text>
      <Text style={styles.score}>
        Your Score: {score}/{totalQuestions}
      </Text>
      <Button
        title="Play Again"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 30,
  },
});
