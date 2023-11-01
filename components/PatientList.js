import { useState } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import PatientListItem from "./PatientListItem";

const PatientList = ({ patients, navigation }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const pressHandler = (patientId, patientName) => {
		navigation.navigate("Existing Patient", {
			patientId: patientId,
			patientName: patientName,
		});
	};

	const filteredPatients = patients.filter((patient) => {
		return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	const PatientListEmpty = () => {
		return (
			<View style={{ alignItems: "center" }}>
				<Text style={styles.item}>No patients found</Text>
			</View>
		);
	};

	return (
		<View>
			<View style={styles.patientListActions}>
				<TextInput
					style={styles.searchBar}
					value={searchTerm}
					placeholder={"Search for a patient..."}
					onChangeText={setSearchTerm}
				/>
				<View style={styles.iconButton}>
					<Pressable onPress={() => navigation.navigate("Registration")}>
						<Icon name="plus-square" size={24} />
					</Pressable>
				</View>
			</View>

			<FlatList
				data={filteredPatients}
				renderItem={({ item: patient }) => (
					<PatientListItem
						name={patient.name}
						pressHandler={() => pressHandler(patient.id, patient.name)}
					/>
				)}
				keyExtractor={(patient) => String(patient.id)}
				ListEmptyComponent={PatientListEmpty}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	patientListActions: {
		flexDirection: "row",
		alignItems: "center",
	},
	searchBar: {
		flex: 2,
		padding: 8,
		paddingLeft: 16,
		marginVertical: 16,
		marginRight: 8,
		borderColor: "#bbb",
		borderWidth: 1,
		borderRadius: 10,
	},
});

export default PatientList;
