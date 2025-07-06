import { NextRequest, NextResponse } from 'next/server';
import { pocketbaseService } from '@/services/pocketbase';
import { ServiceContainer } from '@/services/service-container';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ chat_id: string }> }
) {
    try {
        const { content } = await request.json();
        const { chat_id } = await params;
        const chatId = chat_id;

        // Get services from container
        const container = ServiceContainer.getInstance();
        const aiProvider = container.getAIProvider();
        const contextManager = container.getContextManager();

        console.log(`Processing message for chat ${chatId} using ${container.getProviderInfo()}`);

        // Create user message first
        const userMessage = await pocketbaseService.createMessage(chatId, 'user', content);
        if (!userMessage) {
            return NextResponse.json(
                { error: 'Failed to create user message' },
                { status: 500 }
            );
        }

        // Build context with message history (including the new user message)
        const context = await contextManager.buildContext(chatId);

        // Generate AI response using injected provider
        const aiResponse = await aiProvider.generateResponse(context);

        // Create AI message
        const aiMessage = await pocketbaseService.createMessage(chatId, 'assistant', aiResponse);
        if (!aiMessage) {
            return NextResponse.json(
                { error: 'Failed to create AI message' },
                { status: 500 }
            );
        }

        console.log(`AI response generated: ${aiResponse.substring(0, 50)}...`);

        // Return both messages
        return NextResponse.json({
            userMessage,
            aiMessage
        });
    } catch (error: any) {
        console.error('Failed to send message:', error);
        return NextResponse.json(
            { error: 'Failed to send message', details: error.message },
            { status: 500 }
        );
    }
}
