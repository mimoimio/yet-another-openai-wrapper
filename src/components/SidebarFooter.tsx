"use client";

import { Button } from "@/components/ui/button";
import { Settings, Bot } from "lucide-react";

interface SidebarFooterProps {
    onSettings?: () => void;
}

export function SidebarFooter({ onSettings }: SidebarFooterProps) {
    return (
        <div className="p-4 space-y-2">
            <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="sm"
                onClick={onSettings}
            >
                <Settings className="h-4 w-4" />
                Settings
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Bot className="h-3 w-3" />
                <span>AI Assistant Ready</span>
            </div>
        </div>
    );
}
