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