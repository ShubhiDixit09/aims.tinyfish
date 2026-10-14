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
        handleSendQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

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

  const handleSendQuery = (queryToSend?: string) => {
    const q = (queryToSend || inputText).trim();
    if (!q) return;

    const userMsg: ChatMessage = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    const lower = q.toLowerCase();

    // Contextual Citizen Logic
    setTimeout(() => {
      let aiReply = '';
      let actionTag = '';

      if (lower.includes('income') || lower.includes('certificate') || lower.includes('edistrict') || lower.includes('delhi')) {
        aiReply =
          'Delhi Income Certificate ke liye Revenue Department ko 4 mandatory documents chahiye: 1) Aadhaar Card, 2) Residence Proof (3 saal), 3) Salary Slip ya ITR, aur 4) Annexure-I Self-Declaration Affidavit. Sabhi files strict 100KB se kam honi chahiye. Maine aapke workspace mein checklist load kar di hai!';
        onSelectServiceIntent('edistrict-income');
        actionTag = 'DELHI_EDISTRICT_LOADED';
      } else if (lower.includes('check') || lower.includes('document') || lower.includes('size') || lower.includes('pdf')) {
        aiReply =
          'Main aapke uploaded documents ki size aur name consistency audit kar raha hoon. Delhi portal par 100KB se badi file upload nahi hoti. Document Checker panel mein live report dekhein!';
        onTriggerDocumentCheck();
        actionTag = 'DOCUMENT_CHECK_TRIGGERED';
      } else if (lower.includes('affidavit') || lower.includes('annexure') || lower.includes('declaration')) {
        aiReply =
          'Maine aapke naam (Rahul Sharma) aur income details ke saath official Annexure-I Self-Declaration Affidavit draft taiyyar kar diya hai. Aap ise 1-click mein copy ya download kar sakte hain.';
        onGenerateAffidavit();
        actionTag = 'AFFIDAVIT_GENERATED';
      } else if (lower.includes('passport')) {
        aiReply =
          'Passport Seva portal par Normal Fresh Passport ke liye Proof of DOB, Address Proof aur Non-ECR certificate chahiye. Online steps ke baad Passport Seva Kendra (PSK) appointment book hoti hai.';
        onSelectServiceIntent('passport-seva');
        actionTag = 'PASSPORT_SEVA_LOADED';
      } else {
        aiReply =
          'Main samajh gaya. TinyFish browser agent live official government portal par jaakar exact checklist aur form steps inspect kar raha hai. Aap document upload karein, baaki process hum automate karenge.';
        actionTag = 'PORTAL_STANDBY';
      }

      const aiMsg: ChatMessage = { sender: 'ai', text: aiReply, actionTag };
      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiReply);
    }, 400);
  };

  return (
    <div className="bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[400px]">
      {/* Voice Assistant Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-dark-850 border-b border-dark-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-tinyfish-600/20 text-tinyfish-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              Citizen Corner • Multilingual Voice Copilot
              {isSpeaking && (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <Volume2 className="w-3 h-3 animate-pulse" /> Speaking
                </span>
              )}
            </h3>
            <span className="text-[10px] text-slate-400">Hindi • English • Hinglish</span>
          </div>
        </div>

        {/* Language Mode Toggle */}
        <div className="flex items-center gap-1 bg-dark-950 p-1 rounded-lg border border-dark-800 text-[10px] font-mono">
          <Languages className="w-3 h-3 text-slate-500 ml-1" />
          <button
            onClick={() => setLanguageMode('hinglish')}
            className={`px-2 py-0.5 rounded ${languageMode === 'hinglish' ? 'bg-tinyfish-600 text-white font-bold' : 'text-slate-400'}`}
          >
            Hinglish
          </button>
          <button
            onClick={() => setLanguageMode('hindi')}
            className={`px-2 py-0.5 rounded ${languageMode === 'hindi' ? 'bg-tinyfish-600 text-white font-bold' : 'text-slate-400'}`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin scrollbar-thumb-dark-700 bg-dark-950">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-6 h-6 rounded-full bg-tinyfish-600/20 text-tinyfish-400 flex items-center justify-center shrink-0 mt-0.5 border border-tinyfish-500/30">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-tinyfish-600 text-white shadow-sm'
                  : 'bg-dark-900 border border-dark-800 text-slate-200 shadow-inner'
              }`}
            >
              <div>{m.text}</div>
              {m.actionTag && (
                <div className="mt-2 pt-1 border-t border-dark-800 text-[10px] font-mono text-tinyfish-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Action: {m.actionTag}
                </div>
              )}
            </div>
            {m.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-dark-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-1.5 bg-dark-850/80 border-t border-dark-800 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
        <button
          onClick={() => handleSendQuery('Mujhe Delhi mein income certificate apply karna hai. Batao kya chahiye?')}
          className="px-2.5 py-1 rounded-lg bg-dark-900 hover:bg-dark-800 text-slate-300 border border-dark-700/60"
        >
          📜 Delhi Income Certificate apply karna hai
        </button>
        <button
          onClick={() => handleSendQuery('Check my documents for 100KB size limit')}
          className="px-2.5 py-1 rounded-lg bg-dark-900 hover:bg-dark-800 text-slate-300 border border-dark-700/60"
        >
          🔍 Check Document Size Limits
        </button>
        <button
          onClick={() => handleSendQuery('Generate Annexure-1 Self-Declaration Affidavit')}
          className="px-2.5 py-1 rounded-lg bg-dark-900 hover:bg-dark-800 text-slate-300 border border-dark-700/60"
        >
          ✍️ Generate Annexure-I Affidavit
        </button>
      </div>

      {/* Voice & Text Input Bar */}
      <div className="p-2.5 bg-dark-850 border-t border-dark-800 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
            isListening
              ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30'
              : 'bg-dark-900 text-tinyfish-400 hover:bg-dark-800 border border-dark-700/80'
          }`}
          title={isListening ? 'Listening... click to stop' : 'Click to Speak (Voice Assistant)'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
          placeholder={isListening ? 'Sun raha hoon... Boliye' : 'Poochiye ya boliye (e.g. Income certificate process)...'}
          className="flex-1 px-3 py-2 rounded-xl bg-dark-950 border border-dark-800 text-slate-100 text-xs focus:outline-none focus:border-tinyfish-500"
        />

        <button
          type="button"
          onClick={() => handleSendQuery()}
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-tinyfish-600 hover:bg-tinyfish-500 text-white disabled:bg-dark-800 disabled:text-slate-600 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
