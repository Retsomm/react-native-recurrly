import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { icons } from '@/constants/icons';
import { useSubscriptions } from '@/context/SubscriptionsContext';
import SubscriptionIcon from '@/components/SubscriptionIcon';

const CATEGORIES = ['Design', 'Developer Tools', 'AI Tools', 'Productivity', 'Entertainment', 'Finance', 'Health', 'Other'];
const BILLING_OPTIONS = ['Monthly', 'Yearly'];

interface CreateSubscriptionModalProps {
    visible: boolean;
    onClose: () => void;
}

const CreateSubscriptionModal = ({ visible, onClose }: CreateSubscriptionModalProps) => {
    const { addSubscription } = useSubscriptions();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [billing, setBilling] = useState('Monthly');
    const [category, setCategory] = useState('');

    // Debounce preview so it only updates after the user pauses typing
    const [previewName, setPreviewName] = useState('');
    useEffect(() => {
        const t = setTimeout(() => setPreviewName(name), 350);
        return () => clearTimeout(t);
    }, [name]);

    const reset = () => {
        setName('');
        setPrice('');
        setBilling('Monthly');
        setCategory('');
        setPreviewName('');
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const isValid = name.trim().length > 0 && price.trim().length > 0 && !isNaN(parseFloat(price));

    const handleSubmit = () => {
        if (!isValid) return;

        const parsedPrice = parseFloat(price);
        const now = new Date().toISOString();
        const msInDay = 24 * 60 * 60 * 1000;
        const renewalOffset = billing === 'Yearly' ? 365 * msInDay : 30 * msInDay;

        addSubscription({
            id: `sub-${Date.now()}`,
            icon: icons.logo,
            name: name.trim(),
            category: category || undefined,
            status: 'active',
            startDate: now,
            price: parsedPrice,
            currency: 'USD',
            billing,
            renewalDate: new Date(Date.now() + renewalOffset).toISOString(),
        });

        reset();
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <View className="modal-overlay">
                    <TouchableOpacity className="flex-1" activeOpacity={1} onPress={handleClose} />
                    <View className="modal-container">
                        <View className="modal-header">
                            <Text className="modal-title">New Subscription</Text>
                            <TouchableOpacity className="modal-close" onPress={handleClose}>
                                <Text className="modal-close-text">✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                            <View className="modal-body">

                                {/* Name + live icon preview */}
                                <View className="gap-2">
                                    <Text className="auth-label">Name</Text>
                                    <View className="flex-row items-center gap-3">
                                        <View className="size-14 items-center justify-center rounded-xl bg-muted overflow-hidden shrink-0">
                                            <SubscriptionIcon
                                                name={previewName}
                                                fallback={icons.logo}
                                                size={56}
                                            />
                                        </View>
                                        <TextInput
                                            className="auth-input flex-1"
                                            placeholder="e.g. Netflix"
                                            placeholderTextColor="rgba(0,0,0,0.4)"
                                            value={name}
                                            onChangeText={setName}
                                            returnKeyType="next"
                                        />
                                    </View>
                                </View>

                                {/* Price */}
                                <View className="gap-2">
                                    <Text className="auth-label">Price (USD)</Text>
                                    <TextInput
                                        className="auth-input"
                                        placeholder="e.g. 9.99"
                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                        value={price}
                                        onChangeText={setPrice}
                                        keyboardType="decimal-pad"
                                        returnKeyType="done"
                                    />
                                </View>

                                {/* Frequency */}
                                <View className="gap-2">
                                    <Text className="auth-label">Frequency</Text>
                                    <View className="picker-row">
                                        {BILLING_OPTIONS.map(option => (
                                            <TouchableOpacity
                                                key={option}
                                                className={clsx('picker-option', billing === option && 'picker-option-active')}
                                                onPress={() => setBilling(option)}
                                                activeOpacity={0.7}
                                            >
                                                <Text className={clsx('picker-option-text', billing === option && 'picker-option-text-active')}>
                                                    {option}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* Category */}
                                <View className="gap-2">
                                    <Text className="auth-label">Category</Text>
                                    <View className="category-scroll">
                                        {CATEGORIES.map(cat => (
                                            <TouchableOpacity
                                                key={cat}
                                                className={clsx('category-chip', category === cat && 'category-chip-active')}
                                                onPress={() => setCategory(prev => prev === cat ? '' : cat)}
                                                activeOpacity={0.7}
                                            >
                                                <Text className={clsx('category-chip-text', category === cat && 'category-chip-text-active')}>
                                                    {cat}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* Submit */}
                                <TouchableOpacity
                                    className={clsx('auth-button', !isValid && 'auth-button-disabled')}
                                    onPress={handleSubmit}
                                    activeOpacity={0.8}
                                    disabled={!isValid}
                                >
                                    <Text className="auth-button-text">Add Subscription</Text>
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CreateSubscriptionModal;
