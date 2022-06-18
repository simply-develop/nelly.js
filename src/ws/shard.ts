import ws from 'ws'

var skipOP = [10, 11]

export type ShardOpt = {
  sessionId?: string
}
export class shard extends ws {
  private shard_id: any;
  public session_id: any;
  public client: any;

  constructor(url: string, shardid: any, client: any, options: ShardOpt = {}, ...argument: any[]) {
    super(url, ...argument)
    this.shard_id = shardid
    Object.defineProperty(this, "client", {
      enumerable: false,
      value: client,
      writable: false
    })
    if (options.sessionId) {
      this.session_id = options.sessionId
    }

    this.on("message", (d) => {
      var jsondata = this.client.processData(d);
      if (options.sessionId && skipOP.includes(jsondata.op)) return;
      this.client.interact(jsondata, this)
    })
    this.on("close", () => {
      this.client.resume(this)
    })
    this.on("error", (e) => {
      this.client.emit("error", e)
    })
  }
  
  get ping_pong() {
    return this.ping
  }
  
  get connected() {
    return this.readyState == ws.OPEN;
  }

  format(data: object, type = "json") {
    return this.send(type == "json" ? JSON.stringify(data) : data)
  }

  stop() {
    this.removeAllListeners();
    this.close();
    this.terminate();
    this.client.shards.splice(this.shard_id, 1);
  }
}