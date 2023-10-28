import { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";

const PatientForm = ({ submitHandler }) => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [allergyHistory, setAllergyHistory] = useState("");
	const [medicalHistory, setMedicalHistory] = useState("");
	const [currentMedication, setCurrentMedication] = useState("");
	const [currentProblem, setCurrentProblem] = useState("");
	const [treatmentPlan, setTreatmentPlan] = useState("");

	const changeNameHandler = (value) => {
		setName(value);
	};

	const changeAgeHandler = (value) => {
		setAge(value);
	};

	const changeContactNumberHandler = (value) => {
		setContactNumber(value);
	};

	const changeAllergyHistoryHandler = (value) => {
		setAllergyHistory(value);
	};

	const changeMedicalHistoryHandler = (value) => {
		setMedicalHistory(value);
	};

	const changeCurrentMedicationHandler = (value) => {
		setCurrentMedication(value);
	};

	const changeCurrentProblemHandler = (value) => {
		setCurrentProblem(value);
	};

	const changeTreatmentPlanHandler = (value) => {
		setTreatmentPlan(value);
	};

	return (
		<View>
			<TextInput
				style={styles.input}
				onChangeText={changeNameHandler}
				value={name}
				placeholder="Name"
			/>
			<TextInput
				style={styles.input}
				onChangeText={changeAgeHandler}
				value={age}
				placeholder="Age"
				keyboardType="numeric"
			/>
			<TextInput
				style={styles.input}
				onChangeText={changeContactNumberHandler}
				value={contactNumber}
				placeholder="Contact Number"
				keyboardType="numeric"
			/>
			<TextInput
				style={styles.input}
				editable
				multiline
				numberOfLines={3}
				onChangeText={changeAllergyHistoryHandler}
				value={allergyHistory}
				placeholder="Allergy History"
			/>
			<TextInput
				style={styles.input}
				editable
				multiline
				numberOfLines={3}
				onChangeText={changeMedicalHistoryHandler}
				value={medicalHistory}
				placeholder="Medical History"
			/>
			<TextInput
				style={styles.input}
				editable
				multiline
				numberOfLines={3}
				onChangeText={changeCurrentMedicationHandler}
				value={currentMedication}
				placeholder="Current Medication"
			/>
			<TextInput
				style={styles.input}
				editable
				multiline
				numberOfLines={3}
				onChangeText={changeCurrentProblemHandler}
				value={currentProblem}
				placeholder="Current Problem"
			/>
			<TextInput
				style={styles.input}
				editable
				multiline
				numberOfLines={3}
				onChangeText={changeTreatmentPlanHandler}
				value={treatmentPlan}
				placeholder="Treatment Plan"
			/>
			<Button
				onPress={() =>
					submitHandler(
						name,
						age,
						contactNumber,
						allergyHistory,
						medicalHistory,
						currentMedication,
						treatmentPlan
					)
				}
				title="Add Patient"
				color="coral"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});

export default PatientForm;
