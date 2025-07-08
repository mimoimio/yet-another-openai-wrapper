"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Copy, ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";

import { Message } from "@/types/chat";

interface ChatDisplayProps {
    messages: Message[];
    onSendMessage: (msg: string) => Promise<void>;
    onDeleteMessage?: (messageId: string) => Promise<void>;
}

import { useState } from "react";

export function ChatDisplay({ messages, onSendMessage, onDeleteMessage }: ChatDisplayProps) {
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;
        setIsLoading(true);
        await onSendMessage(inputMessage);
        setInputMessage("");
        setIsLoading(false);
    };

    const handleDeleteMessage = async (messageId: string) => {
        if (!confirm("Are you sure you want to delete this message?")) {
            return;
        }

        if (onDeleteMessage) {
            await onDeleteMessage(messageId);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 min-h-0">
                <div className="p-4">
                    <div className="space-y-6 max-w-3xl mx-auto">
                        {messages.map((message) => (
                            <div key={message.msg_id}
                                className={`flex gap-3 group ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                {message.role === "assistant" && (
                                    <Avatar className="h-8 w-8 mt-1">
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            <Bot className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}

                                <div className={`flex flex-col gap-2 max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                                    <div className="relative">
                                        <Card className={`p-4 ${message.role === "user"
                                            ? "bg-primary text-primary-foreground ml-12"
                                            : "bg-muted mr-12"
                                            }`}>
                                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                                {message.content}
                                            </div>


                                            {/* <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                {message.role === "assistant" && (
                                                    <div className="flex gap-1">
                                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                                            <ThumbsUp className="h-3 w-3" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                                            <ThumbsDown className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div> */}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`absolute top-4 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity ${message.role === "user" ? "-left-0" : "-right-0"
                                                    }`}
                                                onClick={() => handleDeleteMessage(message.msg_id)}
                                            >
                                                <Trash2 className="h-3 w-3 text-red-500" />
                                            </Button>
                                        </Card>
                                    </div>
                                </div>

                                {message.role === "user" && (
                                    <Avatar className="h-8 w-8 mt-1">
                                        <AvatarFallback className="bg-secondary">
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <Avatar className="h-8 w-8 mt-1">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        <Bot className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <Card className="p-4 bg-muted mr-12">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                        </div>
                                        <span className="text-sm text-muted-foreground">AI is typing...</span>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
                <div className="max-w-3xl mx-auto">
                    <div className="flex gap-2">
                        <Input
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim() || isLoading}
                            size="icon"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 text-center">
                        Press Enter to send, Shift+Enter for new line
                    </div>
                </div>
            </div>
        </div>
    );
}
