import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const PatientListItem = ({ name, contactNumber, pressHandler }) => (
	<TouchableOpacity onPress={pressHandler}>
		<View style={styles.patient}>
			<Text>Name: {name}</Text>
			<Text>Contact Number: {contactNumber}</Text>
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

export default PatientListItem;
