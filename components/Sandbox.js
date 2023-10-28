import { StyleSheet, Text, View } from "react-native";

const Sandbox = () => {
	return (
		<View style={styles.container}>
			<Text>one</Text>
			<Text>one</Text>
			<Text>one</Text>
			<Text>one</Text>
			<Text>one</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: "#333",
	},
});

export default Sandbox;
