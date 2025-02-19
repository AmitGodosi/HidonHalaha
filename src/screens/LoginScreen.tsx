import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type LoginScreenProps = {
	navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }: LoginScreenProps) => {
	const [email, setEmail] = useState<string>("");

	const handleLogin = async (): Promise<void> => {
		try {
			await AsyncStorage.setItem("user", JSON.stringify({ email }));
			navigation.replace("Home");
		} catch (error) {
			Alert.alert("Error", "Login failed");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={styles.input}
				placeholder="User Name"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
			/>
			<Button title="Login" onPress={handleLogin} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		padding: 10,
	},
});
