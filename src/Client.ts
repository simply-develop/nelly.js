import { EventEmitter } from "stream";
import { shard } from './ws/shard';
import { Collection } from "./utils/Collection";
import fetch from './ws/ws'
import { User } from "./utils/dataTypes/User";
import { oop } from './utils/interact'

const base = "https://discord.com/api/v10/gateway/bot"

type clientOptions = {
  token?: string;
  versionGateway?: number
}

export class Client extends EventEmitter {
  public shards: any[];
  private token: string;
  users: any;
  guilds: any;
  channels: any;
  user: any;
  _rawdata: any;
  resumeTimes: any;

  constructor(options: clientOptions = {}) {
    super();

    Object.defineProperty(this, "token", {
      enumerable: false,
      writable: true,
      value: options.token,
    });
    Object.defineProperty(this, "gateway", {
      enumerable: false,
      writable: false,
      value: options.versionGateway || 10,
    });

    this.shards = [];

    this.users = new Collection([], { type: "User", client: this });
    this.guilds = new Collection([], { type: "Guild", client: this });
    this.channels = new Collection([], { type: "Channel", client: this });
  }

  get ping() {
    return (
      this.shards.reduce((a, b) => a.ping + b.ping, 0) / this.shards.length
    );
  }

  login(token: string) {
    if (typeof token == "string") this.token = token;
    const nshard = new shard(
      `wss://gateway.discord.gg/?v=10&encoding=json`,
      this.shards.length,
      this
    );

    this.shards.push(nshard);
  }

  interact(data: any, shard: string) {
    const op = data.op;

    // @ts-ignore
    const method = oop[op];
    if (!method) throw new TypeError(`ga ada handler op ${op}`);

    return method(data, shard, this);
  }

  processData(data: string) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  ready(data: object, first: boolean) {
    Object.defineProperty(this, "_rawdata", {
      enumerable: false,
      writable: true,
      value: data,
    });
    if (first) {
      this.apiRequest(base, "get", {
        headers: {
          "content-type": "application/json",
        },
      }).then(async (data: any) => {
        Object.defineProperty(this, "_session_start_limit", {
          enumerable: false,
          writable: true,
          value: data.session_start_limit,
        });
      });
      this.user = new User(this._rawdata.d.user);

      this.emit("ready", this);
    }
  }

  create(type: any, data: any, ...add: any) {
    return new type(data, this, ...add);
  }

  resume(shard: any) {
    const shardlamaID = shard.shard_id,
      sessionID = shard.session_id;
    this.shards.splice(shardlamaID, 1);
    const nshard = new shard(
      `wss://gateway.discord.gg/?v=10&encoding=json`,
      this.shards.length,
      this,
      { sessionID }
    );

    this.resumeTimes++;

    nshard.once("open", () => {
      nshard.format({
        op: 6,
        d: {
          token: this.token,
          session_id: sessionID,
          seq: 1337,
        },
      });
    });
    this.shards[shardlamaID] = nshard;
  }

  apiRequest(
    route: URL | string,
    method: "get" | "post" | "put" | "patch",
    options: any
  ) {
    if (!options?.headers) options.headers = {};
    options.headers.Authorization = `Bot ${this.token}`;
    options.headers["content-type"] = "application/json";
    return new fetch(route, options)[method]();
  }

  updateGuilds() {
    const guildsArray = this._rawdata.d.guilds;
    for (var i = 0; i < guildsArray.length; i++) {
      var shard = this.shards.find((s) => s.connected);
      var _rawguild = guildsArray[i];
      shard.format({
        op: 8,
        d: {
          guild_id: _rawguild.id,
          query: "",
          limit: 0,
        },
      });
    }
  }

  updateStatus(status: string, type: any, text: string, options: any = {}) {
    var shard = this.shards.find((s) => s.connected);

    shard.format({
      op: 3,
      d: {
        since: Date.now(),
        activities: [
          {
            name: text,
            type: type,
          },
        ],
        status: type,
        afk: options.afk || false,
      },
    });
  }
}