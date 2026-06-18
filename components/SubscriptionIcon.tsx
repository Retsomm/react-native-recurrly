import { View, Image, type ImageSourcePropType } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import * as si from 'simple-icons';

const SLUG_OVERRIDES: Record<string, string> = {
    'adobe creative cloud': 'adobe',
    'anthropic': 'anthropic',
    'claude': 'anthropic',
    'claude ai': 'anthropic',
    'claude pro': 'anthropic',
    'chatgpt': 'openai',
    'chatgpt plus': 'openai',
    'google workspace': 'googleworkspace',
    'google drive': 'googledrive',
    'google one': 'googleone',
    'youtube premium': 'youtube',
    'youtube music': 'youtubemusic',
    'amazon prime': 'amazonprime',
    'amazon prime video': 'primevideo',
    'apple one': 'apple',
    'apple music': 'applemusic',
    'apple tv': 'appletv',
    'apple tv+': 'appletv',
    'disney plus': 'disneyplus',
    'disney+': 'disneyplus',
    'hbo max': 'max',
    'microsoft 365': 'microsoftoffice',
    'office 365': 'microsoftoffice',
    'github pro': 'github',
    'github copilot': 'githubcopilot',
    'canva pro': 'canva',
    '1password': 'onepassword',
};

type SimpleIcon = { title: string; hex: string; path: string };

const lookupIcon = (name: string): SimpleIcon | null => {
    if (!name.trim()) return null;
    const lower = name.trim().toLowerCase();
    const slug = SLUG_OVERRIDES[lower] ?? lower.split(/[\s\-_]+/)[0].replace(/[^a-z0-9]/g, '');
    const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof si;
    return (si[key] as SimpleIcon | undefined) ?? null;
};

interface SubscriptionIconProps {
    name: string;
    fallback: ImageSourcePropType;
    size: number;
}

const SubscriptionIcon = ({ name, fallback, size }: SubscriptionIconProps) => {
    const icon = lookupIcon(name);
    const padding = Math.round(size * 0.16);
    const innerSize = size - padding * 2;

    if (!icon) {
        return (
            <Image
                source={fallback}
                style={{ width: size, height: size }}
                resizeMode="contain"
            />
        );
    }

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg viewBox="0 0 24 24" width={innerSize} height={innerSize} fill={`#${icon.hex}`}>
                <Path d={icon.path} />
            </Svg>
        </View>
    );
};

export default SubscriptionIcon;
