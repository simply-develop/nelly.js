import { Member } from './User';
declare type msgSend = {
    content: string;
    components: any[];
    embeds: any[];
    referenced_message: any;
};
declare type messageOptions = {
    msg?: any;
    channel?: any;
    guild?: any;
    author?: any;
};
export declare class mentions {
    users: any;
    roles: any;
    everyone: any;
    constructor(d: any, client: any);
}
export declare class BaseMessage {
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
    constructor(options: messageOptions, client: any);
    get _channelLink(): string;
    toString(): string;
    get client(): any;
    reply(text: string | msgSend, options: msgSend): Promise<unknown>;
}
export {};
