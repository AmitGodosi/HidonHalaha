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
			const isAdmin = email.toLowerCase() === 'admin';
			await AsyncStorage.setItem("user", JSON.stringify({ email, isAdmin }));
			navigation.replace(isAdmin ? "Admin" : "Home");
		} catch (error) {
			Alert.alert("שגיאה", "התחברות נכשלה");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>כניסה</Text>
			<TextInput
				style={styles.input}
				placeholder="שם משתמש"
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
