import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Patient = ({
	name,
	age,
	contactNumber,
	allergyHistory,
	medicalHistory,
	currentMedication,
	currentProblem,
	treatmentPlan,
	pressHandler,
}) => (
	<TouchableOpacity onPress={pressHandler}>
		<View style={styles.patient}>
			<Text>Name: {name}</Text>
			<Text>Age: {age}</Text>
			<Text>Contact Number: {contactNumber}</Text>
			<Text>Current Problem: {currentProblem}</Text>
			{/* <Text>{allergyHistory}</Text>
      <Text>{medicalHistory}</Text>
      <Text>{currentMedication}</Text>
      <Text>{treatmentPlan}</Text> */}
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	patient: {
		padding: 16,
		marginTop: 16,
		borderColor: "#bbb",
		borderWidth: 1,
		borderRadius: 10,
	},
});

export default Patient;
