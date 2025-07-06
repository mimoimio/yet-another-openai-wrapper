// Chat history props for components
export interface ChatHistoryProps {
    chats: Chat[];
    selectedChatId?: string | null;
    onChatSelect?: (chatId: string) => void;
    onChatDelete?: (chatId: string) => void;
    onChatDeleted?: () => void; // Callback to refresh chat list after deletion
}

// PocketBase data model
export interface Chat {
    chat_id: string;
    title: string;
    created?: string;
    updated?: string;
}

export interface Message {
    msg_id: string;
    chat_id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    created?: string;
    updated?: string;
}
