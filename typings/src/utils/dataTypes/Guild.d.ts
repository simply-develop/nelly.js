import { Collection } from "../Collection";
export declare class Emoji {
    name: any;
    id: any;
    colons: any;
    roles: any;
    managed: any;
    animated: any;
    available: any;
    constructor(obj: any);
    get imageURL(): string;
    toString(): string;
}
export declare class BaseGuild {
    id: string;
    name: string;
    icon: string;
    desc: string;
    splash: any;
    discoverySplash: any;
    approximateMemberCount: any;
    approximatePresenceCount: any;
    features: any;
    emojis: Collection;
    banner: string;
    ownerId: string;
    applicationId: string;
    region: string;
    afkChannelId: string;
    afkTimeout: string;
    systemChannelId: string;
    widget: any;
    widgetChannelId: any;
    verificationLevel: string;
    roles: any[];
    defaultNotifications: string;
    mfaLevel: any;
    filterExplicit: string;
    maxPresences: any;
    maxMembers: string;
    vanityURL: string;
    boostTier: string;
    subscriptionPremium: any;
    systemChannelFlags: any;
    preferredLocale: string;
    rulesChannelId: string;
    publicUpdatesChannelId: string;
    constructor(obj: any, client: any, {}: {});
}
