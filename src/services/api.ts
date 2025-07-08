import { Chat, Message } from '@/types/chat';

class ApiService {
    private baseUrl = '';

    // Chat methods
    async getChats(): Promise<Chat[]> {
        try {
            const response = await fetch('/api/chats');
            if (!response.ok) {
                throw new Error('Failed to fetch chats');
            }
            return await response.json();
        } catch (error: any) {
            // Check if this is an auto-cancellation or abort error
            if (error?.name === 'AbortError' || error?.code === 20) {
                // This is an auto-cancellation, which is expected behavior
                // console.log('Request was auto-cancelled (this is normal when navigating quickly)');
                return [];
            }
            console.error('Error fetching chats:', error);
            return [];
        }
    }

    async createChat(title: string): Promise<Chat | null> {
        try {
            const response = await fetch('/api/chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            if (!response.ok) {
                throw new Error('Failed to create chat');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating chat:', error);
            return null;
        }
    }

    async updateChat(chatId: string, title: string): Promise<Chat | null> {
        try {
            const response = await fetch(`/api/chats/${chatId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            if (!response.ok) {
                throw new Error('Failed to update chat');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating chat:', error);
            return null;
        }
    }

    async deleteChat(chatId: string): Promise<boolean> {
        try {
            const response = await fetch(`/api/chats/${chatId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete chat');
            }
            return true;
        } catch (error) {
            console.error('Error deleting chat:', error);
            return false;
        }
    }

    // Message methods
    async getMessages(chatId: string): Promise<Message[]> {
        try {
            const response = await fetch(`/api/messages?chat_id=${chatId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            return await response.json();
        } catch (error: any) {
            // Check if this is an auto-cancellation or abort error
            if (error?.name === 'AbortError' || error?.code === 20) {
                // This is an auto-cancellation, which is expected behavior
                // console.log('Request was auto-cancelled (this is normal when navigating quickly)');
                return [];
            }
            console.error('Error fetching messages:', error);
            return [];
        }
    }

    async createMessage(chatId: string, role: 'user' | 'assistant' | 'system', content: string): Promise<Message | null> {
        // console.log('createMessage is called');
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat_id: chatId, role, content }),
            });
            if (!response.ok) {
                throw new Error('Failed to create message');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating message:', error);
            return null;
        }
    }

    async updateMessage(messageId: string, content: string): Promise<Message | null> {
        try {
            const response = await fetch(`/api/messages/${messageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });
            if (!response.ok) {
                throw new Error('Failed to update message');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating message:', error);
            return null;
        }
    }

    async deleteMessage(messageId: string): Promise<boolean> {
        try {
            const response = await fetch(`/api/messages/${messageId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete message');
            }
            return true;
        } catch (error) {
            console.error('Error deleting message:', error);
            return false;
        }
    }

    // Send message and get AI response
    async sendMessage(chatId: string, content: string): Promise<{ userMessage: Message; aiMessage: Message; updatedChat?: Chat } | null> {
        try {
            const response = await fetch(`/api/chats/${chatId}/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            return await response.json();
        } catch (error) {
            console.error('Error sending message:', error);
            return null;
        }
    }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
