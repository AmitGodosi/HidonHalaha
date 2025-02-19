import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ResultScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Result">;
  route: RouteProp<RootStackParamList, "Result">;
};

export const ResultScreen: React.FC<ResultScreenProps> = ({ navigation, route }: ResultScreenProps) => {
  const { score } = route.params;
  const totalQuestions = 10;

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons 
        name={score > totalQuestions/2 ? "trophy" : "trophy-outline"} 
        size={80} 
        color="#4A90E2" 
      />
      <Text style={styles.title}>המבחן הסתיים!</Text>
      <Text style={styles.score}>
        הציון שלך: {score}/{totalQuestions}
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialCommunityIcons name="replay" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>שחק שוב</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F5F6F8',
  },
  title: {
    fontSize: 32,
    marginVertical: 20,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  score: {
    fontSize: 24,
    marginBottom: 30,
    color: '#4A90E2',
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    padding: 16,
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: '600',
  },
});