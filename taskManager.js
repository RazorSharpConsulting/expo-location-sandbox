import * as TaskManager from "expo-task-manager";

var lastUpdate = 0;

TaskManager.defineTask("WATCH_LOCATION", ({ data, error }) => {
    if (error) {
        console.log("Update location error", error);
    } else {
        try {
            const now = new Date().valueOf();

            if (!lastUpdate || now >= lastUpdate + 1000 * 15) {
                lastUpdate = new Date().valueOf();
                console.log("location updated", JSON.stringify(data));
            }
        } catch (ex) {
            console.error("Failed to save checkin", ex);
        }
    }
});