import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import {
	Keyboard,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Loading from "../components/Loading";
import PatientList from "../components/PatientList";
import { fetchPatients, initPatientDatabase } from "../utils/transactions";

const Home = ({ navigation }) => {
	const db = SQLite.openDatabase("example.db");
	const [isLoading, setIsLoading] = useState(true);
	const [patients, setPatients] = useState([]);

	useEffect(() => {
		initPatientDatabase(db);
		fetchPatients(db, setPatients);
		setIsLoading(false);
	}, [patients]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}
				>
					<View style={styles.container}>
						<StatusBar style="auto" />
						<View style={styles.contentWrapper}>
							<View style={styles.list}>
								<Text style={styles.sectionTitle}>My Patients</Text>
								<PatientList patients={patients} navigation={navigation} />
							</View>
							<View style={styles.spacing}></View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f1f2ff",
		paddingBottom: 50,
	},
	contentWrapper: {
		flex: 1,
		paddingTop: 40,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		marginBottom: 16,
		fontSize: 24,
		fontWeight: "bold",
	},
	patient: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderWidth: 1,
	},
	list: {
		flex: 1,
		paddingBottom: 10,
	},
	spacing: {
		flex: 0.3,
		padding: 5,
	},
});

export default Home;
