import { useClerk, useUser } from "@clerk/expo";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import images from "@/constants/images";

const Settings = () => {
    const { signOut } = useClerk();
    const { user } = useUser();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.center}>
                <View style={styles.profileCard}>
                    <Image
                        source={user?.imageUrl ? { uri: user.imageUrl } : images.avatar}
                        style={styles.avatar}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.name} numberOfLines={1}>
                            {user?.fullName ?? "用戶"}
                        </Text>
                        <Text style={styles.email} numberOfLines={1}>
                            {user?.primaryEmailAddress?.emailAddress ?? ""}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={() => signOut()}
                    activeOpacity={0.7}
                >
                    <Text style={styles.signOutText}>登出</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        gap: 16,
    },
    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
        gap: 14,
        width: "100%",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.12)",
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
    },
    profileInfo: {
        flex: 1,
        gap: 3,
    },
    name: {
        fontSize: 16,
        fontFamily: "sans-semibold",
        color: colors.foreground,
    },
    email: {
        fontSize: 13,
        fontFamily: "sans-regular",
        color: colors.mutedForeground,
    },
    signOutButton: {
        width: "100%",
        backgroundColor: colors.accent,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
    },
    signOutText: {
        fontSize: 16,
        fontFamily: "sans-semibold",
        color: "#ffffff",
    },
});

export default Settings;
