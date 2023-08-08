import * as TaskManager from "expo-task-manager";
import { setCache, transmitLocationHistory } from "./src/slices/location";
import store from "./store";

var lastUpdate = 0;
var interimUpdate = 0;
var locationCache = [];
var transmitting = false;

TaskManager.defineTask("WE_WATCH_LOCATION", ({ data, error }) => {
    if (error) {
        console.log("Update location error", error);
    } else {
        try {
            const { locations } = data;
            const now = new Date().valueOf();

            if (!lastUpdate || now >= lastUpdate + 1000 * 15) {
                store.dispatch(transmitLocationHistory([locations[locations.length - 1]]));
                lastUpdate = new Date().valueOf();
                console.log('location updated');
            }
        } catch (ex) {
            console.error("Failed to save checkin", ex);
        }
    }
});

TaskManager.defineTask("BACKGROUND_NOTIFICATION_TASK", ({ data, error, executionInfo }) => {
    console.log("received notification in background", data, error);
});
