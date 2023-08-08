import * as Location from "expo-location";

export const hasLocationPermission = async () => {
    try {
        const { status: backgroundStatus } = await Location.getBackgroundPermissionsAsync();
        const { status: foregroundStatus } = await Location.getForegroundPermissionsAsync();
        return backgroundStatus === Location.PermissionStatus.GRANTED && foregroundStatus === Location.PermissionStatus.GRANTED;
    } catch (ex) {
        console.log("failed to get location permissions", ex);
        return false;
    }
};
