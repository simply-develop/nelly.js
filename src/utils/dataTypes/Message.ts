import { Member } from './User'


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

export class BaseMessage extends String {
  content: any;
  tts: any;
  timeStamp: Date;
  pin: any;
  mentions: mentions;
  member: Member;
  author: any;
  channel: any;
  reply: any;
  guild: any;

  constructor(options: any = {}, client: any) {
    let { msg, channel, guild, author } = options
    super(msg.content);
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
    this.reply = msg.referenced_message;
    this.guild = guild;
    this.member.guild = this.guild;
  }

  toString() {
    return this.content;
  }
}
