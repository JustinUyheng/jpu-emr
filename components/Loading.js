import { StyleSheet, Text, View } from "react-native";

const Loading = () => {
	return (
		<View styles={styles.container}>
			<Text>Loading...</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f1f2ff",
		paddingBottom: 50,
	},
});

export default Loading;
