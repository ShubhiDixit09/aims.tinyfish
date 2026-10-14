'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, Send, Bot, User, Languages } from 'lucide-react';

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
      text: 'Namaste! Main aapka CivicPilot Copilot hoon. Aap kisi bhi government portal ya document ke baare mein pooch sakte hain.',
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
          text: 'Delhi e-District par Income Certificate ke liye 4 cheezein chahiye: 1) Aadhaar Card, 2) Salary Slip ya ITR, 3) BSES Bijli ka bill (3 saal ka proof), aur 4) Annexure-I Self-Declaration Affidavit. Sabhi files 100KB se kam honi chahiye.',
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
    <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-card flex flex-col space-y-4">
      {/* Header with Language Toggles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              CivicPilot Indic Voice & Chat Copilot
            </h3>
            <p className="text-xs text-stone-500">
              Real-time conversational guidance in Hinglish, Hindi, and English
            </p>
          </div>
        </div>

        {/* Language Pill Switcher */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200">
          <Languages className="w-3.5 h-3.5 text-stone-500 ml-1.5" />
          {(['hinglish', 'hindi', 'english'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setLanguageMode(mode)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium capitalize transition-all ${
                languageMode === mode
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="h-64 overflow-y-auto space-y-3 p-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs ${
                msg.sender === 'user'
                  ? 'bg-stone-900 text-white rounded-tr-sm shadow-sm'
                  : 'bg-stone-50 text-stone-800 rounded-tl-sm border border-stone-200/80 shadow-sm'
              }`}
            >
              <div className="leading-relaxed">{msg.text}</div>

              {msg.hindiTranslation && languageMode !== 'english' && (
                <div className="mt-2 pt-2 border-t border-stone-200/80 text-[11px] text-stone-600 font-sans">
                  {msg.hindiTranslation}
                </div>
              )}

              {/* Action Buttons for AI recommendations */}
              {msg.actionTag === 'DOC_CHECK' && (
                <button
                  onClick={onTriggerDocumentCheck}
                  className="mt-2.5 px-3 py-1 rounded-lg bg-stone-900 text-white font-medium text-[11px] hover:bg-black transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Audit Documents Now</span>
                </button>
              )}

              {msg.actionTag === 'AFFIDAVIT' && (
                <button
                  onClick={onGenerateAffidavit}
                  className="mt-2.5 px-3 py-1 rounded-lg bg-stone-900 text-white font-medium text-[11px] hover:bg-black transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Preview Annexure-I Draft</span>
                </button>
              )}
            </div>

            {msg.sender === 'ai' && (
              <button
                onClick={() => speakText(msg.text)}
                className="mt-1 flex items-center gap-1 text-[10px] text-stone-400 hover:text-stone-700 transition-colors ml-1"
                title="Speak Out Aloud"
              >
                <Volume2 className="w-3 h-3" />
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
            className="text-[11px] bg-stone-50 hover:bg-stone-100 text-stone-700 px-3 py-1 rounded-full border border-stone-200 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar with Speech Recognition Mic */}
      <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
        <button
          type="button"
          onClick={toggleListening}
          className={`p-3 rounded-full transition-all shadow-sm ${
            isListening
              ? 'bg-amber-600 text-white animate-pulse'
              : 'bg-stone-900 hover:bg-black text-white'
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
          className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
        />

        <button
          type="button"
          onClick={() => handleSendQuery()}
          disabled={!inputText.trim()}
          className="p-3 rounded-xl bg-stone-900 hover:bg-black text-white transition-colors disabled:opacity-40 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
