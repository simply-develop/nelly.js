interface choice {
  name?: string;
  value?: string;
}

let ty: any = {
  "SUB_COMMAND": 1,
  "SUB_COMMAND_GROUP": 2,
  "STRING": 3,
  "INTEGER": 4,
  "BOOLEAN": 5,
  "USER": 6,
  "CHANNEL": 7,
  "ROLE": 8,
  "MENTIONABLE": 9,
  "NUMBER": 10,
  "ATTACHMENT": 11
}

interface options {
  type?: number
    | "SUB_COMMAND"
    | "SUB_COMMAND_GROUP"
    | "STRING"
    | "INTEGER"
    | "BOOLEAN"
    | "USER"
    | "CHANNEL"
    | "ROLE"
    | "MENTIONABLE"
    | "NUMBER"
    | "ATTACHMENT";
  name?: string;
  description?: string;
  required?: boolean;
  choices: choice[];
}

type SlashOpt = {
  name?: string;
  description?: string;
  options?: options[];
  adminOnly?: boolean;
};

export class SlashCommand {
  name: string;
  description: string;
  options: options[];
  adminOnly?: boolean;
  type: number;
  default_member_permissions: any;

  constructor(options: SlashOpt = {}) {
    
    this.name = options?.name?.toLowerCase();
    this.type = 1;
    this.description = options.description;
    this.options = options.options;
    this.default_member_permissions =
      (options.adminOnly
        ? (this.default_member_permissions = "0")
        : 0x0000000000000800)
  
  }

  setName(string: string) {
    this.name = string?.toLowerCase();

    return this;
  }

  setDescription(string: string) {
    this.description = string;

    return this;
  }

  setOptions(array: options[]) {
    this.options = array;

    array.forEach(a => {
      a.type = ty[a.type]
      a.name = a.name?.toLowerCase();
    })
    return this
  }

  setAdminOnly(boolean: boolean) {
    this.default_member_permissions = boolean
      ? (this.default_member_permissions = "0")
      : 0x0000000000000800;

    return this
  }

}
