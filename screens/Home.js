import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import {
	StyleSheet,
	Button,
	Text,
	View,
	FlatList,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import Patient from "../components/Patient";
import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";
import PatientDatabase from "../components/PatientDatabase";

const Home = ({ navigation }) => {
	const db = SQLite.openDatabase("example.db");
	const [isLoading, setIsLoading] = useState(true);
	const [patients, setPatients] = useState([]);
	const [currentName, setCurrentName] = useState(undefined);

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

	const showPatients = () => {
		return patients.map((patient, index) => {
			return (
				<View key={index} style={styles.patient}>
					<Text>Name: {patient.name}</Text>
				</View>
			);
		});
	};

	const handleDrop = () => {
		db.transaction((tx) => {
			tx.executeSql(
				"DROP TABLE patients",
				null,
				(txObj, resultSet) => console.log(resultSet),
				(txObj, error) => console.log(error)
			);
		});
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.container}>
				<StatusBar style="auto" />
				<View style={styles.patientsWrapper}>
					<Text style={styles.sectionTitle}>My Patients</Text>

					{/* <PatientForm submitHandler={submitHandler} /> */}
					<View style={styles.list}>{showPatients()}</View>
				</View>
				<Button title="Reset" onPress={handleDrop} />
				<Button
					title="Register a patient"
					onPress={() => navigation.navigate("Registration")}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e8eaed",
	},
	patientsWrapper: {
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
});

export default Home;
