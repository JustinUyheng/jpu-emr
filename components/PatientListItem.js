import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const PatientListItem = ({ name, pressHandler }) => (
	<TouchableOpacity onPress={pressHandler}>
		<View style={styles.patient}>
			<Text>{name}</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	patient: {
		padding: 16,
		marginBottom: 16,
		borderColor: "#bbb",
		borderWidth: 1,
		borderRadius: 10,
	},
});

export default PatientListItem;
