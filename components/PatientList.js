import { FlatList } from "react-native";
import Patient from "./Patient";

const PatientList = ({ patients, navigation }) => {
	const pressHandler = () => {
		// navigation.navigate("Registration");
		console.log(patients);
	};

	return (
		<FlatList
			data={patients}
			renderItem={({ patient }) => (
				<Patient
					name={patient.name}
					age={patient.age}
					contactNumber={patient.contactNumber}
					currentProblem={patient.currentProblem}
					pressHandler={pressHandler}
				/>
			)}
			keyExtractor={(patient) => String(patient.id)}
		/>
	);
};

export default PatientList;
