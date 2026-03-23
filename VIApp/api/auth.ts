const API_URL = "http://10.154.213.243:5147";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export const login = async (request: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
};

export const register = async (request: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
};