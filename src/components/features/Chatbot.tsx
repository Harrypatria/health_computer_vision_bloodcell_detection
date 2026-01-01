import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Key, X, Sparkles, MessageSquare, Loader2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface Detection {
  class: string;
  confidence: number;
}

interface PredictionResult {
  image: string;
  detections: Detection[];
  processingTime: number;
}

interface ChatbotProps {
  detectionResult: PredictionResult | null;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  latency?: number;
}

export const Chatbot = ({ detectionResult }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your Clinical AI Assistant. Upload a blood smear image and run detection to get started. I can provide detailed hematological analysis once results are available.',
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle detection result updates
  useEffect(() => {
    if (detectionResult) {
      // Prompt user to generate analysis if result is new
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role !== 'system') {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'system',
            content: `New detection completed: ${detectionResult.detections.length} cells found. Would you like me to analyze these results?`,
        }]);
      }
    }
  }, [detectionResult]);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      setIsApiKeySet(true);
      toast.success('API Key saved', { description: 'You can now use AI features.' });
    }
  };

  const generateResponse = async (userQuery: string) => {
    if (!isApiKeySet) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Please configure your OpenAI API Key first to enable analysis.',
      }]);
      return;
    }

    setIsTyping(true);
    const startTime = performance.now();

    // Simulate Network/Processing Delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let responseContent = '';

    // Simple heuristic response generation (Mocking AI)
    if (detectionResult && (userQuery.toLowerCase().includes('analyze') || userQuery.toLowerCase().includes('result') || userQuery.toLowerCase().includes('report'))) {
         const rbcCount = detectionResult.detections.filter(d => d.class === 'RBC').length;
         const wbcCount = detectionResult.detections.filter(d => d.class === 'WBC').length;
         const plateletCount = detectionResult.detections.filter(d => d.class === 'Platelets').length;
         const wbcRatio = wbcCount / (rbcCount || 1);
         const isHighWBC = wbcRatio > 0.15;

         responseContent = `Based on the latest detection results:\n\nObservation:\nI identified ${detectionResult.detections.length} cells in total: ${rbcCount} RBCs, ${wbcCount} WBCs, and ${plateletCount} Platelets.\n\nClinical Interpretation:\n${isHighWBC ? 'The high WBC count relative to RBCs suggests potential leukocytosis.' : 'The distribution appears within normal ranges.'} The platelet count is ${plateletCount < 3 ? 'low, indicating possible thrombocytopenia' : 'adequate'}.\n\nRecomendation: Correlate with manual CBC.`;
    } else {
        responseContent = "I can help you analyze the blood smear results. Please ask me to 'analyze the results' or 'generate a report' after you've run a detection.";
    }

    const endTime = performance.now();
    const latency = endTime - startTime;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: responseContent,
      latency: latency
    }]);
    setIsTyping(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    generateResponse(input);
  };

  return (
    <>
      {/* accurate desktop sidebar / mobile drawer toggle */}
      <div className={`fixed right-0 top-16 bottom-0 z-40 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 w-full sm:w-96 lg:w-[400px] glass border-l border-border/40 shadow-2xl flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-border/40 flex items-center justify-between bg-primary/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Clinical AI Assistant</h2>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* API Key Input (if not set) */}
        {!isApiKeySet && (
          <div className="p-4 bg-muted/30 border-b border-border/40 animate-slide-up">
            <div className="flex items-center gap-2 mb-2">
              <Key className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">OpenAI Configuration Required</span>
            </div>
            <div className="flex gap-2">
               <Input 
                 type="password" 
                 placeholder="Enter API Key (sk-...)" 
                 value={apiKey} 
                 onChange={(e) => setApiKey(e.target.value)}
                 className="h-8 text-xs bg-background/50"
               />
               <Button size="sm" onClick={handleSaveKey} className="h-8">Save</Button>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-br-none' 
                  : msg.role === 'system'
                  ? 'bg-muted/50 text-xs text-muted-foreground w-full text-center border border-border/40' 
                  : 'bg-card border border-border/40 rounded-bl-none'
              }`}>
                {msg.role !== 'system' && (
                    <div className="flex items-center gap-2 mb-1.5 opacity-80">
                        {msg.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                        <span className="text-[10px] uppercase tracking-wider font-semibold">{msg.role}</span>
                    </div>
                )}
                <p className={`text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'system' ? 'text-center italic' : ''}`}>
                    {msg.content}
                </p>
                {/* Latency badge for assistant messages */}
                {msg.latency !== undefined && (
                   <div className="mt-2 pt-2 border-t border-white/10 flex justify-end">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] ${msg.role === 'user' ? 'bg-white/10 text-white/80' : 'bg-muted text-muted-foreground'}`}>
                        <Clock className="h-2.5 w-2.5" />
                        <span>{msg.latency.toFixed(0)}ms</span>
                      </div>
                   </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-card border border-border/40 rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                 <Bot className="h-3 w-3 text-primary" />
                 <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                 <span className="text-xs text-muted-foreground">Synthesizing...</span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Refresh Input Area */}
        <div className="p-4 border-t border-border/40 bg-background/40 backdrop-blur-sm">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isApiKeySet ? "Ask clinical questions..." : "Enter API Key to chat..."}
              disabled={!isApiKeySet || isTyping}
              className="rounded-full bg-background/60 shadow-inner focus:ring-primary/20"
            />
            <Button 
                type="submit" 
                size="icon" 
                disabled={!isApiKeySet || !input.trim() || isTyping}
                className="rounded-full shadow-lg shadow-primary/20"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Floating Toggle Button for Mobile */}
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl shadow-primary/30 z-50 animate-bounce-slow"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};
