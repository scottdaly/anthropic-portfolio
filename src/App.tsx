import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronDown, ThumbsUp, Settings, Paperclip, PenLine, ThumbsDown, Clipboard, RotateCcw, Plus, Sidebar, Check, Copy, Link, HelpCircle, InfoIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Mock data for chats
// Anthropic showcase chats – grounded in my real experience
const initialChats = [
  /* 1 ─ MISSION FIT & MOTIVATION */
  {
    id: 1,
    title: 'Why Anthropic, Why Me?',
    messages: [
      {
        id: 1,
        sender: 'user',
        content:
          'What draws you to Anthropic and how does our mission resonate with your own goals as a product designer?',
      },
      {
        id: 2,
        sender: 'assistant',
        content: `I've spent nights and weekends hacking on AI side‑projects, so two things about Anthropic hit home:

1. **Useful models for builders.** 

Claude's coding chops powered *all* of my recent prototypes—from React component generators to Go APIs—cutting exploration time in half.  As a self‑taught developer, that "assistant‑as‑pair‑programmer" experience is magic I want to refine for millions of other makers.

2. **Safety baked in.**

I admire that you ship research *and* red‑team methods in the same breath.  At GoDaddy, I help embed accessibility and privacy guardrails inside our design system; Anthropic does the same for AI alignment.  Designing products where safety is a first‑class constraint feels like the natural next step in my career.`,
      },
      {
        id: 3,
        sender: 'user',
        content:
          'What draws you to Anthropic and how does our mission resonate with your own goals as a product designer?',
      },
      {
        id: 4,
        sender: 'assistant',
        content: `I've spent nights and weekends hacking on AI side‑projects, so two things about Anthropic hit home:

1. **Useful models for builders.** 

Claude's coding chops powered *all* of my recent prototypes—from React component generators to Go APIs—cutting exploration time in half.  As a self‑taught developer, that "assistant‑as‑pair‑programmer" experience is magic I want to refine for millions of other makers.

2. **Safety baked in.**

I admire that you ship research *and* red‑team methods in the same breath.  At GoDaddy, I help embed accessibility and privacy guardrails inside our design system; Anthropic does the same for AI alignment.  Designing products where safety is a first‑class constraint feels like the natural next step in my career.`,
      },
      {
        id: 5,
        sender: 'user',
        content:
          'What draws you to Anthropic and how does our mission resonate with your own goals as a product designer?',
      },
      {
        id: 6,
        sender: 'assistant',
        content: `I've spent nights and weekends hacking on AI side‑projects, so two things about Anthropic hit home:

1. **Useful models for builders.** 

Claude's coding chops powered *all* of my recent prototypes—from React component generators to Go APIs—cutting exploration time in half.  As a self‑taught developer, that "assistant‑as‑pair‑programmer" experience is magic I want to refine for millions of other makers.

2. **Safety baked in.**

I admire that you ship research *and* red‑team methods in the same breath.  At GoDaddy, I help embed accessibility and privacy guardrails inside our design system; Anthropic does the same for AI alignment.  Designing products where safety is a first‑class constraint feels like the natural next step in my career.`,
      },
    ],
  },

  /* 2 ─ DESIGN‑SYSTEM IMPACT @ GODADDY */
  {
    id: 2,
    title: 'Evolving GoDaddy\'s Design System for AI',
    messages: [
      {
        id: 1,
        sender: 'user',
        content:
          'Tell me about your design‑system work—especially anything that supported AI features.',
      },
      {
        id: 2,
        sender: 'assistant',
        content: `**Role.**  Senior Product Designer on the Elevation Design System.

**Key contributions**

* **AI‑ready iconography.**  Led the creation of a 280‑glyph icon set (streamlined states, "sparkle/bolt" metaphors, content‑safety marks) now used in every generative‑AI flow across the company.
* **Token pipeline upgrade.**  Added semantic "tone" tokens (positive, caution, destructive) so teams could theme safety warnings without bespoke CSS.  
* **Adoption results.**
  * 34 product squads migrated within 6 mo.  
  * >12 K icons served per build via a single sprite sheet (‑15 % bundle size).  
  * Time from Figma approve → production drop‑in shrank from ~3 days to <1 day.

I didn't own the AI roadmap, but my system work became the substrate that unlocked it—perfect practice for supporting Anthropic's rapid research‑to‑product pipeline.`,
      },
    ],
  },

  /* 3 ─ AI PRODUCT CRAFT (SIDE PROJECTS) */
  {
    id: 3,
    title: 'Prototyping Conversational AI Products',
    messages: [
      {
        id: 1,
        sender: 'user',
        content:
          'Walk me through something you\'ve built on your own that shows product thinking with AI.',
      },
      {
        id: 2,
        sender: 'assistant',
        content: `### 1. superbuild.app  
A chat‑driven site builder with everyday "helper" personas (e.g., Copywriter, SEO Buddy, Color‑Palette Coach).

* **Pain point.**  New founders drown in UI complexity.  
* **Solution.**  One chat thread = one website state.  Users can *fork* a thread, compare diffs, then merge—Git concepts, zero jargon.  
* **Outcome.**  50 alpha users; 83 % preferred it over template wizards; two early users launched live marketing sites in under an hour.

### 2. lifeadventure.rsdaly.com  
A year‑by‑year life simulator where Claude generates dilemmas, tracks stats (happiness, health, intelligence), and surfaces new choices.

* **Design twist.**  I visualised stats as emoji "heartbeats" to keep the UI playful while decisions get serious.  
* **Tech.**  Next‑JS front‑end, SQLite, and Claude function‑calling for stat bookkeeping.

Both projects prove I can turn raw model capabilities into approachable interfaces—exactly the skillset you need as context windows and tool‑use explode.`,
      },
    ],
  },

  /* 4 ─ CROSS‑FUNCTIONAL COLLABORATION */
  {
    id: 4,
    title: 'Working Across Research, PM & Engineering',
    messages: [
      {
        id: 1,
        sender: 'user',
        content:
          'Great design rarely happens in isolation.  How do you partner with other functions?',
      },
      {
        id: 2,
        sender: 'assistant',
        content: `* **Design ↔ Dev translator.**  Because I code (React, Go), I prototype in the repo—not just Figma.  Engineers trust my redlines because they compile.
* **Rapid research loops.**  Pair with UXR to cut five‑day synth cycles to one day; we co‑author Airtable playbooks so findings feed straight into token decisions.
* **Show‑don't‑tell storytelling.**  Loom walk‑throughs beat slide decks; keeps exec updates under 5 minutes and frees teams for async critique.

Result: instead of "throwing designs over the wall," we ship cohesive AI features—like in‑product headline generators—two sprints faster than before.`,
      },
    ],
  },

  /* 5 ─ ETHICS & TRUST BY DESIGN */
  {
    id: 5,
    title: 'Building for Safety & Transparency',
    messages: [
      {
        id: 1,
        sender: 'user',
        content:
          'Anthropic puts safety first.  How does that mindset appear in your day‑to‑day design practice?',
      },
      {
        id: 2,
        sender: 'assistant',
        content: `**Guardrails checklist (used in every AI flow I touch):**

1. **Disclosure first.**  Up‑front explanation of model use + data retention.  
2. **Progressive friction.**  Tooltip → confirmation → block, depending on risk.  
3. **Bias auditing.**  Red‑team prompts stored in Git; design reviews include a "bias diff" checkpoint.  
4. **A11y parity.**  Screen‑reader‑safe and high‑contrast variants for every AI component.

I'm eager to learn Anthropic's constitutional approach and help translate those principles into UI patterns the industry can copy.`,
      },
    ],
  },

  /* 6 ─ CONTINUOUS LEARNING & FUTURE GOALS */
  {
    id: 6,
    title: 'Where I\'m Growing Next',
    messages: [
      {
        id: 1,
        sender: 'user',
        content:
          'What skills are you most excited to level‑up at Anthropic?',
      },
      {
        id: 2,
        sender: 'assistant',
        content: `* **Multimodal design.**  I've prototyped voice and text; adding vision to the loop is my next frontier.  
* **Safety metrics.**  Want to co‑define UX telemetry that feeds back into alignment scores.  
* **Research collaboration.**  Sitting closer to world‑class ML scientists will sharpen my hypothesis‑to‑UI pipeline.

Bring me in and you'll get a designer who ships code, sweats systems, and treats safety as a non‑negotiable—not an afterthought.`,
      },
    ],
  },
];


