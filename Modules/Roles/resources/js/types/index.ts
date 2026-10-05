export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserSummary {
    id: number;
    name: string;
    email: string;
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    permissions?: Permission[];
    users?: UserSummary[];
    users_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface RoleFormData {
    name: string;
    guard_name: string;
    permissions: string[];
}
