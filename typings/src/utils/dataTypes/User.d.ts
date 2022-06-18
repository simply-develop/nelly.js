export declare class User extends String {
    username: string;
    verified: any;
    MFA_Enabled: any;
    id: string;
    discriminator: string;
    bot: boolean;
    avatar: string;
    tag: string;
    constructor(user: any);
    get mention(): string;
    avatarURL(options?: any): string;
    toString(): string;
}
export declare class Member extends String {
    nickname: any;
    id: any;
    roles: any;
    premium: any;
    joinDate: Date;
    user: User;
    guild: any;
    constructor(msg: any);
    toString(): string;
}
