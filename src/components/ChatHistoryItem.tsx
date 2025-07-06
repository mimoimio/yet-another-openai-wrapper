"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Chat } from "@/types/chat";
import apiService from "@/services/api";

interface ChatHistoryItemProps {
    chat: Chat;
    isSelected?: boolean;
    onSelect?: (chatId: string) => void;
    onDelete?: (chatId: string) => void;
    onChatDeleted?: () => void; // Callback to refresh chat list after deletion
}

export function ChatHistoryItem({ chat, isSelected, onSelect, onDelete, onChatDeleted }: ChatHistoryItemProps) {
    const handleSelect = () => {
        onSelect?.(chat.chat_id);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();

        // Confirm deletion
        if (!confirm(`Are you sure you want to delete "${chat.title}"?`)) {
            return;
        }

        try {
            const success = await apiService.deleteChat(chat.chat_id);
            if (success) {
                console.log('Chat deleted successfully');
                // Call the legacy onDelete callback if provided
                onDelete?.(chat.chat_id);
                // Call the new callback to refresh the chat list
                onChatDeleted?.();
            } else {
                alert('Failed to delete chat. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting chat:', error);
            alert('An error occurred while deleting the chat.');
        }
    };

    return (
        <Card
            className={"p-3 cursor-pointer hover:bg-blue-200 transition-colors group" + (isSelected ? " bg-blue-100" : "")}
            onClick={handleSelect}
        >
            <div className="flex items-start justify-between">


                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate mb-1">
                        {chat.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{chat.created ? new Date(chat.created).toLocaleDateString() : "Today"}</span>
                    </div>
                </div>


                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleDelete}
                >
                    <Trash2 className="h-3 w-3" />
                </Button>
            </div>
        </Card>
    );
}
