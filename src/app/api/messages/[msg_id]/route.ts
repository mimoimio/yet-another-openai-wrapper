import { NextRequest, NextResponse } from 'next/server';
import { pocketbaseService } from '@/services/pocketbase';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { msg_id: string } }
) {
    try {
        await pocketbaseService.deleteMessage(params.msg_id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Failed to delete message:', error);
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { msg_id: string } }
) {
    try {
        const { content } = await request.json();
        const message = await pocketbaseService.updateMessage(params.msg_id, content);
        return NextResponse.json(message);
    } catch (error: any) {
        console.error('Failed to update message:', error);
        return NextResponse.json(
            { error: 'Failed to update message' },
            { status: 500 }
        );
    }
}
