import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/expo';

export default function NotFound() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) return null;

    return <Redirect href={isSignedIn ? '/(tab)' : '/(auth)/sign-in'} />;
}
