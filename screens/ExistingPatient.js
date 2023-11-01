import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import {
	Alert,
	Button,
	Keyboard,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ExistingPatient = ({ route, navigation }) => {
	const { patientId, patientName } = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	const db = SQLite.openDatabase("example.db");
	const [isLoading, setIsLoading] = useState(true);
	const [patients, setPatients] = useState([]);
	const [patient, setPatient] = useState({});
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
				"SELECT * FROM patients",
				null,
				(txObj, resultSet) => setPatients(resultSet.rows._array),
				(txObj, error) => console.log(error)
			);
		});

		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM patients WHERE id = ?",
				[patientId],
				(txObj, resultSet) => {
					const currentPatient = resultSet.rows._array[0];
					setPatient(currentPatient);
					setCurrentName(currentPatient.name);
					setCurrentAge(currentPatient.age?.toString());
					setCurrentContactNumber(currentPatient.contact_number?.toString());
					setCurrentAllergyHistory(currentPatient.allergy_history);
					setCurrentMedicalHistory(currentPatient.medical_history);
					setCurrentMedication(currentPatient.medication);
					setCurrentProblem(currentPatient.problem);
					setCurrentTreatmentPlan(currentPatient.treatment_plan);
				},
				(txObj, error) => console.log(error)
			);

			setIsLoading(false);
		});
	}, []);

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
				[
					currentName,
					currentAge,
					currentContactNumber,
					currentAllergyHistory,
					currentMedicalHistory,
					currentMedication,
					currentProblem,
					currentTreatmentPlan,
					id,
				],
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

	const handleSave = (id) => {
		updatePatient(id);
		navigation.popToTop();
	};

	const handleDelete = (id) => {
		deletePatient(id);
		navigation.popToTop();
	};

	return (
		<KeyboardAwareScrollView style={styles.container}>
			{!isLoading && (
				<View>
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
							/>
							<TextInput
								style={styles.input}
								value={currentContactNumber}
								placeholder="Contact Number"
								onChangeText={setCurrentContactNumber}
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
							<View style={styles.patientActions}>
								<Button
									style={styles.button}
									title="Save"
									onPress={() => handleSave(patientId)}
								/>
								<Button
									style={styles.button}
									title="Delete"
									onPress={() => setModalVisible(true)}
									color="red"
								/>
							</View>
							<Modal
								animationType="slide"
								transparent={true}
								visible={modalVisible}
								onRequestClose={() => {
									Alert.alert("Modal has been closed.");
									setModalVisible(!modalVisible);
								}}
							>
								<View style={styles.centeredView}>
									<View style={styles.modalView}>
										<Text style={styles.modalText}>
											Are you sure you want to delete this patient record?
										</Text>
										<View style={styles.modalButtons}>
											<Pressable
												style={[styles.button, styles.buttonCancel]}
												onPress={() => setModalVisible(!modalVisible)}
											>
												<Text style={styles.textStyle}>Cancel</Text>
											</Pressable>
											<Pressable
												style={[styles.button, styles.buttonConfirm]}
												onPress={() => handleDelete(patientId)}
											>
												<Text style={styles.textStyle}>Confirm</Text>
											</Pressable>
										</View>
									</View>
								</View>
							</Modal>
						</View>
					</TouchableWithoutFeedback>
				</View>
			)}
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
	patientActions: {
		marginTop: 16,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	modalButtons: {
		flexDirection: "row",
	},
	buttonCancel: {
		backgroundColor: "#ff0000",
		margin: 8,
	},
	buttonConfirm: {
		backgroundColor: "#2196F3",
		margin: 8,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export default ExistingPatient;
