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