function App() {
  const [showTitleMenu, setShowTitleMenu] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [chats, setChats] = useState(initialChats);
  const [currentChat, setCurrentChat] = useState(chats[0]);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSidebarText, setShowSidebarText] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const shareLinkRef = useRef<HTMLInputElement>(null);
  const shareModalContentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const titleMenuRef = useRef<HTMLDivElement>(null);
  const titleMenuBtnRef = useRef<HTMLButtonElement>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOverlayOpen, setSidebarOverlayOpen] = useState(false);

  // Animate text fade-out after width transition
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (sidebarCollapsed) {
      timeout = setTimeout(() => setShowSidebarText(false), 220); // match transition duration
    } else {
      setShowSidebarText(true);
    }
    return () => clearTimeout(timeout);
  }, [sidebarCollapsed]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOverlayOpen(false); // Close overlay if resizing to desktop 
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmitMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: currentChat.messages.length + 1,
      sender: 'user',
      content: inputValue.trim()
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage]
    };

    const updatedChats = chats.map(chat => 
      chat.id === currentChat.id ? updatedChat : chat
    );

    setChats(updatedChats);
    setCurrentChat(updatedChat);
    setInputValue('');
  };

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      // Allow the default behavior (new line)
      return;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handleRename = () => {
    setNewTitle(currentChat.title);
    setIsRenaming(true);
    setShowTitleMenu(false);
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      const updatedChats = chats.map(chat => 
        chat.id === currentChat.id ? { ...chat, title: newTitle.trim() } : chat
      );
      setChats(updatedChats);
      setCurrentChat({ ...currentChat, title: newTitle.trim() });
      setIsRenaming(false);
    }
  };

  const handleRenameCancel = () => {
    setIsRenaming(false);
    setNewTitle('');
  };

  // For closing the model menu on outside click
  useEffect(() => {
    if (!showModelMenu) return;
    function handleClick(e: MouseEvent) {
      const menu = document.getElementById('model-menu');
      const btn = document.getElementById('model-menu-btn');
      if (menu && !menu.contains(e.target as Node) && btn && !btn.contains(e.target as Node)) {
        setShowModelMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showModelMenu]);

  // Close title menu on outside click
  useEffect(() => {
    if (!showTitleMenu) return;
    function handleClick(e: MouseEvent) {
      if (
        titleMenuRef.current &&
        !titleMenuRef.current.contains(e.target as Node) &&
        titleMenuBtnRef.current &&
        !titleMenuBtnRef.current.contains(e.target as Node)
      ) {
        setShowTitleMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showTitleMenu]);

  // Close share modal on outside click
  useEffect(() => {
    if (!showShareModal) return;
    function handleOutsideClick(e: MouseEvent) {
      if (
        shareModalContentRef.current &&
        !shareModalContentRef.current.contains(e.target as Node)
      ) {
        setShowShareModal(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showShareModal]);

  // Sidebar bottom section (expanded)
  const SidebarBottomExpanded = (
    <>
      <div className="mt-auto py-2 px-3 transition-opacity duration-200 ease-in-out opacity-100">
        <div className="flex items-center justify-center rounded-t-md mx-2 py-1 border-t-[1px] border-r-[1px] border-l-[1px] border-[#5645a1]/50 bg-gradient-to-b from-[#6c5bb9]/0 to-[#6c5bb9]/5">
          <span className="text-xs text-[#9b87f5]/80 tiempos-font whitespace-nowrap">Professional Plan</span>
        </div>
        <div className="inline-flex items-center justify-center bg-[#191917]/25 hover:cursor-pointer bg-opacity-70 hover:bg-opacity-100 shrink-0 ring-offset-2 ring-accent-[#ae5630] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none border-[1px] border-[#5e5d59]/25 hover:border-[#5e5d59]/50 group relative z-[1] w-full overflow-hidden rounded-lg !px-2.5 !py-2 !text-left">
          <div className="flex items-center w-full gap-1.5">
            <div className="w-7 h-7 rounded-full bg-[#6c5bb9] flex items-center justify-center">
              <span className="text-xs styrene-font-bold">CL</span>
            </div>
            <span className="min-w-0 flex-1 text-sm truncate tracking-tight whitespace-nowrap">claudeluvr99@gmail.com</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
          </div>
        </div>
      </div>
      <div className="mt-0.5 mb-4 flex items-center justify-end px-4 tracking-tight transition-opacity duration-200 ease-in-out opacity-100">
        <div className="flex items-center space-x-1 hover:cursor-pointer group">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
          <p className="text-xs text-[#ceccc5] group-hover:underline styrene-font-medium whitespace-nowrap">Help & Support</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen from-[#262624] to-[#30302e] bg-gradient-to-b text-gray-100 styrene-font max-w-screen overflow-x-none">
      {/* Sidebar (slide in/out on mobile) */}
      {isMobile ? (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-200 opacity-0 ${sidebarOverlayOpen ? 'bg-black/60 pointer-events-auto' : ' pointer-events-none'}`}
            onClick={() => setSidebarOverlayOpen(false)}
            aria-hidden="true"
          />
          
          {/* Sidebar panel */}
          <div
            style={{
              width: '16rem',
              transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
              transform: sidebarOverlayOpen ? 'translateX(0)' : 'translateX(-100%)',
              position: 'fixed',
              zIndex: 50,
              left: 0,
              top: 0,
              height: '100vh',
              boxShadow: sidebarOverlayOpen ? '0 0 0 9999px rgba(0,0,0,0.0)' : undefined,
            }}
            className={
              'bg-[#1f1e1d] border-r-[1px] border-[#5f5d59]/60 flex flex-col transition-colors duration-300 ease-in-out shadow-2xl'
            }
          >
            
            <div className={`py-2 px-2 flex items-center justify-between transition-all duration-300 ease-in-out`}> 
              <div className={`flex items-center transition-all duration-300 ease-in-out pb-4`}> 
                <div className='h-[32px] w-[36px]'></div>
                
              </div>
            </div>
            {/* Sidebar Content */}
            <div className="tracking-tight mx-2 transition-opacity duration-200 ease-in-out opacity-100">
              <div className="relative group">
                <button className={`w-full hover:cursor-pointer text-left px-1 py-1.5 rounded-lg flex items-center space-x-1 text-[#d97757] gap-1 ${sidebarCollapsed ? '' : 'hover:bg-[#d97757]/5'}`}>
                  <div className="flex items-center space-x-1 bg-[#c96442] rounded-full p-1 group-hover:scale-105 group-hover:rotate-3 transition-all ease-in-out group-hover:shadow-md duration-150">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-sm styrene-font-medium whitespace-nowrap transition-all duration-150 ease-in-out ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>New chat</span>
                </button>
                {/* Tooltip for collapsed sidebar */}
                {sidebarCollapsed && (
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 opacity-0 group-hover:opacity-100 font-medium group-hover:pointer-events-auto transition-opacity duration-150 min-w-max px-2 py-1 rounded-md bg-[#0f0f0e] text-white text-[0.7rem] shadow-md flex items-center justify-center gap-2 select-none whitespace-nowrap">
                    New chat <span className="text-[#c2c0b6] text-[0.7rem] pt-0.5">Ctrl+K</span>
                  </div>
                )}
              </div>
              {!sidebarCollapsed && showSidebarText && (
              <div className="mt-4">
                <div className="px-3 py-2 text-sm text-gray-400">
                  <span className='text-[#ceccc5] styrene-font text-xs'>Recents</span>
                </div>
                <div className="mt-1 space-y-0.5 px-1">
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setCurrentChat(chat)}
                      className={`w-full px-2 py-2 text-[0.85rem] hover:bg-[#0f0f0e] text-[#c2c0b6] rounded-lg cursor-pointer flex items-center space-x-2 ${
                        currentChat.id === chat.id ? 'bg-[#0f0f0e] text-[#faf9f5]' : ''
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="shrink-0"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg>
                      <span className="truncate styrene-font">{chat.title}</span>
                    </button>
                  ))}
                </div>
              </div>
               )}
            </div>
            {/* Expanded bottom section for mobile overlay */}
            {sidebarOverlayOpen && SidebarBottomExpanded}
          </div>
        </>
      ) : (
        // Desktop sidebar
        <div
          style={{
            width: sidebarCollapsed ? '3rem' : '18rem',
            transition: 'width 0.2s cubic-bezier(0.4,0,0.2,1)',
          }}
          className={` border-r-[1px] border-[#5f5d59]/50 flex flex-col transition-colors duration-300 ease-in-out ${sidebarCollapsed ? 'bg-[#262624]' : 'bg-[#1f1e1d]'}`}
        >
          <div className={`py-2 px-2 flex items-center justify-between transition-all duration-300 ease-in-out`}> 
            <div className={`flex items-center transition-all duration-300 ease-in-out pb-4`}> 
              
              <button 
                className="inline-flex items-center justify-center relative shrink-0 can-focus select-none hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none text-[#c2c0b6] border-transparent transition font-styrene duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] hover:bg-[#0f0f0e] aria-pressed:bg-[#0f0f0e] aria-checked:bg-[#0f0f0e] aria-expanded:bg-[#141413] hover:text-[#c2c0b6] aria-pressed:text-[#c2c0b6] aria-checked:text-[#c2c0b6] aria-expanded:text-[#c2c0b6] h-8 w-8 rounded-md active:scale-95 group"
                onClick={() => setSidebarCollapsed((v) => !v)}
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <div className="relative *:duration-300 ">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-80 transition-all text-[#c2c0b6]">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 3C1.67157 3 1 3.67157 1 4.5V15.5C1 16.3284 1.67157 17 2.5 17H17.5C18.3284 17 19 16.3284 19 15.5V4.5C19 3.67157 18.3284 3 17.5 3H2.5ZM2 4.5C2 4.22386 2.22386 4 2.5 4H6V16H2.5C2.22386 16 2 15.7761 2 15.5V4.5ZM7 16H17.5C17.7761 16 18 15.7761 18 15.5V4.5C18 4.22386 17.7761 4 17.5 4H7V16Z"></path>
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={`shrink-0 opacity-0 scale-50 absolute inset-0 group-hover:scale-100 group-hover:opacity-100 transition-all text-[#c2c0b6] ${sidebarCollapsed ? 'rotate-180' : ''}`}>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 10C5 9.85913 5.05943 9.72479 5.16366 9.63003L10.6637 4.63003C10.868 4.44428 11.1842 4.45933 11.37 4.66366C11.5557 4.86799 11.5407 5.18422 11.3363 5.36997L6.7933 9.5L17.5 9.5C17.7761 9.5 18 9.72386 18 10C18 10.2761 17.7761 10.5 17.5 10.5L6.7933 10.5L11.3363 14.63C11.5407 14.8158 11.5557 15.132 11.37 15.3363C11.1842 15.5407 10.868 15.5557 10.6637 15.37L5.16366 10.37C5.05943 10.2752 5 10.1409 5 10Z"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 2C2.77614 2 3 2.22386 3 2.5L3 17.5C3 17.7761 2.77614 18 2.5 18C2.22385 18 2 17.7761 2 17.5L2 2.5C2 2.22386 2.22386 2 2.5 2Z"></path>
                  </svg>
                </div>
              </button>
              {/* Animated text/logo fade/scale */}
              {!isMobile && (
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ml-1.5 mt-1`} >
                  <span className={`tiempos-font text-white text-xl transition-all duration-150 ease-in-out whitespace-nowrap ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>Scott Daly</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Content */}
          {(!isMobile || sidebarOverlayOpen) && (
            <div className="tracking-tight mx-2 transition-opacity duration-200 ease-in-out opacity-100">
              <div className="relative group">
                <button className={`w-full hover:cursor-pointer text-left px-1 py-1.5 rounded-lg flex items-center space-x-1 text-[#d97757] gap-1 ${sidebarCollapsed ? '' : 'hover:bg-[#d97757]/5'}`}>
                  <div className="flex items-center space-x-1 bg-[#c96442] rounded-full p-1 group-hover:scale-105 group-hover:rotate-3 transition-all ease-in-out group-hover:shadow-md duration-150">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-sm styrene-font-medium whitespace-nowrap transition-all duration-150 ease-in-out ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>New chat</span>
                </button>
                {/* Tooltip for collapsed sidebar */}
                {sidebarCollapsed && (
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 opacity-0 group-hover:opacity-100 font-medium group-hover:pointer-events-auto transition-opacity duration-150 min-w-max px-2 py-1 rounded-md bg-[#0f0f0e] text-white text-[0.7rem] shadow-md flex items-center justify-center gap-2 select-none whitespace-nowrap">
                    New chat <span className="text-[#c2c0b6] text-[0.7rem] pt-0.5">Ctrl+K</span>
                  </div>
                )}
              </div>
              {!sidebarCollapsed && showSidebarText && (
              <div className="mt-4">
                <div className="px-3 py-2 text-sm text-gray-400">
                  <span className='text-[#ceccc5] styrene-font text-xs'>Recents</span>
                </div>
                <div className="mt-1 space-y-0.5 px-1">
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setCurrentChat(chat)}
                      className={`w-full px-2 py-2 text-[0.85rem] hover:bg-[#0f0f0e] text-[#c2c0b6] rounded-lg cursor-pointer flex items-center space-x-2 ${
                        currentChat.id === chat.id ? 'bg-[#0f0f0e] text-[#faf9f5]' : ''
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="shrink-0"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg>
                      <span className="truncate styrene-font">{chat.title}</span>
                    </button>
                  ))}
                </div>
              </div>
               )}
            </div>
          )}
         
          
          {/* Bottom Section */}
          {!sidebarCollapsed && showSidebarText && SidebarBottomExpanded}
          {/* Collapsed bottom for desktop only */}
          {sidebarCollapsed && (
            <div className="mt-auto flex flex-col items-start px-2 gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#6c5bb9] flex items-center justify-center">
                <span className="text-xs styrene-font-bold">CL</span>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#191917]/25 border-[1px] border-[#5e5d59]/25">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col tiempos-font text-[#f5f4ef] overflow-y-scroll bg-[#262624] overflow-x-none">
        {/* Header */}
        {isMobile && (
            <button
              className="z-150 inline-flex items-center justify-center absolute top-2 left-2 shrink-0 can-focus select-none hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none text-[#c2c0b6] border-transparent transition font-styrene duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] hover:bg-[#0f0f0e] aria-pressed:bg-[#0f0f0e] aria-checked:bg-[#0f0f0e] aria-expanded:bg-[#141413] hover:text-[#c2c0b6] aria-pressed:text-[#c2c0b6] aria-checked:text-[#c2c0b6] aria-expanded:text-[#c2c0b6] h-8 w-8 rounded-md active:scale-95 group"
              onClick={() => setSidebarOverlayOpen(!sidebarOverlayOpen)}
              aria-label="Open sidebar"
            >
              <div className="relative *:duration-300 ">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={`shrink-0  scale-100 group-hover:opacity-0 group-hover:scale-80 transition-all text-[#c2c0b6] ${sidebarOverlayOpen ? "opacity-0" : 'opacity-100'}`}>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 3C1.67157 3 1 3.67157 1 4.5V15.5C1 16.3284 1.67157 17 2.5 17H17.5C18.3284 17 19 16.3284 19 15.5V4.5C19 3.67157 18.3284 3 17.5 3H2.5ZM2 4.5C2 4.22386 2.22386 4 2.5 4H6V16H2.5C2.22386 16 2 15.7761 2 15.5V4.5ZM7 16H17.5C17.7761 16 18 15.7761 18 15.5V4.5C18 4.22386 17.7761 4 17.5 4H7V16Z"></path>
                  </svg>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={`shrink-0 opacity-0 scale-50 absolute inset-0 group-hover:scale-100 group-hover:opacity-100 transition-all text-[#c2c0b6] ${sidebarOverlayOpen ? 'opacity-100 scale-100' : 'rotate-180'}`}>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 10C5 9.85913 5.05943 9.72479 5.16366 9.63003L10.6637 4.63003C10.868 4.44428 11.1842 4.45933 11.37 4.66366C11.5557 4.86799 11.5407 5.18422 11.3363 5.36997L6.7933 9.5L17.5 9.5C17.7761 9.5 18 9.72386 18 10C18 10.2761 17.7761 10.5 17.5 10.5L6.7933 10.5L11.3363 14.63C11.5407 14.8158 11.5557 15.132 11.37 15.3363C11.1842 15.5407 10.868 15.5557 10.6637 15.37L5.16366 10.37C5.05943 10.2752 5 10.1409 5 10Z"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 2C2.77614 2 3 2.22386 3 2.5L3 17.5C3 17.7761 2.77614 18 2.5 18C2.22385 18 2 17.7761 2 17.5L2 2.5C2 2.22386 2.22386 2 2.5 2Z"></path>
                  </svg>
              </div>
            </button>

          )}
          {isMobile && (
          <p className={`absolute tiempos-font text-xl top-3 left-12 z-150 transition-all ${sidebarOverlayOpen ? 'opacity-100' : 'opacity-0'}`}>Scott Daly</p>
          )}
        <div className='sticky top-0 z-[8] -mb-6 flex h-12 items-center gap-1 lg:gap-3 pl-11 lg:pb-0.5 lg:pl-8 '>
          {/* Mobile sidebar toggle button inline with chat title */}
          
          <div className="bg-gradient-to-b from-[#262624] via-[#262624] to-[#262624]/0 lg:pl-6 lg:pr-4 px-2 w-full z-[-1] -bottom-5 inset-0 via-50% absolute pointer-events-none"></div>
          <div className='flex items-center justify-between w-full'>
            <div className="flex-1 flex relative">
              {!isRenaming ? (
                <div className='flex items-center'>
                  <button 
                    ref={titleMenuBtnRef}
                    onClick={() => setShowTitleMenu(!showTitleMenu)}
                    className="flex items-center hover:cursor-pointer hover:bg-black px-1 py-0.5 rounded-md ring-offset-2 ring-accent-[#ae5630] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none"
                  >
                    <span className="truncate tracking-tight text-[0.85rem] styrene-font">{currentChat.title}</span>
                    <ChevronDown className="w-4 h-4 text-[#ceccc5]" />
                  </button>
                </div>
              ) : null}
              {showTitleMenu && !isRenaming && (
                <div
                  ref={titleMenuRef}
                  className="absolute z-[10] tracking-tight top-full min-w-[8rem] w-[128px] mt-1 styrene-font text-[#c2c0b6] bg-[#30302e] border-[1px] border-[#5f5d59]/50 backdrop-blur-xl rounded-lg p-1 overflow-hidden menu-shadow ">
                  <button 
                    className="w-full text-left px-2 py-1 hover:bg-[#151514]/70 rounded hover:cursor-pointer"
                    onClick={handleRename}
                  >
                    Rename
                  </button>
                  <button className="w-full text-left px-2 py-1 text-[#e86b6b] hover:bg-[#240e0d]/40 rounded hover:cursor-pointer"
                    onClick={() => {
                      setIsConfirmingDelete(true);
                      setShowTitleMenu(false);
                    }}>
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="">
              <button
                className="inline-flex items-center justify-center relative shrink-0 can-focus tracking-tighter hover:cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none text-text-300 border-transparent transition styrene-font duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] hover:bg-[#0f0f0e] aria-pressed:bg-[#0f0f0e] aria-checked:bg-[#0f0f0e] aria-expanded:bg-[#141413] hover:text-[#faf9f5] aria-pressed:text-[#faf9f5] aria-checked:text-[#faf9f5] aria-expanded:text-[#faf9f5] h-9 px-4 py-2 rounded-lg min-w-[5rem] active:scale-[0.985] whitespace-nowrap text-sm pl-2 pr-3 gap-1 font-medium text-sm !text-[#faf9f5]"
                type="button"
                onClick={() => setShowShareModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M214,112v96a14,14,0,0,1-14,14H56a14,14,0,0,1-14-14V112A14,14,0,0,1,56,98H80a6,6,0,0,1,0,12H56a2,2,0,0,0-2,2v96a2,2,0,0,0,2,2H200a2,2,0,0,0,2-2V112a2,2,0,0,0-2-2H176a6,6,0,0,1,0-12h24A14,14,0,0,1,214,112ZM92.24,68.24,122,38.49V136a6,6,0,0,0,12,0V38.49l29.76,29.75a6,6,0,1,0,8.48-8.48l-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,1,0,8.48,8.48Z"></path></svg>Share
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 mt-7 pl-5 lg:pl-10 text-[#f5f4ef] lg:pr-10">
          <div className="max-w-[45rem] mx-auto">
            {currentChat.messages.map((message) => (
              <div key={message.id} className={`group relative mr-4 lg:mr-0 ${
                message.sender === 'user' ? 'mb-4 flex w-fit flex-col break-words bg-[#141413] styrene-font max-w-[75ch] ml-px pl-2.5 py-2.5 pr-6 leading-6 rounded-xl text-[0.9375rem] shadow-[0_2px_16px_rgba(0,0,0,0.025)]' : 'mb-8 bg-gradient-to-b from-[#3C3C39]/75 to-[#30302E] pr-4 lg:pr-8 leading-[1.65rem] tracking-[0.015em] pt-3.5 px-4 pb-[1.125rem] rounded-2xl border-[0.5px] border-[#5e5d59]/30 shadow-[0_4px_24px_rgba(0,0,0,0.015)]'
              }`}>
                <div className="flex items-start space-x-2">
                  {message.sender === 'user' && (
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center tracking-tighter ${
                      'bg-[#c2c0b6] text-[#30302e] styrene-font-bold text-[12px]'
                    }`}>
                    <span>CL</span>
                  </div>
                  )}
                  <div className="flex-1 relative tracking-tight">
                    <div className="prose prose-invert prose-p:my-2 prose-headings:my-4 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-strong:text-[#faf9f5] prose-em:text-[#faf9f5] prose-code:text-[#faf9f5] prose-code:bg-[#1f1e1d] prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
                {message.sender === 'assistant' && (
                      <div className={`absolute bottom-[-10] text-[#b8b5a9] transition-all duration-150 right-2 lg:right-0 bg-[#3d3d3a] rounded-lg flex items-center gap-1 translate-x-2 shadow-sm border-[1px] border-[#5f5d59]/45 styrene-font text-xs p-1 ${currentChat.messages.length === (currentChat.messages.indexOf(message) + 1) ? "opacity-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}` }>
                        <button className="px-1 py-0.5 rounded-md hover:bg-[#262624] flex items-center space-x-1.5 cursor-pointer">
                          <Clipboard className="w-3 h-3" />
                          <span>Copy</span>
                        </button>
                        <button className="px-1 py-0.5 rounded-md hover:bg-[#262624] flex items-center space-x-1.5 cursor-pointer">
                          <RotateCcw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                        <button className="px-1 py-1 rounded-md hover:bg-[#262624] flex items-center space-x-1 cursor-pointer">
                          <div className="group/up relative">
                            <ThumbsUp className="w-3 h-3" />
                            <div className="absolute bottom-full left-1/2 shadow-md -translate-x-1/2 -translate-y-0.5 mb-1 px-2 py-1 bg-[#171717] text-[#e5e5e2] leading-none text-[0.7rem] tracking-tighter rounded-lg opacity-0 group-hover/up:opacity-100 transition-opacity whitespace-nowrap border-[1px] border-[#5f5d59]/25">
                              Start positive feedback report
                            </div>
                          </div>
                        </button>
                        <button className="px-1 py-1 rounded-md hover:bg-[#262624] flex items-center space-x-1 cursor-pointer">
                          <div className="group/down relative">
                            <ThumbsDown className="w-3 h-3" />
                            <div className="absolute bottom-full shadow-md -translate-x-[120px] -translate-y-0.5 mb-1 px-2 py-1 bg-[#171717] text-[#e5e5e2] leading-none text-[0.7rem] tracking-tighter rounded-lg opacity-0 group-hover/down:opacity-100 transition-opacity whitespace-nowrap border-[1px] border-[#5f5d59]/25">
                              Start negative feedback report
                            </div>
                          </div>
                        </button>
                      </div>
                    )}
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 mx-auto w-full pt-6 z-[5] min-w-0 pl-2 lg:pl-11  lg:pr-11 max-w-3xl lg:max-w-[52rem]">
          <div className="flex flex-col bg-[#30302e] border border-[#dfddd3]/30 outline-[#ae5630] focus-within:border-white  pl-4  pt-2.5  pr-2.5  pb-2.5 bottom-2 sm:mx-0  items-stretch  transition-all  duration-200  relative  shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/3.5%)]  focus-within:shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/7.5%)]  hover:border-border-200  focus-within:border-border-200  cursor-text  z-10 rounded-2xl">
            <div className="flex items-start justify-between rounded-lg">
              <textarea
                placeholder="Reply to Scott..."
                className="flex-1 bg-transparent border-none focus:outline-none styrene-font py-1 resize-none min-h-[24px] max-h-[200px] overflow-y-auto"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-md hover:bg-[#151514]/50 flex items-center space-x-1">
                  <Paperclip className="w-4 h-4" />
                </button>
                {inputValue.length > 0 && (
                <button 
                  onClick={handleSubmitMessage}
                  className="hover:cursor-pointer inline-flex items-center justify-center relative shrink-0 ring-offset-2 ring-offset-[#1f1e1d] ring-[#ae5630] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none bg-[#ae5630] text-white font-medium font-styrene transition-colors hover:bg-[#a3512b] h-8 w-8 rounded-md active:scale-95 !rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"></path></svg>
                </button>
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-1 relative">
                <button className="hover:cursor-pointer inline-flex items-center justify-center relative shrink-0 ring-offset-2 ring-offset-[#1f1e1d] ring-[#ae5630] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none h-7 text-[#f5f4ef] text-sm transition-colors hover:bg-[#262624] border-[1px] border-transparent hover:border-[#5f5d59] opacity-80 hover:opacity-100 rounded-md ml-1.5 sm:ml-0 sm:pb-1 sm:pl-1.5 sm:pr-1 sm:pt-1"
                  id="model-menu-btn"
                  type="button"
                  onClick={() => setShowModelMenu((v) => !v)}
                >
                  <div className="whitespace-nowrap tracking-tight text-[14px]">Scott 3.4 Daly</div> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256" className="text-[#a6a39a] ml-1 shrink-0"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                </button>
                {showModelMenu && (
                  <div id="model-menu" className="absolute left-0 bottom-full mb-2 min-w-[220px] w-[280px] bg-[#30302e] border border-[#5f5d59]/25 rounded-xl shadow-lg z-50 p-1 menu-shadow">
                    <button
                      className="w-full flex flex-col items-start px-4 py-2 rounded-lg hover:bg-[#191917] transition-colors text-left styrene-font hover:cursor-pointer"
                      onClick={() => setShowModelMenu(false)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col space-x-2">
                          <span className="font-medium text-[15px] text-[#c2c0b6]">Scott 3.4 Daly</span>   
                          <div className="text-xs text-[#b8b5a9] mt-0.5">Our most intelligent model yet</div>
                        </div>
                        <Check className="w-4 h-4 text-[#2c84db]" />
                      </div>
                    </button>
                  </div>
                )}
              </div>
              {inputValue.length > 4 && (
                <div className="flex items-center text-xs text-[#b8b5a9] styrene-font tracking-tight leading-[0.975rem]"><div className="max-md:hidden">Use <div className="bg-[#262624] inline-flex rounded-md px-1">shift + return</div> for new line</div></div>
              )}
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div ref={shareModalContentRef} className="bg-[#232321] rounded-2xl shadow-2xl border border-[#5f5d59]/80 max-w-md w-full p-7 relative flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <div className="text-2xl tiempos-font">Share Scott's Site</div>
                <div className="flex items-center gap-2">
                  <button 
                    className="text-[#9c9a92] hover:text-text-400 hover:bg-[#141413] -ml-2 rounded-full px-2 py-2 transition-colors cursor-pointer"
                    onClick={() => setShowShareModal(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
                  </button>
                </div>
              </div>
              <div className="text-sm text-[#c2c0b6] mb-5 styrene-font -mt-1">Anyone with this link can view</div>
              <div className="flex items-center mb-2">
                <input
                  ref={shareLinkRef}
                  type="text"
                  value="https://anthropic.rsdaly.com/"
                  readOnly
                  className="flex-1 bg-transparent border border-[#c2c0b6]/80 rounded-lg px-3 py-2 text-[#c2c0b6] styrene-font focus:outline-none select-all"
                  onFocus={e => e.target.select()}
                />
                
              </div>
              <div className="bg-[#141413] text-[#b8b5a9] text-xs rounded-lg px-2 py-2 mb-6 flex flex-row items-start gap-1.5">
                <div className="flex flex-row items-center gap-1 pt-0.5">
                <InfoIcon className="w-3.5 h-3.5" />
                </div>
                <div className="styrene-font">
                <span className="">Don't share personal information or third-party content without permission,</span> and see our <a href="https://www.rsdaly.com/usage" className="underline hover:text-[#ae5630]">Usage Policy</a>.
                </div>
              </div>
              <div>
                <button
                  className={
                    copied
                      ? "flex flex-row items-center gap-2 border border-white text-white bg-[#232321] px-4 py-3.5 rounded-lg text-sm font-medium styrene-font transition-all duration-200 shadow-md"
                      : "flex flex-row items-center cursor-pointer gap-1.5 bg-[#ae5630] hover:bg-[#a3512b] text-white px-4 py-3.5 rounded-lg text-sm font-medium styrene-font transition-all duration-200"
                  }
                  onClick={() => {
                    if (shareLinkRef.current) {
                      shareLinkRef.current.select();
                      document.execCommand('copy');
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }
                  }}
                  disabled={copied}
                >
                  {copied ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="2" fill="none" />
                        <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4" />
                      Copy link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rename Modal */}
        {isRenaming && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 styrene-font">
            <div className="bg-[#1f1e1d] rounded-2xl shadow-2xl border border-[#5f5d59]/80 max-w-md w-full p-6 relative flex flex-col">
              <div className="text-xl tiempos-font mb-2">Rename chat</div>
              <form onSubmit={handleRenameSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-[#30302e] text-gray-100 border border-[#5f5d59]/50 px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={handleRenameCancel}
                    className="px-4 py-2 border border-[#5f5d59]/50 rounded-lg hover:bg-[#141413] hover:border-[#141413] text-sm tracking-tighter font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#faf9f5] hover:opacity-90 opacity-100 text-[#141413] hover:scale-102 tracking-tighter font-medium rounded-lg text-sm transition-all
        ease-[cubic-bezier(0.165,0.85,0.45,1)]
        duration-200
         h-9 px-4 py-2 rounded-lg min-w-[5rem] whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isConfirmingDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 styrene-font">
            <div className="bg-[#1f1e1d] rounded-2xl shadow-2xl border border-[#5f5d59]/80 max-w-md w-full p-6 relative flex flex-col">
              <div className="text-xl tiempos-font text-white">Delete chat?</div>
              <div className="mb-5 text-[#c2c0b6]">Are you sure you want to delete this chat?</div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(false)}
                  className="px-4 py-2 border border-[#5f5d59]/50 rounded-lg hover:bg-[#141413] hover:border-[#141413] text-sm tracking-tighter font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Remove the current chat
                    const idx = chats.findIndex(chat => chat.id === currentChat.id);
                    const updatedChats = chats.filter(chat => chat.id !== currentChat.id);
                    setChats(updatedChats);
                    // Select next chat, or previous, or first if any
                    if (updatedChats.length > 0) {
                      setCurrentChat(updatedChats[Math.max(0, idx - 1)]);
                    } else {
                      // If no chats left, do nothing or show a placeholder
                      // setCurrentChat(undefined); // Not needed if always at least one chat
                    }
                    setIsConfirmingDelete(false);
                  }}
                  className="px-4 py-2 bg-[#8a2424] hover:opacity-95 hover:scale-102 text-white rounded-lg text-sm tracking-tighter font-medium transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;