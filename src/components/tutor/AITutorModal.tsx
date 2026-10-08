import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../../types/cbe.js';
import { cbeApi } from '../../services/cbeApi.js';
import { sound } from '../../utils/soundEffects.js';

interface Message {
  id: string;
  sender: 'STUDENT' | 'TUTOR';
  text: string;
  timestamp: string;
  source?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  gradeName?: string;
  activeQuestion?: Question | null;
  activeTopic?: string;
}

export const AITutorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  studentName = 'Amina',
  gradeName = 'Grade 4',
  activeQuestion,
  activeTopic
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'TUTOR',
      text: `Jambo sana, ${studentName}! I am Mwalimu Rafiki, your patient CBE learning companion. Whenever a question feels tricky, I am here to guide your thinking step-by-step using everyday Kenyan examples like chapatis, shillings, and crops in the shamba. How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeQuestion) {
      setMessages(prev => [
        ...prev,
        {
          id: `ctx-${Date.now()}`,
          sender: 'TUTOR',
          text: `I see you are working on: "${activeQuestion.prompt}". Remember: ${activeQuestion.socraticHint}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [activeQuestion?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    sound.playClick();
    const studentMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'STUDENT',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, studentMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await cbeApi.askTutor({
        message: textToSend.trim(),
        studentName,
        gradeName,
        topic: activeTopic || activeQuestion?.subStrandId,
        questionId: activeQuestion?.id
      });

      sound.playCoin();
      setMessages(prev => [
        ...prev,
        {
          id: `tut-${Date.now()}`,
          sender: 'TUTOR',
          text: res.tutorResponse,
          source: res.source,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `tut-err-${Date.now()}`,
          sender: 'TUTOR',
          text: 'Pole sana! Let me think again. What part of the question can we break into smaller pieces?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Explain with chapatis 🫓',
    'Help me calculate change with shillings 🪙',
    'How do seed seedlings sprout? 🌱',
    'Tell me a cool Kenyan fun fact! 🇰🇪'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl w-full max-w-lg h-[90vh] max-h-[640px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 p-4 border-b border-emerald-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-inner">
              🦉
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Mwalimu Rafiki AI</h3>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  CBE Tutor
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">
                Patient Socratic Tutor • {gradeName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 flex items-center justify-center font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-slate-900 to-emerald-950/30">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'STUDENT' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                  msg.sender === 'STUDENT'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                    : 'bg-emerald-950/90 border border-emerald-700/60 text-emerald-100 rounded-bl-none shadow-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <div
                  className={`flex items-center justify-between gap-3 text-[10px] mt-2 pt-1 border-t ${
                    msg.sender === 'STUDENT'
                      ? 'border-emerald-500/40 text-emerald-200'
                      : 'border-emerald-800/60 text-emerald-400/80'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.source && <span>{msg.source === 'GEMINI_AI' ? '⚡ Gemini AI' : '🇰🇪 CBE Socratic'}</span>}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-800 rounded-2xl w-fit text-xs text-emerald-300">
              <span className="animate-spin text-base">⏳</span>
              <span>Mwalimu is thinking of a friendly Kenyan example...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt chips */}
        <div className="p-2.5 bg-slate-900 border-t border-emerald-900/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => sendMessage(chip)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs bg-emerald-950 border border-emerald-700/60 text-emerald-200 hover:border-amber-400 hover:text-amber-200 hover:bg-emerald-900 transition-all cursor-pointer shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 bg-slate-950 border-t border-emerald-800/80 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage(inputText);
              }
            }}
            placeholder="Ask Mwalimu Rafiki anything..."
            className="flex-1 bg-emerald-950/70 border border-emerald-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-emerald-400/50 focus:outline-none focus:border-amber-400"
          />
          <button
            type="button"
            disabled={!inputText.trim() || isLoading}
            onClick={() => sendMessage(inputText)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
