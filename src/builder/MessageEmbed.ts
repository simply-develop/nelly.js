import { NellyError } from "../errors/error";

type embedOptions = {
  color?: `#${string}` | string | number[];
  title?: string;
  description?: string;
  author?: string | { name?: string; iconURL?: string; URL?: string };
  url?: string;
  timestamp?: string | number | Date;
  footer?: string | { text?: string; iconURL?: string };
  type?: "rich";
  image?:
    | string
    | { url?: string; height?: number | string; width?: number | string };
  thumbnail?:
    | string
    | { url?: string; height?: number | string; width?: number | string };
};

export class MessageEmbed {
  color?: `#${string}` | string | number[];
  title?: string;
  description?: string;
  author?: string | { name?: string; iconURL?: string; URL?: string };
  url?: string;
  timestamp?: string | number | Date;
  footer?: string | { text?: string; iconURL?: string };
  type?: "rich";
  image?:
    | string
    | { url?: string; height?: number | string; width?: number | string };
  thumbnail?:
    | string
    | { url?: string; height?: number | string; width?: number | string };

  constructor(options: embedOptions = {}) {
    if (options) {
      this.type = "rich";
      this.title = options.title;
      this.description = options.description;

      if (typeof options.author == "string") {
        options.author = { name: options.author };
      }

      this.author = options.author;
      this.color = options.color;
      this.url = options.url;

      options.timestamp = this.timestamp
        ? new Date(this.timestamp).toISOString()
        : undefined;

      this.timestamp = options.timestamp;

      if (typeof options.footer == "string") {
        options.footer = { text: options.footer };
      }

      this.footer = options.footer;
    }
  }

  public setColor(hex: `#${string}` | string | number[]): this {
    this.color = hex;
    return this;
  }

  public setTitle(string: string): this {
    this.title = string;
    return this;
  }

  public setDescription(string: string): this {
    this.description = string;
    return this;
  }

  public setURL(url: string): this {
    this.url = url;
    return this;
  }

  public setAuthor(
    data: string | { name?: string; iconURL?: string; URL?: string },
    iconURL: string
  ): this {
    if (typeof data == "string") {
      data = { name: data };
    }
    if (iconURL && iconURL?.startsWith("http")) {
      data.iconURL = iconURL;
    }

    if (!data.name)
      throw new NellyError("Expected an string for the author name. Returned: " + data.name,
      );

    this.author = data;

    return this;
  }

  public setFooter(
    data: string | { text?: string; iconURL?: string },
    iconURL: string
  ): this {
    if (typeof data == "string") {
      data = { text: data };
    }
    if (iconURL && iconURL?.startsWith("http")) {
      data.iconURL = iconURL;
    }

    if (!data.text)
      throw new NellyError(
       "Expected an string for the footer name. Returned: " + data.text,
      );

    this.footer = data;

    return this;
  }

  public setTimestamp(time: number | Date = Date.now()): this {
    this.timestamp = time ? new Date(time).toISOString() : undefined;

    return this;
  }

  public setImage(
    url:
      | string
      | { url?: string; height?: number | string; width?: number | string }
  ): this {
    if (typeof url == "string") {
      url = { url: url };
    }

    this.image = url;
    return this;
  }

  public setThumbnail(
    url:
      | string
      | { url?: string; height?: number | string; width?: number | string }
  ): this {
    if (typeof url == "string") {
      url = { url: url };
    }

    this.thumbnail = url;
    return this;
  }
}
