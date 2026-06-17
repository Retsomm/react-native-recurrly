import { Text } from "react-native";
import { Link } from "expo-router";
import "@/global.css";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
    return (
        <SafeAreaView className="flex-1 bg-background　p-5">
            <Text className="text-5xl font-sans-extrabold">
                Happy Coding!!!
            </Text>
            <Link href="/(auth)/sign-up" className="mt-4 rounded bg-primary text-white p-4 font-sans-bold">Go to Sign Up</Link>
            <Link href="/(auth)/sign-in" className="mt-4 rounded bg-primary text-white p-4 font-sans-bold">Go to Sign In</Link>
            <Link href="/subscriptions/claude" className="mt-4 rounded bg-primary text-white p-4 font-sans-bold">Claude Max Subscription</Link>
        </SafeAreaView>
    );
}
export default App;
