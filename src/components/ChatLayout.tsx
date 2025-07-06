"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Chat, ChatHistoryProps } from "@/types/chat";
import apiService from "@/services/api";

// Context for chat data
interface ChatContextType {
    chats: Chat[];
    selectedChatId: string | null;
    loading: boolean;
    refreshChats: () => Promise<void>;
    createNewChat: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within ChatProvider');
    }
    return context;
};

interface ChatLayoutProps {
    children: React.ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Extract chat_id from pathname
    const selectedChatId = pathname === "/" ? null : pathname.split("/")[1];

    const refreshChats = async () => {
        setLoading(true);
        try {
            const fetchedChats = await apiService.getChats();
            setChats(fetchedChats);

            // If no chat is selected and we have chats, redirect to first chat
            if (!selectedChatId && fetchedChats.length > 0) {
                router.push(`/${fetchedChats[0].chat_id}`);
            }
        } catch (error) {
            console.error("Failed to load chats:", error);
        } finally {
            setLoading(false);
        }
    };

    const createNewChat = async () => {
        const newChat = await apiService.createChat("New Chat");
        if (newChat) {
            await refreshChats();
            router.push(`/${newChat.chat_id}`);
        }
    };

    useEffect(() => {
        refreshChats();
    }, []);

    const handleChatSelect = (chatId: string) => {
        console.log('Selecting chat:', chatId);
        router.push(`/${chatId}`);
    };

    const contextValue: ChatContextType = {
        chats,
        selectedChatId,
        loading,
        refreshChats,
        createNewChat,
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <ChatContext.Provider value={contextValue}>
            <div className="h-screen flex flex-col">
                <Header
                    chatHistory={chats}
                    selectedChatId={selectedChatId}
                    onChatSelect={handleChatSelect}
                    onNewChat={createNewChat}
                    onChatDeleted={refreshChats}
                    onChatUpdated={refreshChats}
                />
                <div className="flex-1 flex overflow-hidden">
                    <aside className="hidden md:flex w-80 border-r overflow-hidden">
                        <Sidebar
                            chatHistory={chats}
                            selectedChatId={selectedChatId}
                            onChatSelect={handleChatSelect}
                            onNewChat={createNewChat}
                            onChatDeleted={refreshChats}
                            onChatUpdated={refreshChats}
                        />
                    </aside>
                    <main className="flex-1 flex flex-col min-h-0">
                        {children}
                    </main>
                </div>
            </div>
        </ChatContext.Provider>
    );
}
