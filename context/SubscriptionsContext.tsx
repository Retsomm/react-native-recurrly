import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOME_SUBSCRIPTIONS } from '@/constants/data';

const STORAGE_KEY = 'subscriptions';

interface SubscriptionsContextValue {
    subscriptions: Subscription[];
    addSubscription: (sub: Subscription) => void;
    isLoading: boolean;
}

const SubscriptionsContext = createContext<SubscriptionsContextValue | null>(null);

export const SubscriptionsProvider = ({ children }: { children: ReactNode }) => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                setSubscriptions(stored ? JSON.parse(stored) : HOME_SUBSCRIPTIONS);
            } catch {
                setSubscriptions(HOME_SUBSCRIPTIONS);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const addSubscription = async (sub: Subscription) => {
        const updated = [sub, ...subscriptions];
        setSubscriptions(updated);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {}
    };

    return (
        <SubscriptionsContext.Provider value={{ subscriptions, addSubscription, isLoading }}>
            {children}
        </SubscriptionsContext.Provider>
    );
};

export const useSubscriptions = () => {
    const ctx = useContext(SubscriptionsContext);
    if (!ctx) throw new Error('useSubscriptions must be used within SubscriptionsProvider');
    return ctx;
};
