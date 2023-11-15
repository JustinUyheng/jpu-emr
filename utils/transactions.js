import * as SQLite from "expo-sqlite";
import { stringifyValues } from "./stringify";

const db = SQLite.openDatabase("example.db");

export const initPatientDatabase = () => {
	db.transaction((tx) => {
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        age INTEGER, 
        contact_number TEXT, 
        allergy_history TEXT, 
        medical_history TEXT,
        medication TEXT,
        problem TEXT,
        treatment_plan TEXT
      )`
		);
	});
};

export const fetchPatients = (setPatients) => {
	db.transaction((tx) => {
		tx.executeSql(
			"SELECT * FROM patients",
			null,
			(txObj, resultSet) => setPatients(resultSet.rows._array),
			(txObj, error) => console.log(error)
		);
	});
};

export const fetchPatientById = (patientId, setForm, setPatients) => {
	fetchPatients(setPatients);
	db.transaction((tx) => {
		tx.executeSql(
			"SELECT * FROM patients WHERE id = ?",
			[patientId],
			(txObj, resultSet) => {
				const currentPatient = resultSet.rows._array[0];
				const convertedPatient = stringifyValues(currentPatient, [
					"age",
					"contact_number",
				]);
				setForm({ ...convertedPatient });
			},
			(txObj, error) => console.log(error)
		);
	});
};

export const insertPatient = (form, patients, setPatients) => {
	db.transaction((tx) => {
		tx.executeSql(
			`INSERT INTO patients (
        name, 
        age,
        contact_number,
        allergy_history,
        medical_history,
        medication,
        problem,
        treatment_plan
      ) values (?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				form.name,
				form.age,
				form.contact_number,
				form.allergy_history,
				form.medical_history,
				form.medication,
				form.problem,
				form.treatment_plan,
			],
			(txObj, resultSet) => {
				let existingPatients = [...patients];
				existingPatients.push({
					id: resultSet.insertId,
					name: form.name,
					age: form.age,
					contact_number: form.contact_number,
					allergy_history: form.allergy_history,
					medical_history: form.medical_istory,
					medication: form.medication,
					problem: form.problem,
					treatment_plan: form.treatment_plan,
				});
				setPatients(existingPatients);
			},
			(txObj, error) => console.log(error, "transaction")
		);
	});
};

export const updatePatient = (form, id, patients, setPatients) => {
	db.transaction((tx) => {
		tx.executeSql(
			`UPDATE patients SET 
        name = ?,
        age = ?,
        contact_number = ?,
        allergy_history = ?,
        medical_history = ?,
        medication = ?,
        problem = ?,
        treatment_plan = ?
        WHERE id = ?`,
			[
				form.name,
				form.age,
				form.contact_number,
				form.allergy_history,
				form.medical_history,
				form.medication,
				form.problem,
				form.treatment_plan,
				id,
			],
			(txObj, resultSet) => {
				if (resultSet.rowsAffected > 0) {
					setPatients(
						patients.map((patient) => (patient.id === id ? form : patient))
					);
				}
			},
			(txObj, error) => console.log(error)
		);
	});
};

export const deletePatient = (id, patients, setPatients) => {
	db.transaction((tx) => {
		tx.executeSql(
			"DELETE FROM patients WHERE id = ?",
			[id],
			(txObj, resultSet) => {
				if (resultSet.rowsAffected > 0) {
					setPatients(patients.filter((patient) => patient.id !== id));
				}
			},
			(txObj, error) => console.log(error)
		);
	});
};
