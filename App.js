import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Registration from "./screens/Registration";
import ExistingPatient from "./screens/ExistingPatient";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ title: "Patient Database" }}
				/>
				<Stack.Screen
					name="Registration"
					component={Registration}
					options={{ title: "New Patient Details" }}
				/>
				<Stack.Screen
					name="Existing Patient"
					component={ExistingPatient}
					options={({ route }) => ({
						title: `${route.params.patientName}'s Details`,
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

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
