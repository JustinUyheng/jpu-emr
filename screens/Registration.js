import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import {
	initPatientDatabase,
	fetchPatients,
	insertPatient,
} from "../utils/transactions";
import {
	Button,
	Keyboard,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../components/Loading";

const Registration = ({ navigation }) => {
	const db = SQLite.openDatabase("example.db");
	const [isLoading, setIsLoading] = useState(true);
	const [patients, setPatients] = useState([]);
	const [form, setForm] = useState({
		name: "",
		age: "",
		contact_number: "",
		allergy_history: "",
		medical_history: "",
		medication: "",
		problem: "",
		treatment_plan: "",
	});

	useEffect(() => {
		initPatientDatabase(db);
		fetchPatients(db, setPatients);
		setIsLoading(false);
	}, []);

	const handleChange = (key, value) => {
		setForm({
			...form,
			[key]: value,
		});
	};

	const handleSave = () => {
		insertPatient(db, form, patients, setPatients);
		navigation.popToTop();
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
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
								value={form.contact_number}
								placeholder="Contact Number"
								onChangeText={(text) => handleChange("contact_number", text)}
								inputMode="tel"
							/>
							<TextInput
								style={styles.input}
								editable
								multiline
								numberOfLines={3}
								value={form.allergy_history}
								placeholder="Allergy History"
								onChangeText={(text) => handleChange("allergy_history", text)}
							/>
							<TextInput
								style={styles.input}
								editable
								multiline
								numberOfLines={3}
								value={form.medical_history}
								placeholder="Medical History"
								onChangeText={(text) => handleChange("medical_history", text)}
							/>
							<TextInput
								style={styles.input}
								editable
								multiline
								numberOfLines={3}
								value={form.current_medication}
								placeholder="Current Medication"
								onChangeText={(text) =>
									handleChange("current_medication", text)
								}
							/>
							<TextInput
								style={styles.input}
								editable
								multiline
								numberOfLines={3}
								value={form.current_problem}
								placeholder="Current Problem"
								onChangeText={(text) => handleChange("current_problem", text)}
							/>
							<TextInput
								style={styles.input}
								editable
								multiline
								numberOfLines={3}
								value={form.treatment_plan}
								placeholder="Treatment Plan"
								onChangeText={(text) => handleChange("treatment_plan", text)}
							/>
							<Button title="Save" onPress={handleSave} />
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAwareScrollView>
			)}
		</>
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
