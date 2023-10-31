import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import {
	Button,
	Keyboard,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Registration = ({ navigation }) => {
	const db = SQLite.openDatabase("example.db");
	const [isLoading, setIsLoading] = useState(true);
	const [patients, setPatients] = useState([]);
	const [currentName, setCurrentName] = useState(undefined);
	const [currentAge, setCurrentAge] = useState(undefined);
	const [currentContactNumber, setCurrentContactNumber] = useState(undefined);
	const [currentAllergyHistory, setCurrentAllergyHistory] = useState(undefined);
	const [currentMedicalHistory, setCurrentMedicalHistory] = useState(undefined);
	const [currentMedication, setCurrentMedication] = useState(undefined);
	const [currentProblem, setCurrentProblem] = useState(undefined);
	const [currentTreatmentPlan, setCurrentTreatmentPlan] = useState(undefined);

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
	}, []);

	const addPatient = () => {
		db.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO patients (
					name, 
					age,
					contact_number,
					allergy_history,
					medical_history,
					medication,
					problem,
					treatment_plan
				) values (?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					currentName,
					currentAge,
					currentContactNumber,
					currentAllergyHistory,
					currentMedicalHistory,
					currentMedication,
					currentProblem,
					currentTreatmentPlan,
				],
				(txObj, resultSet) => {
					let existingPatients = [...patients];
					existingPatients.push({
						id: resultSet.insertId,
						name: currentName,
						age: currentAge,
						contact_number: currentContactNumber,
						allergy_history: currentAllergyHistory,
						medical_history: currentMedicalHistory,
						medication: currentMedication,
						problem: currentProblem,
						treatment_plan: currentTreatmentPlan,
					});
					setPatients(existingPatients);
				},
				(txObj, error) => console.log(error)
			);
		});
	};

	const deletePatient = (id) => {
		db.transaction((tx) => {
			tx.executeSql(
				"DELETE FROM patients WHERE id = ?",
				[id],
				(txObj, resultSet) => {
					if (resultSet.rowsAffected > 0) {
						let existingPatients = [...patients].filter(
							(patient) => patient.id !== id
						);
						setPatients(existingPatients);
					}
				},
				(txObj, error) => console.log(error)
			);
		});
	};

	const updatePatient = (id) => {
		db.transaction((tx) => {
			tx.executeSql(
				`UPDATE patients SET 
					name = ?,
					age = ?,
					contact_number = ?,
					allergy_history = ?,
					medical_history = ?,
					medication = ?,
					problem = ?,
					treatment_plan = ?
					WHERE id = ?`,
				[currentName, id],
				(txObj, resultSet) => {
					if (resultSet.rowsAffected > 0) {
						let existingPatients = [...patients];
						const indexToUpdate = existingPatients.findIndex(
							(patient) => patient.id === id
						);
						existingPatients[indexToUpdate].name = currentName;
						existingPatients[indexToUpdate].age = currentAge;
						existingPatients[indexToUpdate].contact_number =
							currentContactNumber;
						existingPatients[indexToUpdate].allergy_history =
							currentAllergyHistory;
						existingPatients[indexToUpdate].medical_history =
							currentMedicalHistory;
						existingPatients[indexToUpdate].medication = currentMedication;
						existingPatients[indexToUpdate].problem = currentProblem;
						existingPatients[indexToUpdate].treatment_plan =
							currentTreatmentPlan;
						setPatients(existingPatients);
					}
				},
				(txObj, error) => console.log(error)
			);
		});
	};

	const handleSave = () => {
		addPatient();
		navigation.popToTop();
	};

	return (
		<KeyboardAwareScrollView style={styles.container}>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<View style={styles.patientsWrapper}>
					<TextInput
						style={styles.input}
						value={currentName}
						placeholder="Name"
						onChangeText={setCurrentName}
					/>
					<TextInput
						style={styles.input}
						value={currentAge}
						placeholder="Age"
						onChangeText={setCurrentAge}
						inputMode="numeric"
					/>
					<TextInput
						style={styles.input}
						value={currentContactNumber}
						placeholder="Contact Number"
						onChangeText={setCurrentContactNumber}
						inputMode="tel"
					/>
					<TextInput
						style={styles.input}
						editable
						multiline
						numberOfLines={3}
						value={currentAllergyHistory}
						placeholder="Allergy History"
						onChangeText={setCurrentAllergyHistory}
					/>
					<TextInput
						style={styles.input}
						editable
						multiline
						numberOfLines={3}
						value={currentMedicalHistory}
						placeholder="Medical History"
						onChangeText={setCurrentMedicalHistory}
					/>
					<TextInput
						style={styles.input}
						editable
						multiline
						numberOfLines={3}
						value={currentMedication}
						placeholder="Current Medication"
						onChangeText={setCurrentMedication}
					/>
					<TextInput
						style={styles.input}
						editable
						multiline
						numberOfLines={3}
						value={currentProblem}
						placeholder="Current Problem"
						onChangeText={setCurrentProblem}
					/>
					<TextInput
						style={styles.input}
						editable
						multiline
						numberOfLines={3}
						value={currentTreatmentPlan}
						placeholder="Treatment Plan"
						onChangeText={setCurrentTreatmentPlan}
					/>
					<Button title="Save" onPress={handleSave} />
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAwareScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e8eaed",
	},
	patientsWrapper: {
		paddingTop: 40,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	patient: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderWidth: 1,
	},
	input: {
		margin: 8,
		borderWidth: 0.8,
		padding: 8,
	},
});

export default Registration;
