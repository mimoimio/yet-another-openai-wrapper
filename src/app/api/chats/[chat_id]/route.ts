import { NextRequest, NextResponse } from 'next/server';
import { pocketbaseService } from '@/services/pocketbase';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { chat_id: string } }
) {
    try {
        await pocketbaseService.deleteChat(params.chat_id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Failed to delete chat:', error);
        return NextResponse.json(
            { error: 'Failed to delete chat' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { chat_id: string } }
) {
    try {
        const { title } = await request.json();
        const chat = await pocketbaseService.updateChat(params.chat_id, title);
        return NextResponse.json(chat);
    } catch (error: any) {
        console.error('Failed to update chat:', error);
        return NextResponse.json(
            { error: 'Failed to update chat' },
            { status: 500 }
        );
    }
}
