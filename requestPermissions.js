import * as Location from "expo-location";

export const requestPermissions = async () => {
    try {
        let { status: statusForeground } = await Location.requestForegroundPermissionsAsync();
        let { status: statusBackground } = await Location.requestBackgroundPermissionsAsync();
        return statusForeground === "granted" && statusBackground === "granted";
    } catch (ex) {
        console.log("failed to request permissions", ex);
    }
};
