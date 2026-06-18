import { useSSO } from "@clerk/expo";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import images from "@/constants/images";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
    const { startSSOFlow } = useSSO();

    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });
            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId });
            }
        } catch (err) {
            console.error("Google sign-in error:", err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.center}>
                <View style={styles.logoWrapper}>
                    <Image source={images.avatar} style={styles.logo} resizeMode="contain" />
                </View>
                <Text style={styles.appName}>Recurly</Text>
                <Text style={styles.tagline}>管理你的訂閱，輕鬆掌握每月花費</Text>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.googleButton}
                        onPress={handleGoogleSignIn}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.googleButtonText} numberOfLines={1}>
                            使用 Google 登入
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.terms}>
                        登入即代表你同意我們的服務條款與隱私政策
                    </Text>
                </View>
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
        gap: 12,
    },
    logoWrapper: {
        width: 88,
        height: 88,
        borderRadius: 24,
        backgroundColor: colors.muted,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    logo: {
        width: 72,
        height: 72,
        borderRadius: 18,
    },
    appName: {
        fontSize: 34,
        fontFamily: "sans-extrabold",
        color: colors.foreground,
        letterSpacing: -0.5,
    },
    tagline: {
        fontSize: 14,
        fontFamily: "sans-regular",
        color: colors.mutedForeground,
        textAlign: "center",
        lineHeight: 20,
    },
    buttonGroup: {
        width: "100%",
        marginTop: 32,
        gap: 16,
    },
    googleButton: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.foreground,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 14,
    },
    googleButtonText: {
        fontSize: 16,
        fontFamily: "sans-semibold",
        color: "#fff",
    },
    terms: {
        fontSize: 12,
        fontFamily: "sans-regular",
        color: colors.mutedForeground,
        textAlign: "center",
        lineHeight: 18,
    },
});

export default SignIn;
