export const initData = (db) => {
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

export const fetchData = (db, setPatients, setIsLoading) => {
	db.transaction((tx) => {
		tx.executeSql(
			"SELECT * FROM patients",
			null,
			(txObj, resultSet) => setPatients(resultSet.rows._array),
			(txObj, error) => console.log(error)
		);

		setIsLoading(false);
	});
};

export const insertData = (db, form, patients, setPatients) => {
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
				form.contactNumber,
				form.allergyHistory,
				form.medicalHistory,
				form.currentMedication,
				form.currentProblem,
				form.treatmentPlan,
			],
			(txObj, resultSet) => {
				let existingPatients = [...patients];
				existingPatients.push({
					id: resultSet.insertId,
					name: form.name,
					age: form.age,
					contact_number: form.contactNumber,
					allergy_history: form.allergyHistory,
					medical_history: form.medicalHistory,
					medication: form.currentMedication,
					problem: form.currentProblem,
					treatment_plan: form.treatmentPlan,
				});
				setPatients(existingPatients);
			},
			(txObj, error) => console.log(error)
		);
	});
};
