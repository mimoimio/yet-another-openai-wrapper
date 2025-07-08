"use client";

import { useChatContext } from "@/components/ChatLayout";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";

export default function Home() {
  const { createNewChat, chats } = useChatContext();

  return (
    <div className="flex-1 flex items-center justify-center bg-linear-30 from-background to to-foreground/80">
      <div className="text-center max-w-md">
        <MessageCircle className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-3xl font-semibold mb-4">Welcome to MimoAi Chat</h1>
        <p className="text-muted-foreground mb-8">
          {chats.length === 0
            ? "Start your first conversation with AI"
            : "Select a chat from the sidebar or create a new one"}
        </p>
        <Button onClick={createNewChat} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Start New Chat
        </Button>
      </div>
    </div>
  );
}
