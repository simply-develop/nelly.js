interface choice {
    name?: string;
    value?: string;
}
interface options {
    type?: number | "SUB_COMMAND" | "SUB_COMMAND_GROUP" | "STRING" | "INTEGER" | "BOOLEAN" | "USER" | "CHANNEL" | "ROLE" | "MENTIONABLE" | "NUMBER" | "ATTACHMENT";
    name?: string;
    description?: string;
    required?: boolean;
    choices: choice[];
}
declare type SlashOpt = {
    name?: string;
    description?: string;
    options?: options[];
    adminOnly?: boolean;
};
export declare class SlashCommand {
    name: string;
    description: string;
    options: options[];
    adminOnly?: boolean;
    type: number;
    default_member_permissions: any;
    constructor(options?: SlashOpt);
    setName(string: string): this;
    setDescription(string: string): this;
    setOptions(array: options[]): this;
    setAdminOnly(boolean: boolean): this;
}
export {};
