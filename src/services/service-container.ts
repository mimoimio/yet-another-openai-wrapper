import { AIProvider, OpenAIProvider, MockAIProvider } from './ai-providers';
import { ChatContextManager } from './context-manager';

// Service container for dependency injection
export class ServiceContainer {
    private static instance: ServiceContainer;
    private aiProvider: AIProvider;
    private contextManager: ChatContextManager;

    private constructor() {
        // Initialize based on environment and available API keys
        this.contextManager = new ChatContextManager();

        const openaiKey = process.env.OPENAI_API_KEY;
        const aiProviderType = process.env.AI_PROVIDER || 'mock';

        if (aiProviderType === 'openai' && openaiKey) {
            console.log('Using OpenAI provider');
            this.aiProvider = new OpenAIProvider(openaiKey);
        } else {
            console.log('Using Mock AI provider');
            this.aiProvider = new MockAIProvider();
        }
    }

    static getInstance(): ServiceContainer {
        if (!this.instance) {
            this.instance = new ServiceContainer();
        }
        return this.instance;
    }

    getAIProvider(): AIProvider {
        return this.aiProvider;
    }

    getContextManager(): ChatContextManager {
        return this.contextManager;
    }

    // Method to switch providers (useful for testing)
    setAIProvider(provider: AIProvider): void {
        this.aiProvider = provider;
        console.log('AI provider switched');
    }

    // Method to get provider info
    getProviderInfo(): string {
        return this.aiProvider.constructor.name;
    }
}
