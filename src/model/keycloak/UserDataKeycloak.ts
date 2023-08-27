export interface UserDataKeycloak {
    id: string;
    createdTimestamp?: number;
    username: string;
    enabled?: boolean;
    totp?: boolean;
    emailVerified?: boolean;
    firstName: string;
    lastName: string;
    email: string;
    attributes: AtibutosUser;
    disableableCredentialTypes?: string[];
    requiredActions?: string[];
    notBefore?: number;
    access?: {
        manageGroupMembership: boolean;
        view: boolean;
        mapRoles: boolean;
        impersonate: boolean;
        manage: boolean;
    };
}

export interface AtibutosUser {
    pictureId?: string[];
    lattes: string[];
    picture?: string[];
}