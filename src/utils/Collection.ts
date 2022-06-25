import { Client } from "../Client";
import {
  BaseChannel,
  BaseGuild,
  BaseMessage,
  User,
  Member,
  TextChannel,
  CategoryChannel,
  Emoji,
} from "./dataTypes";

let typeData = {
  BaseChannel,
  BaseGuild,
  BaseMessage,
  User,
  Member,
  TextChannel,
  CategoryChannel,
  Emoji,
};

import enums from './enums'

type collectionObj = {
  type?: "users" | "guilds" | "channels" | "emojis";
  client?: Client
};

export class Collection extends Map {
  fetchLinkType: string;
  _client: any;

  constructor(arr: any[], options: collectionObj) {
    super();
    this.fetchLinkType = options.type;

    Object.defineProperty(this, "_client", {
      enumerable: false,
      writable: false,
      value: options.client,
    });
  }

  get client(): any {
    return this._client;
  }

  get first() {
    return this.array()[0];
  }
  get last() {
    var ar = this.array();
    return ar[ar.length - 1];
  }

  array() {
    return Array.from(this.values());
  }

  find(fn = () => {}) {
    return this.array().find(fn);
  }

  map(fn = () => {}) {
    return this.array().map(fn);
  }

  fetch(id: any, type = 0) {
    return new Promise((resolve, reject) => {
      this.client
        .apiRequest(
          `https://discord.com/api/v10/${this.fetchLinkType}/${id}`,
          "get"
        )
        .then((result: any) => {
          if (!result) return;
          const dataclass = this.client.create(
            this.fetchLinkType == "channels"
              ? type == 0
                ? typeData.TextChannel
                : typeData.CategoryChannel
              : typeData.User,
            result
          );
          if (!result.id) return;
          this.set(id.toString(), dataclass);
          return resolve(dataclass);
        })
        .catch(reject);
    });
  }
}

export class ChannelCollection extends Collection {
  fetch(id: string, type = 0) {
    return new Promise((resolve, reject) => {
      this.client
        .apiRequest(`https://discord.com/api/v10/channels/${id}`, "get")
        .then(async (result: any) => {
          if (!result || !result.id) return reject(result);
          const dataclass = this.client.create(//@ts-ignore
            typeData[enums.channelTypes[result.type as number]],
            result
          );
          if (result.parent_id) {
            try {
              dataclass.category = await this.fetch(result.parent_id);
            } catch (err) {}
          }
          this.set(id.toString(), dataclass);
          return resolve(dataclass);
        })
        .catch(reject);
    });
  }
}

export class UserCollection extends Collection {
  fetch(id: string, type = 0) {
    return new Promise((resolve, reject) => {
      this.client
        .apiRequest(`https://discord.com/api/v10/users/${id}`, "get")
        .then(async (result: any) => {
          if (!result || !result.id) return reject(result);
          const dataclass = this.client.create(typeData["User"], result);

          this.set(id.toString(), dataclass);
          return resolve(dataclass);
        })
        .catch(reject);
    });
  }
}

export class EmojiCollection extends Collection {}

export class GuildCollection extends Collection {
  fetch(id: string, type = 0) {
    return new Promise((resolve, reject) => {
      this.client
        .apiRequest(`https://discord.com/api/v10/guilds/${id}`, "get")
        .then(async (result: any) => {
          if (!result || !result.id) return reject(result);
          const dataclass = this.client.create(typeData["BaseGuild"], result, {
            EmojiCollection,
          });

          this.set(id.toString(), dataclass);
          return resolve(dataclass);
        })
        .catch(reject);
    });
  }
}
