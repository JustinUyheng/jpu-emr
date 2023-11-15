import { useState, useEffect } from "react";
import {
	fetchPatients,
	fetchPatientById,
	updatePatient,
	deletePatient,
} from "../utils/transactions";
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
import Loading from "../components/Loading";

const ExistingPatient = ({ route, navigation }) => {
	const { patientId, patientName } = route.params;
	const [isLoading, setIsLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
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
		try {
			fetchPatientById(patientId, setForm, setPatients);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleChange = (key, value) => {
		setForm({
			...form,
			[key]: value,
		});
	};

	const handleSave = (id) => {
		updatePatient(form, id, patients, setPatients);
		navigation.popToTop();
	};

	const handleDelete = (id) => {
		deletePatient(id, patients, setPatients);
		navigation.popToTop();
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
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
										onChangeText={(text) =>
											handleChange("contact_number", text)
										}
										inputMode="tel"
									/>
									<TextInput
										style={styles.input}
										editable
										multiline
										numberOfLines={3}
										value={form.allergy_history}
										placeholder="Allergy History"
										onChangeText={(text) =>
											handleChange("allergy_history", text)
										}
									/>
									<TextInput
										style={styles.input}
										editable
										multiline
										numberOfLines={3}
										value={form.medical_history}
										placeholder="Medical History"
										onChangeText={(text) =>
											handleChange("medical_history", text)
										}
									/>
									<TextInput
										style={styles.input}
										editable
										multiline
										numberOfLines={3}
										value={form.medication}
										placeholder="Current Medication"
										onChangeText={(text) => handleChange("medication", text)}
									/>
									<TextInput
										style={styles.input}
										editable
										multiline
										numberOfLines={3}
										value={form.problem}
										placeholder="Current Problem"
										onChangeText={(text) => handleChange("problem", text)}
									/>
									<TextInput
										style={styles.input}
										editable
										multiline
										numberOfLines={3}
										value={form.treatment_plan}
										placeholder="Treatment Plan"
										onChangeText={(text) =>
											handleChange("treatment_plan", text)
										}
									/>
									<View style={styles.patientActions}>
										<Button
											style={styles.button}
											title="Delete"
											onPress={() => setModalVisible(true)}
											color="red"
										/>
										<Button
											style={styles.button}
											title="Save"
											onPress={() => handleSave(patientId)}
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
