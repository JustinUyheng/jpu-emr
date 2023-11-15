import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { initData, fetchData, insertData } from "../utils/transactions";
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
	const [form, setForm] = useState({
		name: "",
		age: "",
		contactNumber: "",
		allergyHistory: "",
		medicalHistory: "",
		currentMedication: "",
		currentProblem: "",
		treatmentPlan: "",
	});

	useEffect(() => {
		initData(db);
		fetchData(db, setPatients, setIsLoading);
	}, []);

	const addPatient = () => {
		insertData(db, form, patients, setPatients);
	};

	const handleChange = (key, value) => {
		setForm({
			...form,
			[key]: value,
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
						value={form.name}
						placeholder="Name"
						onChangeText={(text) => handleChange("name", text)}
					/>
					<TextInput
						style={styles.input}
						value={form.age}
						placeholder="Age"
						onChangeText={(text) => handleChange("age", text)}
						inputMode="numeric"
					/>
					<TextInput
						style={styles.input}
						value={form.contactNumber}
						placeholder="Contact Number"
						onChangeText={(text) => handleChange("contactNumber", text)}
						inputMode="tel"
					/>
					<TextInput
						style={styles.input}
						editable
						multiline
						numberOfLines={3}
						value={form.allergyHistory}
						placeholder="Allergy History"
						onChangeText={(text) => handleChange("allergyHistory", text)}
					/>
					<TextInput
						style={styles.input}
						editable
						multiline
						numberOfLines={3}
						value={form.medicalHistory}
						placeholder="Medical History"
						onChangeText={(text) => handleChange("medicalHistory", text)}
					/>
					<TextInput
						style={styles.input}
						editable
						multiline
						numberOfLines={3}
						value={form.currentMedication}
						placeholder="Current Medication"
						onChangeText={(text) => handleChange("currentMedication", text)}
					/>
					<TextInput
						style={styles.input}
						editable
						multiline
						numberOfLines={3}
						value={form.currentProblem}
						placeholder="Current Problem"
						onChangeText={(text) => handleChange("currentProblem", text)}
					/>
					<TextInput
						style={styles.input}
						editable
						multiline
						numberOfLines={3}
						value={form.treatmentPlan}
						placeholder="Treatment Plan"
						onChangeText={(text) => handleChange("treatmentPlan", text)}
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
