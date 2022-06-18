const DispatchHandler: any = {};
import { BaseMessage } from "./utils/dataTypes/Message";

const message = (obj: any) => {
  return ["MESSAGE_CREATE", "MESSAGE_UPDATE"].includes(obj.t);
};

 DispatchHandler.raw = async function (data: any, shard: any, client: any) {
   const method = DispatchHandler[data.t];
    console.log(`[${data.t}]:  ${new Date().toLocaleString()}`);
    if (!method) {
      new TypeError(`Dispatch doesnt exist: ${data.t}`)
      
    }
  return method(data, shard, client);
};

DispatchHandler["READY"] = async function (data: any, shard: any, client: any) {
  shard.session_id = data.d.session_id;
  client.ready(data, this.resumeTimes);
};

DispatchHandler["MESSAGE_CREATE"] = async function (data: any, shard: any, client: any) {
  const author =
    client.users.get(data.d.author.id) ||
    (await client.users.fetch(data.d.author.id));
  const guild =
    client.guilds.get(data.d.guild_id) ||
    (await client.guilds.fetch(data.d.guild_id));
  const channel =
    client.channels.get(data.d.channel_id) ||
    (await client.channels.fetch(data.d.channel_id));
  const message = new BaseMessage(
    { msg: data.d, channel, guild, author },
    client
  );
  client.emit("messageCreate", message);
};

DispatchHandler["MESSAGE_UPDATE"] = async function (data: any, shard: any, client: any) {
  const author =
    client.users.get(data.d.author.id) ||
    (await client.users.fetch(data.d.author.id));
  const channel =
    client.channels.get(data.d.channel_id) ||
    (await client.channels.fetch(data.d.channel_id));

  const message = new BaseMessage(
    { msg: data.d, channel, author },
    client
  );
  client.emit("messageUpdate", message);
};

export default DispatchHandler