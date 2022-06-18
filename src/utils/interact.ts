import DispatchHandler from "../dispatchHandler";

export let oop = {
  [10]: function (data: any, shard: any) {
    shard.format({
      op: 1,
      d: data.d.heartbeat_interval,
    });
  },
  [11]: function (data: any, shard: any, client: any) {
    shard.format({
      op: 2,
      d: {
        token: client.token,
        intents: 516,
        shard: [shard.shard_id, client.shards.length],
        properties: {
          $os: "linux",
          $browser: "Discord iOS",
          $device: "discord.gblk",
        },
      },
    });
  },
  [0]: function (data: any, shard: any, client: any) {
    // ready
    DispatchHandler.raw(data, shard, client);
  },
  [9]: function (data: any, shard: any, client: any) {
    // Reconnect
    client.stop(false);
    client.login();
  },
};
