import { Text } from "react-native";
import { Link } from "expo-router";
import "@/global.css";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-background">
            <Text className="text-xl font-bold text-success">
                Happy Coding!!!
            </Text>
            <Link href="/(auth)/sign-up" className="mt-4 rounded bg-primary text-white p-4">Go to Sign Up</Link>
            <Link href="/(auth)/sign-in" className="mt-4 rounded bg-primary text-white p-4">Go to Sign In</Link>
            <Link href="/subscriptions/claude" className="mt-4 rounded bg-primary text-white p-4">Claude Max Subscription</Link>
        </SafeAreaView>
    );
}
export default App;
