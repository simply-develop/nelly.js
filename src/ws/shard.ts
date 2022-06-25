import ws from "ws";
import { DiscordApiError } from "../errors/apiError";

var skipOP = [10, 11];

export class shard extends ws {
  shard_id: string;
  session_id: any;
  client: any;

  constructor(
    url: string,
    shardid: any,
    client: any,
    options: any = {},
    ...argument: any[]
  ) {
    super(url, ...argument);
    this.shard_id = shardid;
    Object.defineProperty(this, "client", {
      enumerable: false,
      value: client,
      writable: false,
    });
    if (options.sessionId) {
      this.session_id = options.sessionId;
    }

    this.on("message", (d) => {
      var jsondata = this.client.processData(d);
      if (options.sessionId && skipOP.includes(jsondata.op)) return;
      this.client.interact(jsondata, this);
    });
    this.on("close", () => {
      this.client.resume(this);
    });
    this.on("error", (e) => {
      throw new DiscordApiError(e);
      this.client.emit("error", e);
      
    });
  }

  get ping_pong() {
    return this.ping;
  }

  get connected() {
    return this.readyState == ws.OPEN;
  }

  format(data: object, type = "json") {
    return this.send(type == "json" ? JSON.stringify(data) : data);
  }

  stop() {
    this.removeAllListeners();
    this.close();
    this.terminate();
    this.client.shards.splice(this.shard_id, 1);
  }
}
