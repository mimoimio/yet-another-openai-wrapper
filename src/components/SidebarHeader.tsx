"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SidebarHeaderProps {
    onNewChat?: () => void;
}

export function SidebarHeader({ onNewChat }: SidebarHeaderProps) {
    return (
        <div className="p-4">
            <Button
                className="w-full justify-start gap-2"
                size="sm"
                onClick={onNewChat}
            >
                <Plus className="h-4 w-4" />
                New Chat
            </Button>
        </div>
    );
}
