import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { hasLocationPermission } from "./permissions";

export const startLocationUpdates = async (accuracy = Location.LocationAccuracy.BestForNavigation, activityType = Location.ActivityType.OtherNavigation) => {
    try {
        const hasPermission = await hasLocationPermission();
        if (hasPermission) {
            const defined = TaskManager.isTaskDefined("WATCH_LOCATION");
            if (defined) {
                const started = await Location.hasStartedLocationUpdatesAsync("WATCH_LOCATION");
                if (!started) {
                    console.log("starting location updates");
                    await Location.startLocationUpdatesAsync("WATCH_LOCATION", {
                        accuracy,
                        activityType,
                        mayShowUserSettingsDialog: true,
                        pausesUpdatesAutomatically: false,
                        showsBackgroundLocationIndicator: true,
                        timeInterval: 3000,
                        foregroundService: {
                            killServiceOnDestroy: false,
                            notificationColor: "#FFF",
                            notificationTitle: "Location Updates Running",
                            notificationBody: "We are creeping your location",
                        },
                    });
                } else {
                    console.log("updates already running, stopping");
                    await Location.stopLocationUpdatesAsync("WATCH_LOCATION");
                    return startLocationUpdates();
                }
            } else {
                console.log("task not defined");
            }
        } else {
            console.log("no premissions");
        }
    } catch (ex) {
        console.log("failed to start location updates", ex);
    }
};
