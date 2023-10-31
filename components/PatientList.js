import { useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import PatientListItem from "./PatientListItem";

const PatientList = ({ patients, navigation }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const pressHandler = (patientId) => {
		navigation.navigate("Existing Patient", { patientId: patientId });
	};

	const filteredPatients = patients.filter((patient) => {
		return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

	return (
		<View>
			<TextInput
				value={searchTerm}
				placeholder="Search for a patient..."
				onChangeText={setSearchTerm}
			/>
			<FlatList
				data={filteredPatients}
				renderItem={({ item: patient }) => (
					<PatientListItem
						name={patient.name}
						contactNumber={patient.contact_number}
						pressHandler={() => pressHandler(patient.id)}
					/>
				)}
				keyExtractor={(patient) => String(patient.id)}
			/>
		</View>
	);
};

export default PatientList;
