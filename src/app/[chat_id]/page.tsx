"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ChatDisplay } from "@/components/ChatDisplay";
import { Message } from "@/types/chat";
import apiService from "@/services/api";
import { useChatContext } from "@/components/ChatLayout";

export default function ChatPage() {
    const { chat_id } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const { refreshChats } = useChatContext();

    useEffect(() => {
        if (chat_id) {
            loadMessages();
        }
    }, [chat_id]);

    const loadMessages = async () => {
        if (!chat_id || typeof chat_id !== 'string') return;

        setLoading(true);
        try {
            const fetchedMessages = await apiService.getMessages(chat_id);
            setMessages(fetchedMessages);
        } catch (error) {
            console.error("Failed to load messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (content: string) => {
        if (!chat_id || typeof chat_id !== 'string') return;

        // Send message and get AI response from API
        const result = await apiService.sendMessage(chat_id, content);
        if (result) {
            setMessages(prev => [...prev, result.userMessage, result.aiMessage]);
            console.log('Message sent and AI responded');
        }
    };

    const handleReceiveAIMessage = async (content: string) => {
        // This function is no longer used for simulation
        // It could be used for manual AI message injection if needed
        if (!chat_id || typeof chat_id !== 'string') return;

        const aiMessage = await apiService.createMessage(chat_id, 'assistant', content);
        if (aiMessage) {
            setMessages(prev => [...prev, aiMessage]);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-lg">Loading messages...</div>
            </div>
        );
    }

    if (!chat_id) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-lg text-muted-foreground">Select a chat to start messaging</div>
            </div>
        );
    }

    return (
        <ChatDisplay
            messages={messages}
            onSendMessage={handleSendMessage}
            onReceiveAIMessage={handleReceiveAIMessage}
        />
    );
}
