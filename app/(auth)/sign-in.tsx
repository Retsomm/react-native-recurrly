import { Text } from 'react-native';
import {Link} from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
    return (
        <SafeAreaView>
            <Text>SignIn</Text>
            <Link href="/(auth)/sign-in">Sign In</Link>
        </SafeAreaView>
    )
}

export default SignIn;