import { FlatList } from "react-native";
import PatientListItem from "./PatientListItem";

const PatientList = ({ patients, navigation }) => {
	const pressHandler = (patientId) => {
		navigation.navigate("Existing Patient", { patientId: patientId });
		// console.log(patients);
	};

	return (
		<FlatList
			data={patients}
			renderItem={({ item: patient }) => (
				<PatientListItem
					name={patient.name}
					contactNumber={patient.contact_number}
					pressHandler={() => pressHandler(patient.id)}
				/>
			)}
			keyExtractor={(patient) => String(patient.id)}
		/>
	);
};

export default PatientList;
