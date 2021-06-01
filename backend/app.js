//Loading modules and setting up app
const express = require("express");
const app = express();
const cors = require("cors");

const path = require("path");
const fs = require("fs");

const portNumber = process.argv[2];
const resourcesDir = __dirname+"/resources/"

const serverSettingsFilePath = resourcesDir+"server_settings.json";
const apiKeysFilePath = resourcesDir+"api_keys.json";
const defaultMarkersFilePath = resourcesDir+"default_markers.json";
const defaultCategoriesFilePath = resourcesDir+"default_categories.json";


const externalSettings = JSON.parse(fs.readFileSync(serverSettingsFilePath, {encoding: "utf8", flag: "r"}));
const apiKeys = JSON.parse(fs.readFileSync(apiKeysFilePath, {encoding: "utf8", flag: "r"}));
console.log(externalSettings);

const corsOptions = {
	origin: (origin, callback) => {
		if (externalSettings.whitelist.includes(origin)) {
			callback(null, true);
		}
		else {
			callback(new Error("Origin not permitted by CORS whitelist"));
		}
	}
}
if (externalSettings.useWhitelist && !externalSettings.developmentMode) {
	app.use(cors(corsOptions));
}
else {
	app.use(cors());
}

/* **************
	ENDPOINTS
*****************/

app.get("/getMapSettings", (req, res) => {
	console.log("Call to GET: /getMapSettings");
	res.json({
		googleMapsAPIKey: apiKeys.googleMapsAPIKey,
		defaultLatLongCentre: [externalSettings.mapCentreLat, externalSettings.mapCentreLong]
	});
});

app.get("/getCategories", (req, res) => {
	console.log("Call to GET: /getCategories");
	res.sendFile(path.join(defaultCategoriesFilePath));
});

app.get("/getMarkers", (req, res) => {
	console.log("Call to GET: /getMarkers");
	res.sendFile(path.join(defaultMarkersFilePath));
});

//TODO
app.post("/createMarkers", (req, res) => {
	console.log("Call to POST: /createMarkers");
});

//TODO
app.put("/updateMarker", (req, res) => {
	console.log("Call to PUT: /updateMarker");
});

//TODO
app.delete("/deleteMarker", (req, res) => {
	console.log("Call to DELETE: /deleteMarker");
});

//Run the app
app.listen(portNumber);
console.log("Running app at http://localhost:" + portNumber);