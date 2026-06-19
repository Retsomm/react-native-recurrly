import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSubscriptions } from '@/context/SubscriptionsContext';
import SubscriptionCard from '@/components/SubscriptionCard';
import { formatCurrency } from '@/lib/utils';
import dayjs from 'dayjs';
import "@/global.css";

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const Y_LABELS = [45, 35, 25, 15, 5, 0];
const CHART_AMOUNTS = [35, 33, 30, 40, 28, 20, 22];
const CHART_MAX = 45;
const CHART_H = 160;
const LABEL_RESERVE = 32;
const BAR_W = 26;

const Insights = () => {
    const { subscriptions } = useSubscriptions();

    // 0 = Mon, 6 = Sun
    const todayIndex = (dayjs().day() + 6) % 7;

    const monthlyTotal = subscriptions.reduce((sum, sub) => {
        return sum + (sub.billing === 'Yearly' ? sub.price / 12 : sub.price);
    }, 0);

    const currentMonthLabel = dayjs().format('MMMM YYYY');

    const historySubscriptions = [...subscriptions]
        .sort((a, b) => {
            const aValid = a.startDate && dayjs(a.startDate).isValid();
            const bValid = b.startDate && dayjs(b.startDate).isValid();
            if (!aValid && !bValid) return 0;
            if (!aValid) return 1;
            if (!bValid) return -1;
            return dayjs(b.startDate).diff(dayjs(a.startDate));
        })
        .slice(0, 3);

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32"
            >
                {/* Header */}
                <View className="py-4">
                    <Text className="text-2xl font-sans-bold text-primary">Monthly Insights</Text>
                </View>

                {/* Upcoming heading */}
                <View className="list-head">
                    <Text className="list-title">Upcoming</Text>
                    <TouchableOpacity className="list-action">
                        <Text className="list-action-text">View all</Text>
                    </TouchableOpacity>
                </View>

                {/* Bar Chart */}
                <View className="bg-card rounded-2xl px-4 pt-3 pb-4 mb-4">
                    <View style={{ flexDirection: 'row' }}>
                        {/* Y-axis labels */}
                        <View
                            style={{
                                height: CHART_H + LABEL_RESERVE,
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                paddingBottom: LABEL_RESERVE,
                                marginRight: 8,
                            }}
                        >
                            {Y_LABELS.map((val) => (
                                <Text
                                    key={val}
                                    style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', lineHeight: 12 }}
                                >
                                    {val}
                                </Text>
                            ))}
                        </View>

                        {/* Chart area */}
                        <View style={{ flex: 1 }}>
                            {/* Gridlines + Bars */}
                            <View style={{ height: CHART_H, position: 'relative' }}>
                                {/* Gridlines */}
                                {Y_LABELS.map((val) => (
                                    <View
                                        key={val}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            top: CHART_H - Math.round((val / CHART_MAX) * CHART_H),
                                            height: 1,
                                            backgroundColor: 'rgba(0,0,0,0.07)',
                                        }}
                                    />
                                ))}

                                {/* Bars row */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'flex-end',
                                        height: CHART_H,
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                >
                                    {CHART_AMOUNTS.map((amount, i) => {
                                        const isToday = i === todayIndex;
                                        const barH = Math.round((amount / CHART_MAX) * CHART_H);
                                        return (
                                            <View
                                                key={DAYS[i]}
                                                style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: CHART_H }}
                                            >
                                                {isToday && (
                                                    <View
                                                        style={{
                                                            backgroundColor: '#ea7a53',
                                                            borderRadius: 6,
                                                            paddingHorizontal: 7,
                                                            paddingVertical: 3,
                                                            marginBottom: 4,
                                                        }}
                                                    >
                                                        <Text style={{ color: 'white', fontSize: 11, fontWeight: '700' }}>
                                                            ${amount}
                                                        </Text>
                                                    </View>
                                                )}
                                                <View
                                                    style={{
                                                        height: barH,
                                                        width: BAR_W,
                                                        backgroundColor: isToday ? '#ea7a53' : '#081126',
                                                        borderRadius: 6,
                                                        borderWidth: isToday ? 2 : 0,
                                                        borderColor: '#c0392b',
                                                    }}
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>

                            {/* Day labels */}
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                {DAYS.map((day, i) => (
                                    <View key={day} style={{ flex: 1, alignItems: 'center' }}>
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                fontWeight: '600',
                                                color: i === todayIndex ? '#081126' : 'rgba(0,0,0,0.45)',
                                            }}
                                        >
                                            {day}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Expenses card */}
                <View className="bg-card rounded-2xl p-4 mb-6 flex-row items-center justify-between border border-border">
                    <View>
                        <Text className="text-xl font-sans-bold text-primary">Expenses</Text>
                        <Text className="text-sm font-sans-medium text-muted-foreground mt-1">
                            {currentMonthLabel}
                        </Text>
                    </View>
                    <View className="items-end">
                        <Text className="text-2xl font-sans-extrabold text-primary">
                            {formatCurrency(-monthlyTotal)}
                        </Text>
                        <Text className="text-sm font-sans-semibold text-success mt-1">+12%</Text>
                    </View>
                </View>

                {/* History heading */}
                <View className="list-head">
                    <Text className="list-title">History</Text>
                    <TouchableOpacity className="list-action">
                        <Text className="list-action-text">View all</Text>
                    </TouchableOpacity>
                </View>

                {/* History subscription cards */}
                <View className="gap-4">
                    {historySubscriptions.map((sub) => (
                        <SubscriptionCard
                            key={sub.id}
                            {...sub}
                            expanded={false}
                            onPress={() => {}}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Insights;
