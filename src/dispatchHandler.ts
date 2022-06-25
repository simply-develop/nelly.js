const DispatchHandler: any = {};
import { Client } from "./Client";
import { GuildCollection, UserCollection, ChannelCollection, EmojiCollection } from "./utils/Collection";
import { BaseChannel, BaseGuild, User, Member, TextChannel, CategoryChannel, Emoji, BaseSlash } from "./utils/dataTypes";
import { BaseMessage } from "./utils/dataTypes/Message";


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


 DispatchHandler.raw = async function (data: any, shard: any, client: any) {
   const method = DispatchHandler[data.t];
    
    if (!method) {
      new TypeError(`Dispatch doesnt exist: ${data.t}`)
      
   }
   try {
     return method(data, shard, client);
   } catch { }
};

DispatchHandler["READY"] = async function (data: any, shard: any, client: Client) {
  shard.session_id = data.d.session_id;

  client.application = data.d.application,

  client.ready(data, true);

  client.users = new UserCollection([], { type: "users", client: client });
  client.guilds = new GuildCollection([], { type: "guilds", client: client });

  client.channels = new ChannelCollection([], {
    type: "channels",
    client: client,
  });

  data.d.guilds.forEach((g: any) => {
    if (g.id) {
      client
        .apiRequest(`https://discord.com/api/v10/guilds/${g.id}`, "get")
        .then(async (result: any) => {
          if (!result || !result.id) return;
          const dataclass = client.create(typeData["BaseGuild"], result, {
            EmojiCollection,
          });

          client.guilds.set(g, dataclass);
        })
    }  
  });

};

DispatchHandler["MESSAGE_CREATE"] = async function (data: any, shard: any, client: any) {
  
  const author = await client.users.fetch(data.d.author.id)
  const guild = await client.guilds.fetch(data.d.guild_id)
  const channel = await client.channels.fetch(data.d.channel_id)

  const message: BaseMessage = new BaseMessage(
    { msg: data.d, channel, guild, author },
    client
  );

  client.emit("messageCreate", message);
};

DispatchHandler["INTERACTION_CREATE"] = async function (
  data: any,
  shard: any,
  client: any
) {
  const member = await client.users.fetch(data.d.member.user.id);
  const guild = await client.guilds.fetch(data.d.guild_id);
  const channel = await client.channels.fetch(data.d.channel_id);

  const interaction: BaseSlash = new BaseSlash(
    { interaction: data.d, channel, guild, member },
    client
  );

  client.emit("interactionCreate", interaction);
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