type msgSend = {
  content: string;
  components: any[];
  embeds: any[];
};

export class BaseChannel {
  name: string;
  position: string;
  category: string;
  typeChannel: string;
  id: string;
  _client: any;

  constructor(obj: any, client: any) {
    this.id = obj.id;
    this.typeChannel = "unknown";
    Object.defineProperty(this, "_client", {
      enumerable: false,
      writable: false,
      value: client,
    });
    this.position = obj.position;
    this.name = obj.name;
    this.category = null;
    if (obj.parent_id) this.category = obj.parent_id;
  }

  get client() {
    return this._client;
  }

  get _channelLink() {
    return `https://discord.com/api/v10/channels/${this.id}`;
  }

  toString() {
    return `<#${this.id}>`;
  }
}

export class TextChannel extends BaseChannel {
  nsfw: any;
  topic: any;
  permission_overwrites: any;
  lastMsgId: any;
  pinTime: Date;
  constructor(obj: any, client: any) {
    super(obj, client);
    this.typeChannel = "text";
    this.nsfw = obj.nsfw;
    this.topic = obj.topic;
    this.permission_overwrites = obj.permission_overwrites;
    this.lastMsgId = obj.last_message_id;
    this.pinTime = new Date(obj.last_pin_timestamp);
  }

  send(text: string | msgSend, options: msgSend) {
    const link = this._channelLink + "/messages";

    const data =
      typeof text == "string"
        ? {
            content: text,
            ...options,
          }
        : text;

    if (data.embeds) {
      if (!Array.isArray(data.embeds)) data.embeds = [data.embeds];
    }

    if (data.components) {
      if (!Array.isArray(data.components)) data.components = [data.components];
    }

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

export class CategoryChannel extends BaseChannel {
  typeChannel: string;
  nsfw: string;

  constructor(obj: any, client: any) {
    super(obj, client);
    this.typeChannel = "category";
    this.nsfw = obj.nsfw;
  }
}
