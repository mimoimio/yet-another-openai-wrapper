"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, MessageCircle, Settings, User } from "lucide-react";

import { Sidebar } from "@/components/Sidebar";

import type { Chat } from "@/types/chat";

interface HeaderProps {
    chatHistory: Chat[];
    selectedChatId: string | null;
    onChatSelect: (chatId: string) => void;
    onNewChat?: () => void;
    onChatDeleted?: () => void;
    onChatUpdated?: () => void;
}

export function Header({ chatHistory, selectedChatId, onChatSelect, onNewChat, onChatDeleted, onChatUpdated }: HeaderProps) {
    return (
        <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Left side - Mobile menu and title */}
            <div className="flex items-center gap-4">
                {/* Mobile sidebar trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-80">
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <Sidebar
                            chatHistory={chatHistory}
                            selectedChatId={selectedChatId}
                            onChatSelect={onChatSelect}
                            onNewChat={onNewChat}
                            onChatDeleted={onChatDeleted}
                            onChatUpdated={onChatUpdated}
                        />
                    </SheetContent>
                </Sheet>

                {/* App title */}
                <div className="flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-semibold">AI Chat</h1>
                </div>
            </div>

            {/* Right side - User menu */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.jpg" alt="User" />
                    <AvatarFallback>
                        <User className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}
