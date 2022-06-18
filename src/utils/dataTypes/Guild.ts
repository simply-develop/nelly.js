import { Collection } from "../Collection";

export class Emoji {
  name: any;
  id: any;
  colons: any;
  roles: any;
  managed: any;
  animated: any;
  available: any;

  constructor(obj: any) {
    this.name = obj.name;
    this.id = obj.id;
    this.colons = obj.require_colons;
    this.roles = obj.roles;
    this.managed = obj.managed;
    this.animated = obj.animated;
    this.available = obj.available;
  }

  get imageURL() {
    return `https://cdn.discordapp.com/emojis/${this.id}`;
  }

  toString() {
    return `<${this.animated ? "a" : ""}:${this.name}:${this.id}>`;
  }
}

export class BaseGuild {
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

  constructor(obj: any, client: any, {}) {
    this.id = obj.id;
    this.name = obj.name;
    this.icon = obj.icon;
    this.desc = obj.description;
    this.splash = obj.splash;
    this.discoverySplash = obj.discovery_splash;
    this.approximateMemberCount = obj.approximate_member_count;
    this.approximatePresenceCount = obj.approximate_presence_count;
    this.features = obj.features;
    this.emojis = new Collection(
      obj.emojis.map((e: any) => [e.id, new Emoji(e)]),
      { client, type: "Emoji" }
    );
    this.banner = obj.banner;
    this.ownerId = obj.owner_id;
    this.applicationId = obj.application_id;
    this.region = obj.region;
    this.afkChannelId = obj.afk_channel_id;
    this.afkTimeout = obj.afk_timeout;
    this.systemChannelId = obj.system_channel_id;
    this.widget = obj.widget_enabled;
    this.widgetChannelId = obj.widget_channel_id;
    this.verificationLevel = obj.verification_level;
    this.roles = obj.roles;
    this.defaultNotifications = obj.default_message_notifications;
    this.mfaLevel = obj.mfa_level;
    this.filterExplicit = obj.explicit_content_filter;
    this.maxPresences = obj.max_presences;
    this.maxMembers = obj.max_members;
    this.vanityURL = obj.vanity_url_code;
    this.boostTier = obj.premium_tier;
    this.subscriptionPremium = obj.premium_subscription_count;
    this.systemChannelFlags = obj.system_channel_flags;
    this.preferredLocale = obj.preferred_locale;
    this.rulesChannelId = obj.rules_channel_id;
    this.publicUpdatesChannelId = obj.public_updates_channel_id;
  }
}