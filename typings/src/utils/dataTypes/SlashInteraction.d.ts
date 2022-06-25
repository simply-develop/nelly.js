import { Member } from "./User";
declare type msgSend = {
    content: string;
    components: any[];
    embeds: any[];
    referenced_message: any;
};
declare type interactionOptions = {
    interaction?: any;
    channel?: any;
    guild?: any;
    member?: any;
};
export declare class BaseSlash {
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
    constructor(options: interactionOptions, client: any);
    get _channelLink(): string;
    toString(): string;
    get client(): any;
    reply(text: string | msgSend, options: msgSend): Promise<unknown>;
    followUp(): Promise<unknown>;
}
export {};
