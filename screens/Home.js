import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import {
	Keyboard,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import PatientList from "../components/PatientList";

const Home = ({ navigation }) => {
	const db = SQLite.openDatabase("example.db");
	const [isLoading, setIsLoading] = useState(true);
	const [patients, setPatients] = useState([]);

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS patients (
					id INTEGER PRIMARY KEY AUTOINCREMENT, 
					name TEXT,
					age INTEGER, 
					contact_number TEXT, 
					allergy_history TEXT, 
					medical_history TEXT,
					medication TEXT,
					problem TEXT,
					treatment_plan TEXT
				)`
			);
		});

		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM patients",
				null,
				(txObj, resultSet) => setPatients(resultSet.rows._array),
				(txObj, error) => console.log(error)
			);

			setIsLoading(false);
		});
	}, [patients]);

	if (isLoading) {
		return (
			<View styles={styles.container}>
				<Text>Loading patients...</Text>
			</View>
		);
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.container}>
				<StatusBar style="auto" />
				<View style={styles.contentWrapper}>
					<View style={styles.list}>
						<Text style={styles.sectionTitle}>My Patients</Text>
						<PatientList patients={patients} navigation={navigation} />
					</View>
					<View style={styles.spacing}></View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f1f2ff",
		paddingBottom: 50,
	},
	contentWrapper: {
		flex: 1,
		paddingTop: 40,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		marginBottom: 16,
		fontSize: 24,
		fontWeight: "bold",
	},
	patient: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderWidth: 1,
	},
	list: {
		flex: 1,
		paddingBottom: 10,
	},
	spacing: {
		flex: 0.3,
		padding: 5,
	},
});

export default Home;
