
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Result">;
  route: RouteProp<RootStackParamList, "Result">;
};

export const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { score } = route.params;
  const totalQuestions = 10; // You might want to pass this as a parameter

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete!</Text>
      <Text style={styles.score}>
        Your Score: {score}/{totalQuestions}
      </Text>
      <Button title="Play Again" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
