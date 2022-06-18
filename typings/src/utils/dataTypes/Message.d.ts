import { Member } from './User';
export declare class mentions {
    users: any;
    roles: any;
    everyone: any;
    constructor(d: any, client: any);
}
export declare class BaseMessage extends String {
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
    constructor(options: any, client: any);
    toString(): any;
}
