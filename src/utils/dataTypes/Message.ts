import { Member } from './User'

type msgSend = {
  content: string;
  components: any[];
  embeds: any[];
  referenced_message: any
};

type messageOptions = {
  msg?: any;
  channel?: any;
  guild?: any;
  author?: any;
}
export class mentions {
  users: any;
  roles: any;
  everyone: any;
  constructor(d: any, client: any) {
    this.users = d.mentions;
    this.roles = d.roles;
    this.everyone = d.everyone;
  }
}

export class BaseMessage {
  content: string;
  tts: any;
  timeStamp: Date;
  pin: any;
  mentions: mentions;
  member: Member;
  author: any;
  channel: any;
  repli: any;
  guild: any;
  _client: any;
  msg: any;

  constructor(options: messageOptions = {}, client: any) {
    let { msg, channel, guild, author } = options;
    this.msg = msg
    this._client = client;
    this.content = msg.content;
    this.tts = msg.tts;
    this.timeStamp = new Date(msg.timestamp);
    this.pin = msg.pinned;
    this.mentions = new mentions(
      {
        mentions: msg.mentions,
        roles: msg.mention_roles,
        everyone: msg.mention_everyone,
      },
      client
    );
    this.member = new Member({ msg, author });
    this.author = this.member.user;
    this.channel = channel;
    this.repli = msg.referenced_message;
    this.guild = guild;
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
    const link = this._channelLink + "/messages";

    if (typeof text != 'string') {
      text.referenced_message = this.msg;
    }
    const data =
      typeof text == "string"
        ? {
            content: text,
            ...options,
            referenced_message: this.msg
          }
        : text;

    return new Promise((resolve, reject) => {
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
}
