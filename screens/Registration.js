import { StyleSheet, View, Text } from "react-native";

const Registration = () => {
	return (
		<View style={styles.container}>
			<View style={styles.patientsWrapper}>
				<Text style={styles.sectionTitle}>My Patients</Text>
				<View style={styles.items}>{/* <Patient /> */}</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e8eaed",
	},
	patientsWrapper: {
		paddingTop: 80,
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
});

export default Registration;
