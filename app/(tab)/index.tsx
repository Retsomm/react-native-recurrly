import { Text, View, Image,FlatList } from "react-native";
import "@/global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import {HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS} from "@/constants/data";
import { icons } from "@/constants/icons";
import dayjs from "dayjs";
import {formatCurrency} from "@/lib/utils";
import ListHeading from "@/components/ListHeading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import {useState} from "react";
const App = () => {
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
    return (
        <SafeAreaView className="flex-1 bg-background p-5">
                <FlatList
                    ListHeaderComponent={()=>(
                        <>
                            <View className="home-header">
                                <View className="home-user">
                                    <Image source={images.avatar} className="home-avatar" />
                                    <Text className="home-user-name">{HOME_USER.name}</Text>
                                </View>
                                <Image source={icons.add} className="home-add-icon" />
                            </View>
                            <View className="home-balance-card">
                                <Text className="home-balance-label">Balance</Text>
                                <View className="home-balance-row">
                                    <Text　className="home-balance-amount">
                                        {formatCurrency(HOME_BALANCE.amount)}
                                    </Text>
                                    <Text　className="home-balance-date">
                                        {dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}
                                    </Text>
                                </View>
                            </View>
                            <View className="mb-5">
                                <ListHeading title="ListHeading"/>
                                <FlatList
                                    data={UPCOMING_SUBSCRIPTIONS}
                                    renderItem={({item})=>(
                                        <UpcomingSubscriptionCard {...item}/>
                                    )}
                                    keyExtractor={(item)=> item.id}
                                    horizontal
                                    showsVerticalScrollIndicator={false}
                                    ListEmptyComponent={<Text className="home-empty-state">No upcoming renewals yet.</Text>}
                                />
                            </View>

                            <ListHeading title="AllSubscription"/>

                        </>
                    )}
                    data={HOME_SUBSCRIPTIONS}
                    keyExtractor={(item)=> item.id}
                    renderItem={({item})=>(
                        <SubscriptionCard
                            {...item}
                            expanded={expandedSubscriptionId === item.id}
                            onPress={()=> setExpandedSubscriptionId((currentId)=>(currentId === item.id ? null : item.id))}
                        />
                    )}
                    extraData={expandedSubscriptionId}
                    ItemSeparatorComponent={()=><View className="p-4"/>}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text className="home-empty-state">No subscription yet.</Text>}
                    contentContainerClassName="pb-32"
                />
        </SafeAreaView>
    );
}
export default App;
