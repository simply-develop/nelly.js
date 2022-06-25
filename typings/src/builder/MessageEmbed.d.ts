declare type embedOptions = {
    color?: `#${string}` | string | number[];
    title?: string;
    description?: string;
    author?: string | {
        name?: string;
        iconURL?: string;
        URL?: string;
    };
    url?: string;
    timestamp?: string | number | Date;
    footer?: string | {
        text?: string;
        iconURL?: string;
    };
    type?: "rich";
    image?: string | {
        url?: string;
        height?: number | string;
        width?: number | string;
    };
    thumbnail?: string | {
        url?: string;
        height?: number | string;
        width?: number | string;
    };
};
export declare class MessageEmbed {
    color?: `#${string}` | string | number[];
    title?: string;
    description?: string;
    author?: string | {
        name?: string;
        iconURL?: string;
        URL?: string;
    };
    url?: string;
    timestamp?: string | number | Date;
    footer?: string | {
        text?: string;
        iconURL?: string;
    };
    type?: "rich";
    image?: string | {
        url?: string;
        height?: number | string;
        width?: number | string;
    };
    thumbnail?: string | {
        url?: string;
        height?: number | string;
        width?: number | string;
    };
    constructor(options?: embedOptions);
    setColor(hex: `#${string}` | string | number[]): this;
    setTitle(string: string): this;
    setDescription(string: string): this;
    setURL(url: string): this;
    setAuthor(data: string | {
        name?: string;
        iconURL?: string;
        URL?: string;
    }, iconURL: string): this;
    setFooter(data: string | {
        text?: string;
        iconURL?: string;
    }, iconURL: string): this;
    setTimestamp(time?: number | Date): this;
    setImage(url: string | {
        url?: string;
        height?: number | string;
        width?: number | string;
    }): this;
    setThumbnail(url: string | {
        url?: string;
        height?: number | string;
        width?: number | string;
    }): this;
}
export {};
