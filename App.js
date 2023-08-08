import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./taskManager";
import { useEffect } from "react";
import { hasLocationPermission } from "./permissions";
import { startLocationUpdates } from "./startLocationUpdates";
import { requestPermissions } from "./requestPermissions";

export default function App() {
    useEffect(() => {
        (async () => {
            console.log("here");
            const hasPerms = await hasLocationPermission();
            if (hasPerms) {
                await startLocationUpdates();
            } else {
                const granted = await requestPermissions();
                if (granted) {
                    await startLocationUpdates();
                } else {
                    console.log("wtf bruv, you had one job: enable location permissions... fawk sakes");
                }
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
