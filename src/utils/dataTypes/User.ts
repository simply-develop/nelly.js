export class User extends String {
  username: string;
  verified: any;
  MFA_Enabled: any;
  id: string;
  discriminator: string;
  bot: boolean;
  avatar: string;
  tag: string;

  constructor(user: any) {
    super(user.username);
    this.username = user.username;
    this.verified = user.verified;
    this.MFA_Enabled = user.mfa_enabled;
    this.id = user.id;
    this.discriminator = user.discriminator;
    this.bot = user.bot == true;
    this.avatar = user.avatar;
    this.tag = user.tag;
  }

  get mention() {
    return `<@${this.id}>`;
  }

  avatarURL(options: any = {}) {
    if (!this.avatar) return "https://cdn.discordapp.com/embed/avatars/0.png";
    return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}${
      options.format ? `.${options.format}` : ""
    }${options.format ? "." + options.format : ""}${
      options.size ? "?size=" + options.size : ""
    }`;
  }

  toString() {
    return `<@${this.id}>`;
  }
}

export class Member extends String {
  nickname: any;
  id: any;
  roles: any;
  premium: any;
  joinDate: Date;
  user: User;
  guild: any;

  constructor(msg: any) {
    super(`${msg.author.username}#${msg.author.discriminator}`);
    this.nickname = msg.member.nick;
    this.id = msg.author.id;
    this.roles = msg.member.roles;
    this.premium = msg.member.premium_since;
    this.joinDate = new Date(msg.member.joined_at);
    this.user = new User(msg.author);
    this.guild = msg.member.guild
  }

  toString() {
    return `<@${this.id}>`;
  }
}
