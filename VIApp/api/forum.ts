const API_URL = "http://10.154.213.243:5147";

export interface CreateForumPostRequest {
    title: string;
    description: string;
    isAnonymous: boolean;
}

export interface ForumPost {
    id: number;
    title: string;
    description: string;
    isAnonymous: boolean;
    userId: number | null;
}

export const createForumPost = async (request: CreateForumPostRequest, token: string): Promise<ForumPost> => {
    const response = await fetch(`${API_URL}/forum`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
};

export const getForumPosts = async (): Promise<ForumPost[]> => {
    const response = await fetch(`${API_URL}/forum`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return await response.json();
};