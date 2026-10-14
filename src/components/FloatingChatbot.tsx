'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Bot,
  User,
  Languages,
  ChevronDown,
  Minimize2,
  CheckCircle2,
  ArrowRight,
  FileText
} from 'lucide-react';

interface FloatingChatbotProps {
  onOpenAffidavitModal: () => void;
  onNavigateToServices: () => void;
  onNavigateToLiveAssistant: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  hindiTranslation?: string;
  actionType?: 'AUDIT_DOCS' | 'AFFIDAVIT' | 'LIVE_ASSISTANT';
  actionLabel?: string;
}

export function FloatingChatbot({
  onOpenAffidavitModal,
  onNavigateToServices,
  onNavigateToLiveAssistant,
}: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [languageMode, setLanguageMode] = useState<'hinglish' | 'hindi' | 'english'>('hinglish');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Namaste! Main aapka CivicPilot Assistant hoon. Delhi e-District, Income Certificate, 100KB document compression, ya kisi bhi portal ke baare mein poohein.',
      hindiTranslation: 'नमस्ते! मैं आपका सिविकपायलट सहायक हूँ। दिल्ली ई-डिस्ट्रिक्ट, आय प्रमाण पत्र, 100KB दस्तावेज़ संपीड़न या किसी भी सरकारी सेवा के बारे में पूछें।',
    },
  ]);

  // Speech Recognition (Voice Input)
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice typing is not supported in this browser. Please type your message.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = languageMode === 'hindi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Text-to-Speech (TTS)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageMode === 'hindi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend) return;

    // Append User Message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    const lower = textToSend.toLowerCase();

    // Intelligent Citizen Response Generation
    setTimeout(() => {
      let botMsg: ChatMessage;

      if (lower.includes('income') || lower.includes('aay') || lower.includes('certificate') || lower.includes('edistrict')) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Delhi e-District portal par Income Certificate ke liye 4 zaroori documents chahiye: 1) Aadhaar Card, 2) Salary Slip ya ITR, 3) 3-saal ka bijli bill, aur 4) Annexure-I Self-Declaration Affidavit. Delhi portal par har PDF file strictly 100KB se kam honi chahiye.',
          hindiTranslation: 'दिल्ली ई-डिस्ट्रिक्ट पोर्टल पर आय प्रमाण पत्र के लिए 4 ज़रूरी दस्तावेज़ चाहिए: आधार कार्ड, वेतन पर्ची/आईटीआर, 3-वर्ष का बिजली बिल, और अनुलग्नक-I स्व-घोषणा पत्र। पोर्टल पर हर फ़ाइल 100KB से कम होनी चाहिए।',
          actionType: 'AUDIT_DOCS',
          actionLabel: 'Check My Documents (100KB Audit)',
        };
      } else if (lower.includes('affidavit') || lower.includes('declaration') || lower.includes('annexure') || lower.includes('draft')) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Maine aapke liye official Delhi Revenue Department prescribed format (Annexure-I) affidavit template tayyar kar diya hai. Aap isse turant preview aur download kar sakte hain.',
          hindiTranslation: 'मैंने आपके लिए आधिकारिक अनुलग्नक-I स्व-घोषणा पत्र तैयार कर दिया है। आप इसे तुरंत पूर्वावलोकन और डाउनलोड कर सकते हैं।',
          actionType: 'AFFIDAVIT',
          actionLabel: 'Preview & Download Annexure-I',
        };
      } else if (lower.includes('100kb') || lower.includes('compress') || lower.includes('size') || lower.includes('oversize')) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Government portals (jaise edistrict.delhigovt.nic.in) 100KB se badi files reject kar dete hain. Hamare Document Auditor mein 1-click automatic compression available hai jo aapki 142KB salary slip ko bina quality kharab kiye 82KB kar deta hai.',
          actionType: 'AUDIT_DOCS',
          actionLabel: 'Open 100KB File Compressor',
        };
      } else if (lower.includes('passport')) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Passport Seva fresh adult passport ke liye: Proof of Date of Birth, Address Proof (Aadhaar/Voter ID), aur Non-ECR proof lagta hai. Kya aap live portal check karna chahte hain?',
          actionType: 'LIVE_ASSISTANT',
          actionLabel: 'Open Passport Portal Assistant',
        };
      } else {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Aapke sawaal "${textToSend}" ke baare mein maine government portal rules check kar liye hain. Aap document checklist verify kar sakte hain ya live assistant launch kar sakte hain.`,
          actionType: 'AUDIT_DOCS',
          actionLabel: 'View Required Documents',
        };
      }

      setMessages((prev) => [...prev, botMsg]);
      speakText(botMsg.text);
    }, 450);
  };

  const handleActionClick = (actionType?: string) => {
    if (actionType === 'AFFIDAVIT') {
      onOpenAffidavitModal();
    } else if (actionType === 'LIVE_ASSISTANT') {
      onNavigateToLiveAssistant();
      setIsOpen(false);
    } else {
      onNavigateToServices();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-[#141312] hover:bg-black text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] group"
          >
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-[#FFA94D]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#059669]" />
            </div>
            <span className="text-xs font-semibold tracking-wide">
              Ask Assistant
            </span>
            <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-white/90 font-medium">
              Hindi / Eng
            </span>
          </button>
        ) : null}
      </div>

      {/* Floating Chat Modal Box */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[400px] h-[580px] bg-white border border-[#ECEAE5] rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Chat Header */}
          <div className="px-5 py-4 bg-[#FBFBFA] border-b border-[#ECEAE5] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-2xl bg-[#141312] text-white">
                <Bot className="w-5 h-5 text-[#FFA94D]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#059669] border-2 border-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#141312]">
                  CivicPilot Assistant
                </h3>
                <p className="text-[11px] text-[#73726E]">
                  Speaks Hindi, English & Hinglish
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language Pill Switcher */}
              <div className="flex items-center bg-[#F0EEEA] p-0.5 rounded-full text-[10px] font-medium border border-[#ECEAE5]">
                {(['hinglish', 'hindi', 'english'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setLanguageMode(mode)}
                    className={`px-2 py-0.5 rounded-full capitalize transition-all ${
                      languageMode === mode
                        ? 'bg-white text-[#141312] font-bold shadow-xs'
                        : 'text-[#73726E] hover:text-[#141312]'
                    }`}
                  >
                    {mode === 'hindi' ? 'हिन्दी' : mode}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-[#73726E] hover:text-[#141312] hover:bg-[#F0EEEA] transition-colors ml-1"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF9F5]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#141312] text-white rounded-tr-xs shadow-sm font-normal'
                      : 'bg-white text-[#141312] rounded-tl-xs border border-[#ECEAE5] shadow-[0_1px_3px_rgba(0,0,0,0.02)] leading-relaxed'
                  }`}
                >
                  <div>{msg.text}</div>

                  {msg.hindiTranslation && languageMode !== 'english' && (
                    <div className="mt-2 pt-2 border-t border-[#ECEAE5] text-[11px] text-[#57544E] leading-relaxed">
                      {msg.hindiTranslation}
                    </div>
                  )}

                  {/* Interactive Action Pill inside response */}
                  {msg.actionType && (
                    <button
                      onClick={() => handleActionClick(msg.actionType)}
                      className="mt-2.5 px-3 py-1.5 rounded-xl bg-[#141312] text-white text-[11px] font-semibold hover:bg-black transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3 h-3 text-[#FFA94D]" />
                      <span>{msg.actionLabel || 'View Service Action'}</span>
                      <ArrowRight className="w-3 h-3 text-white/70" />
                    </button>
                  )}
                </div>

                {msg.sender === 'bot' && (
                  <button
                    onClick={() => speakText(msg.text)}
                    className="mt-1 flex items-center gap-1 text-[10px] text-[#8A867E] hover:text-[#141312] transition-colors ml-1 font-medium"
                    title="Listen aloud"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Listen</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quick Questions Chips */}
          <div className="px-4 py-2 bg-white border-t border-[#ECEAE5] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              'Delhi Income Certificate rules?',
              '100KB limit fix?',
              'Draft Annexure-1 affidavit',
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-[#F0EEEA] hover:bg-[#E8E5DF] text-[#45433F] text-[11px] font-medium transition-colors border border-[#ECEAE5]"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#ECEAE5] flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-full transition-all shadow-xs ${
                isListening
                  ? 'bg-[#E8590C] text-white animate-pulse'
                  : 'bg-[#F0EEEA] hover:bg-[#E8E5DF] text-[#141312]'
              }`}
              title={isListening ? 'Listening...' : 'Click to Speak'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                isListening
                  ? 'Sun raha hoon... Boliye...'
                  : 'Type in Hindi, English, or Hinglish...'
              }
              className="flex-1 bg-[#FBFBFA] border border-[#ECEAE5] rounded-xl px-3.5 py-2 text-xs text-[#141312] placeholder-[#8A867E] focus:outline-none focus:border-[#141312] focus:bg-white transition-all shadow-inner"
            />

            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#141312] hover:bg-black text-white transition-all disabled:opacity-40 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
