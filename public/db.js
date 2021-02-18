let db;

//Create a new indexDB request
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
    //create an object store called "storeOffline"
    const db = event.target.result;
		const offlineStore = db.createObjectStore("offline", {
			autoIncrement: true,
		});
}

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
	const transaction = db.transaction(["pending"], "readwrite");
	const pendingStore = transaction.objectStore("pending");
	console.log("Let's see");
	console.log(record);
	pendingStore.add({
		name: record.name,
		value: record.value,
		date: record.date,
	});
}