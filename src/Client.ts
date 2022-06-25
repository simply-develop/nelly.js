import { EventEmitter } from "stream";
import { shard } from "./ws/shard";
import {
  Collection,
  UserCollection,
  GuildCollection,
  ChannelCollection,
} from "./utils/Collection";
import fetch from "./ws/ws";
import { User } from "./utils/dataTypes/User";
import { oop } from "./utils/interact";
import { NellyError } from "./errors/error";
import { rejects } from "assert";

const base = "https://discord.com/api/v10/gateway/bot";

type clientOptions = {
  platform?: "desktop" | "web" | "mobile";
  intents?: number;
  token?: string;
  versionGateway?: number;
};

type statusOpt = {
  type?: string | number;
  afk?: boolean;
  platform?: "desktop" | "web" | "mobile";
};
/** The Client of WebSocket/Discord Bot */

export class Client extends EventEmitter {
  public shards: any[];
  private token: string;
  users: any;
  guilds: any;
  channels: any;
  user: User;
  protected _rawdata: any;
  private resumeTimes: any;
  private _session_start_limit: any;
  readyTimestamp: number;
  intents: number;
  platform: string;
  application: any;

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
    Object.defineProperty(this, "resumeTimes", {
      enumerable: false,
      writable: true,
      value: 0,
    });

    this.shards = [];

    this.intents = options.intents;
    this.platform = options.platform;
  }

  public ping() {
    return (
      this.shards.reduce((a, b) => a.ping + b.ping, 0) / this.shards.length
    );
  }

  public uptime() {
    return this.readyTimestamp && Date.now() - this.readyTimestamp;
  }

  login(token: string) {
    if (!token)
      throw new NellyError(
        "Please provide an token to start your Discord bot."
      );

    if (typeof token == "string")
      this.token = token = token.replace(/^(Bot|Bearer)\s*/i, "");

    try {
      let nshard = new shard(
        `wss://gateway.discord.gg/?v=10&encoding=json`,
        this.shards.length,
        this
      );

      this.shards.push(nshard);
    } catch {}
  }

  interact(data: any, shard: string) {
    const op = data.op;

    // @ts-ignore
    const method = oop[op];
    if (!method) throw new TypeError(`Hander not found ${op}`);

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

  resume(shardy: any) {
    const shardlamaID = shardy.shard_id,
      sessionID = shardy.session_id;
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

  public updateGuilds() {
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

  status(status: string, text: string, options: statusOpt = {}) {
    let { type } = options;
    var shard = this.shards.find((s) => s.connected);

    this.platform = options.platform || "web";

    let form;

    if (typeof type === "string")
      form = {
        PLAYING: 0,
        STREAMING: 1,
        LISTENING: 2,
        WATCHING: 3,
      };

    shard.format({
      op: 3,
      d: {
        since: Date.now(),
        activities: [
          {
            name: text,
            type: typeof type == "number" ? type : form[type],
          },
        ], // @ts-ignore
        status: status,
        afk: options.afk || false,
        client_status: options.platform || "web",
      },
    });
  }

  reset() {
    this.user = null;
    this._rawdata = null;
    this._session_start_limit = null;
    this.resumeTimes = 0;
    this.users = new Map();
    this.channels = new Map();
    this.guilds = new Map();
    this.shards = [];
  }

  public commands = {
    set: this.set,
    get: this.get,
  };

  private set(client: Client, array: any[], guild: string) {
    return new Promise( async (resolve, reject) => {
      if (array[0].name) {
        array.forEach((arr) => {

          if (guild) {
          
            let guil = this._rawdata?.d?.guilds?.find((a: any) => a.id === guild);

            if (!guil) guil = client.guilds?.fetch(guild);

            if (!guil)
              guil = client.apiRequest(
                `https://discord.com/api/v10/guilds/${guild}`,
                "get"
              );

            if (!guil)
              throw new NellyError("Guild with the id " + guild + " not found.");
          
            arr.guild_id = guild;
          }

          let base = `https://discord.com/api/v10/applications/${this.application?.id ? this.application.id : client.application.id
            }/commands`;
          if (guild)
            base = `https://discord.com/api/v10/applications/${this.application?.id ? this.application.id : client.application.id
              }/guilds/${guild}/commands`;
          client.apiRequest(base, "post", {
            body: JSON.stringify(arr),
          }).then((a: any) => resolve(a))
        });
      }
    })
  }

  private get(client: Client, guild: string) {
    if (guild) {
      let guil = this._rawdata?.d?.guilds?.find((a: any) => a.id === guild);

      if (!guil) guil = client.guilds?.fetch(guild);

      if (!guil)
        guil = client.apiRequest(
          `https://discord.com/api/v10/guilds/${guild}`,
          "get"
        );

      if (!guil)
        throw new NellyError("Guild with the id " + guild + " not found.");
    }
    let base = `https://discord.com/api/v10/applications/${
      this.application?.id ? this.application.id : client.application.id
    }/commands`;
    if (guild)
      base = `https://discord.com/api/v10/applications/${
        this.application?.id ? this.application.id : client.application.id
      }/guilds/${guild}/commands`;
    client.apiRequest(base, "get");
  }

  async apiRequest(
    route: URL | string,
    method: "get" | "post" | "put" | "patch",
    options: any = {}
  ) {
    if (!options?.headers) options.headers = {};
    options.headers.Authorization = `Bot ${this.token}`;
    options.headers["content-type"] = "application/json";
    return new fetch(route, options)[method]();
  }
}
