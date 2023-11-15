export const stringifyValues = (object, valuesToConvert) => {
	const newObject = {};
	for (const key in object) {
		if (valuesToConvert.includes(key)) {
			newObject[key] = String(object[key]);
		} else {
			newObject[key] = object[key];
		}
	}
	return newObject;
};
