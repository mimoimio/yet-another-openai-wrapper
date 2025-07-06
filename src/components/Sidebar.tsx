"use client";


import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "@/components/SidebarHeader";
import { SidebarFooter } from "@/components/SidebarFooter";
import { ChatHistoryList } from "@/components/ChatHistoryList";
import { Chat } from "@/types/chat";

interface SidebarProps {
    chatHistory: Chat[];
    selectedChatId: string | null;
    onChatSelect: (chatId: string) => void;
    onNewChat?: () => void;
    onChatDeleted?: () => void;
    onChatUpdated?: () => void;
}

export function Sidebar({ chatHistory, selectedChatId, onChatSelect, onNewChat, onChatDeleted, onChatUpdated }: SidebarProps) {
    // You can add handlers for new chat, delete, settings as needed
    return (
        <div className="flex flex-col h-full w-full bg-background border-r">
            <SidebarHeader onNewChat={onNewChat} />
            <Separator />
            <ChatHistoryList
                chats={chatHistory}
                selectedChatId={selectedChatId}
                onChatSelect={onChatSelect}
                onChatDelete={() => { }}
                onChatDeleted={onChatDeleted}
                onChatUpdated={onChatUpdated}
            />
            <Separator />
            <SidebarFooter onSettings={() => { }} />
        </div>
    );
}
