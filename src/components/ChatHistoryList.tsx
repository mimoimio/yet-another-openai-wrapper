"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";
import { ChatHistoryItem } from "@/components/ChatHistoryItem";
import { ChatHistoryProps } from "@/types/chat";

export function ChatHistoryList({ chats, selectedChatId, onChatSelect, onChatDelete, onChatDeleted, onChatUpdated }: ChatHistoryProps) {
    return (
        <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4 pb-2">
                <div className="flex items-center gap-2 mb-3">
                    <History className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Recent Chats</span>
                </div>
            </div>

            <ScrollArea className="flex-1 min-h-0">
                <div className="px-4 pb-4">
                    <div className="space-y-2">
                        {chats.length > 0 ? (
                            chats.map((chat) => (
                                <ChatHistoryItem
                                    key={chat.chat_id}
                                    chat={chat}
                                    isSelected={selectedChatId === chat.chat_id}
                                    onSelect={onChatSelect}
                                    onDelete={onChatDelete}
                                    onChatDeleted={onChatDeleted}
                                    onChatUpdated={onChatUpdated}
                                />
                            ))
                        ) : (
                            <div className="text-center text-muted-foreground text-sm py-8">
                                No chat history yet
                            </div>
                        )}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
