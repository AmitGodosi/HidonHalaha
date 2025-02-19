import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const categories: Category[] = [
  {
    id: "1",
    name: "History",
    subcategories: ["Ancient", "Modern", "World Wars"],
  },
  {
    id: "2",
    name: "Science",
    subcategories: ["Physics", "Biology", "Chemistry"],
  },
  { id: "3", name: "Movies", subcategories: ["Action", "Comedy", "Sci-Fi"] },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate("Quiz", { category: item })}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Category</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  categoryItem: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 18,
  },
});
