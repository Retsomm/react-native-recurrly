import { Text } from 'react-native';
import {Link, useLocalSearchParams} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const SubscriptionDetails = () => {
    const { id } = useLocalSearchParams<{ id: string}>();
    return (
        <SafeAreaView>
            <Text>Subscription Details: {id}</Text>
            <Link href={`/subscriptions/${id}`}>Go Back</Link>
        </SafeAreaView>
    )
}

export default SubscriptionDetails;