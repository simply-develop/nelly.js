import { Member } from "./User";

type msgSend = {
  content: string;
  components: any[];
  embeds: any[];
  referenced_message: any;
};

type interactionOptions = {
  interaction?: any;
  channel?: any;
  guild?: any;
  member?: any;
};

export class BaseSlash {
  content: string;
  tts: any;
  timeStamp: Date;
  pin: any;
  member: Member;
  author: any;
  channel: any;
  repli: any;
  guild: any;
  _client: any;
  interaction: any;
  id?: any;

  constructor(options: interactionOptions = {}, client: any) {
    let { interaction, channel, guild, member } = options;
    this.interaction = interaction;
    this._client = client;
    this.timeStamp = new Date();
    this.member = new Member({ interaction, member: member.user });
    this.author = this.member.user;
    this.channel = channel;
    this.guild = guild;
    this.id = interaction.data.id
    this.member.guild = this.guild;
  }

  get _channelLink() {
    return `https://discord.com/api/v10/channels/${this.channel.id}`;
  }

  toString() {
    return this.content;
  }

  get client() {
    return this._client;
  }

  reply(text: string | msgSend, options: msgSend) {
    let link = `https://discord.com/api/v10/interactions/${this.id}/${this.interaction.token}/callback`

    const dato =
      typeof text == "string"
        ? {
            content: text,
            ...options,
          }
        : text;
    
    let data = {
      type: 4,
      data: dato
    }
    

    return new Promise((resolve, reject) => {
       let link = `https://discord.com/api/v10/interactions/${this.id}/${this.interaction.token}/callback`;
      this.client
        .apiRequest(link, "post", {
          body: JSON.stringify(data),
        })
        .then((r: any) => {
          resolve(r);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  followUp() {
    let link = `https://discord.com/api/v10/webhooks/${this.client.application.id}/${this.interaction.token}`;
    return new Promise((resolve, reject) => {
      this.client
        .apiRequest(link, "post", {
          body: JSON.stringify({ wait: true }),
        })
        .then((r: any) => {
          resolve(r);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}
