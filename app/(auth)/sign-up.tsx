import { Text } from 'react-native';
import {Link} from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
    return (
        <SafeAreaView>
            <Text>SignUp</Text>
            <Link href="/(auth)/sign-up">Sign Up</Link>
        </SafeAreaView>
    )
}

export default SignUp;