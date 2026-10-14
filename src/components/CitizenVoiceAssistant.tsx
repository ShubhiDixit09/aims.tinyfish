'use client';

import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Send, Bot, Languages } from 'lucide-react';

interface CitizenVoiceAssistantProps {
  onSelectServiceIntent: (serviceId: string, customQuery?: string) => void;
  onTriggerDocumentCheck: () => void;
  onGenerateAffidavit: () => void;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  hindiTranslation?: string;
  actionTag?: string;
}

export function CitizenVoiceAssistant({
  onSelectServiceIntent,
  onTriggerDocumentCheck,
  onGenerateAffidavit,
}: CitizenVoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [languageMode, setLanguageMode] = useState<'hinglish' | 'hindi' | 'english'>('hinglish');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Namaste! Main aapka CivicPilot Indic Copilot hoon. Aap kisi bhi government portal ya document ke baare mein pooch sakte hain.',
      hindiTranslation: 'नमस्ते! मैं आपका सिविकपायलट सहायक हूँ। आप दिल्ली ई-डिस्ट्रिक्ट, पासपोर्ट या छात्रवृत्ति के बारे में पूछ सकते हैं।',
    },
  ]);

  // Speech Recognition Setup
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please type your message.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = languageMode === 'hindi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        handleSendQuery(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Text-To-Speech (TTS)
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

  const handleSendQuery = (customText?: string) => {
    const query = (customText || inputText).trim();
    if (!query) return;

    // Append User Message
    const userMsg: ChatMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Rule-based Intelligent Citizen Copilot Routing
    const lower = query.toLowerCase();

    setTimeout(() => {
      let reply: ChatMessage;

      if (lower.includes('income') || lower.includes('aay') || lower.includes('certificate') || lower.includes('edistrict')) {
        reply = {
          sender: 'ai',
          text: 'Delhi e-District par Income Certificate ke liye 4 documents chahiye: 1) Aadhaar Card, 2) Salary Slip ya ITR, 3) BSES Bijli ka bill (3 saal ka residence proof), aur 4) Annexure-I Self-Declaration Affidavit. Delhi portal par har file strictly 100KB se kam honi chahiye.',
          hindiTranslation: 'दिल्ली ई-डिस्ट्रिक्ट आय प्रमाण पत्र के लिए 4 दस्तावेज़ आवश्यक हैं: आधार कार्ड, वेतन पर्ची/आईटीआर, 3 वर्ष का बिजली बिल, और अनुलग्नक-I स्व-घोषणा पत्र। सभी फाइलें 100KB से कम होनी चाहिए।',
          actionTag: 'DOC_CHECK',
        };
        onSelectServiceIntent('edistrict-income', query);
      } else if (lower.includes('affidavit') || lower.includes('declaration') || lower.includes('annexure')) {
        reply = {
          sender: 'ai',
          text: 'Maine aapka prescribed Annexure-I Self-Declaration Affidavit draft kar diya hai. Aap "Preview Affidavit" par click karke verify aur download kar sakte hain.',
          hindiTranslation: 'मैंने आपका अनुलग्नक-I स्व-घोषणा पत्र तैयार कर दिया है। आप इसे तुरंत पूर्वावलोकन और डाउनलोड कर सकते हैं।',
          actionTag: 'AFFIDAVIT',
        };
      } else if (lower.includes('passport')) {
        reply = {
          sender: 'ai',
          text: 'Passport Seva ke liye aapko Proof of Date of Birth (Birth Certificate/10th Marksheet), Address Proof (Aadhaar/Voter ID), aur Non-ECR status document chahiye.',
          actionTag: 'PASSPORT',
        };
        onSelectServiceIntent('passport-seva', query);
      } else {
        reply = {
          sender: 'ai',
          text: `Aapke request "${query}" ke liye maine relevant government guidelines inspect kar li hain. Kya aap document audit run karna chahte hain?`,
        };
      }

      setMessages((prev) => [...prev, reply]);
      speakText(reply.text);
    }, 400);
  };

  return (
    <div className="bg-white border border-[#ECEAE5] rounded-3xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col space-y-5">
      {/* Header with Language Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ECEAE5]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#E8590C]/10 border border-[#E8590C]/20 text-[#E8590C] shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#191817]">
              CivicPilot Indic Voice & Chat Copilot
            </h3>
            <p className="text-xs text-[#73726E]">
              Real-time conversational guidance in Hinglish, Hindi, and English
            </p>
          </div>
        </div>

        {/* Language Pill Switcher */}
        <div className="flex items-center gap-1 bg-[#F0EEEA] p-1 rounded-full border border-[#ECEAE5]">
          <Languages className="w-3.5 h-3.5 text-[#8A867E] ml-2" />
          {(['hinglish', 'hindi', 'english'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setLanguageMode(mode)}
              className={`px-3 py-1 rounded-full text-[11px] capitalize transition-all ${
                languageMode === mode
                  ? 'bg-white text-[#191817] shadow-sm font-bold'
                  : 'text-[#57544E] hover:text-[#191817] font-medium'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="h-64 overflow-y-auto space-y-3.5 p-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs ${
                msg.sender === 'user'
                  ? 'bg-[#191817] text-white rounded-tr-sm shadow-sm'
                  : 'bg-[#FBFBFA] text-[#191817] rounded-tl-sm border border-[#ECEAE5] shadow-sm leading-relaxed'
              }`}
            >
              <div className="leading-relaxed">{msg.text}</div>

              {msg.hindiTranslation && languageMode !== 'english' && (
                <div className="mt-2.5 pt-2.5 border-t border-[#ECEAE5] text-[11px] text-[#57544E] font-sans">
                  {msg.hindiTranslation}
                </div>
              )}

              {/* Action Buttons for AI recommendations */}
              {msg.actionTag === 'DOC_CHECK' && (
                <button
                  onClick={onTriggerDocumentCheck}
                  className="mt-3 px-3.5 py-1.5 rounded-xl bg-[#191817] text-white font-semibold text-[11px] hover:bg-black transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#FFA94D]" />
                  <span>Audit Documents Now</span>
                </button>
              )}

              {msg.actionTag === 'AFFIDAVIT' && (
                <button
                  onClick={onGenerateAffidavit}
                  className="mt-3 px-3.5 py-1.5 rounded-xl bg-[#191817] text-white font-semibold text-[11px] hover:bg-black transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#FFA94D]" />
                  <span>Preview Annexure-I Draft</span>
                </button>
              )}
            </div>

            {msg.sender === 'ai' && (
              <button
                onClick={() => speakText(msg.text)}
                className="mt-1 flex items-center gap-1 text-[11px] text-[#8A867E] hover:text-[#191817] transition-colors ml-1"
                title="Speak Out Aloud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {[
          'Delhi Income Certificate ke documents?',
          'Oversized PDF ko kaise compress karein?',
          'Annexure-I affidavit format dikhao',
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendQuery(prompt)}
            className="text-[11px] bg-[#F0EEEA] hover:bg-[#E8E5DF] text-[#383633] px-3.5 py-1.5 rounded-full border border-[#ECEAE5] transition-colors font-medium"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar with Speech Recognition Mic */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#ECEAE5]">
        <button
          type="button"
          onClick={toggleListening}
          className={`p-3 rounded-full transition-all shadow-sm ${
            isListening
              ? 'bg-[#E8590C] text-white animate-pulse'
              : 'bg-[#191817] hover:bg-black text-white'
          }`}
          title={isListening ? 'Listening...' : 'Click to Speak'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
          placeholder={
            isListening
              ? 'Sun raha hoon... Boliye...'
              : 'Type or speak in Hindi / Hinglish...'
          }
          className="flex-1 bg-[#FBFBFA] border border-[#ECEAE5] rounded-2xl px-4 py-2.5 text-xs text-[#191817] focus:outline-none focus:border-[#191817] focus:bg-white transition-all shadow-inner"
        />

        <button
          type="button"
          onClick={() => handleSendQuery()}
          disabled={!inputText.trim()}
          className="p-3 rounded-2xl bg-[#191817] hover:bg-black text-white transition-colors disabled:opacity-40 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
