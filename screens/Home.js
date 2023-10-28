import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Button,
	Text,
	View,
	FlatList,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import Header from "../components/Header";
import Patient from "../components/Patient";
import PatientForm from "../components/PatientForm";

const Home = ({ navigation }) => {
	const patients = [];

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.container}>
				<StatusBar style="auto" />
				<Header />
				<View style={styles.content}>
					<Button
						title="Register a patient"
						color="coral"
						onPress={() => navigation.navigate("Registration")}
					/>
					{/* <PatientForm submitHandler={submitHandler} /> */}
					<View style={styles.list}>
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
							keyExtractor={(patient) => patient.id}
						/>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
		padding: 40,
		backgroundColor: "pink",
	},
	list: {
		flex: 1,
		marginTop: 20,
		backgroundColor: "yellow",
	},
	patient: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderWidth: 1,
	},
});

export default Home;
