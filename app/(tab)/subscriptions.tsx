import { useState } from 'react';
import { Text, View, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptions } from "@/context/SubscriptionsContext";

const Subscriptions = () => {
    const [query, setQuery] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const { subscriptions, isLoading } = useSubscriptions();

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-background items-center justify-center">
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    const filtered = subscriptions.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.category?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text className="text-2xl font-bold text-foreground mb-4">Subscriptions</Text>
            <View className="flex-row items-center bg-muted rounded-xl px-4 mb-5 h-12">
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search subscriptions..."
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    className="flex-1 text-foreground"
                />
            </View>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SubscriptionCard
                        {...item}
                        expanded={expandedId === item.id}
                        onPress={() => setExpandedId((cur) => cur === item.id ? null : item.id)}
                    />
                )}
                extraData={expandedId}
                ItemSeparatorComponent={() => <View className="p-4" />}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text className="home-empty-state">No subscriptions found.</Text>}
                contentContainerClassName="pb-32"
            />
        </SafeAreaView>
    );
};

export default Subscriptions;
