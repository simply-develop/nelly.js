declare type collectionObj = {
    type?: 'User' | 'Guild' | 'Channel' | 'Emoji' | 'Other';
    client?: any;
};
export declare class Collection extends Map {
    fetchLinkType: string;
    _client: any;
    constructor(arr: any[], options?: collectionObj);
    get client(): any;
    get first(): any;
    get last(): any;
    array(): any[];
    find(fn?: () => void): any;
    map(fn?: () => void): void[];
    fetch(id: any, type?: number): Promise<unknown>;
}
export declare class ChannelCollection extends Collection {
    fetch(id: string, type?: number): Promise<unknown>;
}
export declare class UserCollection extends Collection {
    fetch(id: string, type?: number): Promise<unknown>;
}
export declare class EmojiCollection extends Collection {
}
export declare class GuildCollection extends Collection {
    fetch(id: string, type?: number): Promise<unknown>;
}
export {};
