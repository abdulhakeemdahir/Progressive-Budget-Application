let db;

//Create a new indexDB request
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
	//create an object store called "storeOffline"
	const db = event.target.result;
	const offlineStore = db.createObjectStore("offline", {
		autoIncrement: true,
	});
};

//Check to see if application is online before checking database
request.onsuccess = function (event) {
	db = event.target.result;

	if (navigator.onLine) {
		checkDatabase();
	}
};

// Respond with error
request.onerror = function (event) {
	console.log("Woops! " + event.target.errorCode);
};

// create transaction with db, access db and add to the db
function saveRecord(record) {
	const transaction = db.transaction(["offline"], "readwrite");
	const offlineStore = transaction.objectStore("offline");
	offlineStore.add({
		name: record.name,
		value: record.value,
		date: record.date,
	});
}
// open transaction to db, access db, get all records from db into a variable
function checkDatabase() {
	const transaction = db.transaction(["offline"], "readwrite");
	const offlineStore = transaction.objectStore("offline");

	const getAll = offlineStore.getAll();

	getAll.onsuccess = function () {
		if (getAll.result.length > 0) {
			fetch("/api/transaction/bulk", {
				method: "POST",
				body: JSON.stringify(getAll.result),
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
				},
			})
				.then(response => response.json())
				.then(() => {
					// if successful, open a transaction on your offline db
					// access your offline object store
					// clear all items in your store
					const transaction = db.transaction(["offline"], "readwrite");
					const offlineStore = transaction.objectStore("offline");
					offlineStore.clear();
				});
		}
	};
}
