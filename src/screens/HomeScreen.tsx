
import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const categories: Category[] = [
  {
    id: "1",
    name: "History",
    icon: "book-open-page-variant",
    subcategories: ["Ancient", "Modern", "World Wars"],
  },
  {
    id: "2",
    name: "Science",
    icon: "flask",
    subcategories: ["Physics", "Biology", "Chemistry"],
  },
  { 
    id: "3", 
    name: "Movies", 
    icon: "movie",
    subcategories: ["Action", "Comedy", "Sci-Fi"] 
  },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate("Quiz", { category: item })}
    >
      <MaterialCommunityIcons name={item.icon as any} size={24} color="#4A90E2" />
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
    backgroundColor: '#F5F6F8',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  categoryItem: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 18,
    marginLeft: 12,
    color: '#2C3E50',
  },
});
