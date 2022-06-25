declare type msgSend = {
    content: string;
    components: any[];
    embeds: any[];
};
export declare class BaseChannel {
    name: string;
    position: string;
    category: string;
    typeChannel: string;
    id: string;
    _client: any;
    constructor(obj: any, client: any);
    get client(): any;
    get _channelLink(): string;
    toString(): string;
}
export declare class TextChannel extends BaseChannel {
    nsfw: any;
    topic: any;
    permission_overwrites: any;
    lastMsgId: any;
    pinTime: Date;
    constructor(obj: any, client: any);
    send(text: string | msgSend, options: msgSend): Promise<unknown>;
}
export declare class CategoryChannel extends BaseChannel {
    typeChannel: string;
    nsfw: string;
    constructor(obj: any, client: any);
}
export {};
