import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus, Check, Link, InfoIcon } from 'lucide-react';
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
  const [showChatMenu, setShowChatMenu] = useState<number | null>(null);
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
  const chatMenuRef = useRef<HTMLDivElement>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOverlayOpen, setSidebarOverlayOpen] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);

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

  const handleChatRename = (chat: typeof currentChat) => {
    setCurrentChat(chat);
    setNewTitle(chat.title);
    setIsRenaming(true);
    setShowChatMenu(null);
  };

  const handleChatDelete = (chatId: number) => {
    setShowChatMenu(null);
    if (currentChat.id === chatId) {
      setIsConfirmingDelete(true);
    } else {
      // Delete non-current chat directly
      const updatedChats = chats.filter(chat => chat.id !== chatId);
      setChats(updatedChats);
    }
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

  // Close chat menu on outside click
  useEffect(() => {
    if (showChatMenu === null) return;
    function handleClick(e: MouseEvent) {
      if (
        chatMenuRef.current &&
        !chatMenuRef.current.contains(e.target as Node)
      ) {
        setShowChatMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showChatMenu]);

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
            <span className="min-w-0 flex-1 text-sm truncate tracking-tight whitespace-nowrap select-none">claudeluvr99@gmail.com</span>
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
                    <div key={chat.id} className="relative group/chat">
                      <button
                        onClick={() => setCurrentChat(chat)}
                        className={`w-full px-2 py-2 text-[0.85rem] hover:bg-[#0f0f0e] text-[#c2c0b6] rounded-lg cursor-pointer flex items-center space-x-2 ${
                          currentChat.id === chat.id ? 'bg-[#0f0f0e] text-[#faf9f5]' : ''
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="shrink-0"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35a80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg>
                        <span className="truncate styrene-font flex-1 text-left group-hover/chat:[mask-image:linear-gradient(to_right,hsl(var(--always-black))_78%,transparent_95%)] group-focus-within/chat:[mask-image:linear-gradient(to_right,hsl(var(--always-black))_78%,transparent_95%)] [mask-size:100%_100%] [mask-image:linear-gradient(to_right,hsl(var(--always-black))_78%,transparent_95%)]">{chat.title}</span>
                      </button>
                      
                      {/* Ellipses button - shows on hover */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowChatMenu(showChatMenu === chat.id ? null : chat.id);
                        }}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-[#141413] transition-opacity duration-150 ${
                          currentChat.id === chat.id ? 'opacity-100' : 'opacity-0 group-hover/chat:opacity-100'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm136,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112Z"></path>
                        </svg>
                      </button>

                      {/* Chat menu */}
                      {showChatMenu === chat.id && (
                        <div
                          ref={chatMenuRef}
                          className="absolute z-[10] tracking-tight top-full right-2 min-w-[8rem] w-[128px] mt-1 styrene-font text-[#c2c0b6] bg-[#30302e] border-[1px] border-[#5f5d59]/50 backdrop-blur-xl rounded-lg p-1 overflow-hidden menu-shadow"
                        >
                          <button 
                            className="w-full text-left px-2 py-1 hover:bg-[#151514]/70 rounded hover:cursor-pointer"
                            onClick={() => handleChatRename(chat)}
                          >
                            Rename
                          </button>
                          <button 
                            className="w-full text-left px-2 py-1 text-[#e86b6b] hover:bg-[#240e0d]/40 rounded hover:cursor-pointer"
                            onClick={() => handleChatDelete(chat.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
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
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            zIndex: 40,
          }}
          className={`border-r-[1px] border-border-300/10 flex flex-col transition-colors duration-300 ease-in-out ${sidebarCollapsed ? 'bg-[#262624]' : 'bg-[#1f1e1d]'}`}
        >
          <div className={`py-2 px-2 flex items-center justify-between transition-all duration-300 ease-in-out`}> 
            <div className={`flex items-center transition-all duration-300 ease-in-out pb-4`}> 
              
              <button 
                className="inline-flex items-center justify-center relative shrink-0 can-focus select-none hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none text-[#c2c0b6] border-transparent transition font-styrene duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] hover:bg-[#0f0f0e] aria-pressed:bg-[#0f0f0e] aria-checked:bg-[#0f0f0e] aria-expanded:bg-[#141413] hover:text-[#c2c0b6] aria-pressed:text-[#c2c0b6] aria-checked:text-[#c2c0b6] aria-expanded:text-[#c2c0b6] h-8 w-8 rounded-md active:scale-95 group"
                onClick={() => setSidebarCollapsed((v) => !v)}
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <div className="relative *:duration-300 text-text-300 ">
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
                <button className={`w-full can-focus hover:cursor-pointer text-left px-1 py-1.5 rounded-lg flex items-center space-x-1 text-[#d97757] gap-1 ${sidebarCollapsed ? '' : 'hover:bg-[#d97757]/5'}`}>
                  <div className="flex items-center space-x-1 bg-[#c96442] rounded-full p-1 group-hover:scale-105 group-hover:-rotate-3 transition-all ease-in-out group-hover:shadow-md duration-150">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-[0.83rem] mt-1 styrene-font-medium whitespace-nowrap transition-all duration-150 ease-in-out ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>New chat</span>
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
                <div className="mt-1 space-y-0.5 pl-1">
                  {chats.map((chat) => (
                    <div key={chat.id} className="relative group/chat">
                      <button
                        onClick={() => setCurrentChat(chat)}
                        className={`w-full p-2 py-2 text-[0.85rem] hover:bg-[#0f0f0e] text-[#c2c0b6] rounded-lg cursor-pointer flex items-center space-x-2 ${
                          currentChat.id === chat.id ? 'bg-[#0f0f0e] text-[#faf9f5]' : ''
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="shrink-0"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35a80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg>
                        <span className="truncate styrene-font flex-1 text-left group-hover/chat:text-text-100 group-hover/chat:[mask-image:linear-gradient(to_right,hsl(var(--always-black))_70%,transparent_90%)] group-focus-within/chat:[mask-image:linear-gradient(to_right,hsl(var(--always-black))_78%,transparent_95%)] [mask-size:100%_100%]">{chat.title}</span>
                      </button>
                      
                      {/* Ellipses button - shows on hover */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowChatMenu(showChatMenu === chat.id ? null : chat.id);
                        }}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 text-text-300 rounded-md hover:text-text-100 hover:bg-bg-300 group-hover/chat:bg-bg-300 transition-opacity duration-150 ${
                          currentChat.id === chat.id ? 'opacity-100 bg-[#0f0f0e]' : 'opacity-0 group-hover/chat:opacity-100'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm136,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112Z"></path>
                        </svg>
                      </button>

                      {/* Chat menu */}
                      {showChatMenu === chat.id && (
                        <div
                          ref={chatMenuRef}
                          className="absolute z-[10] tracking-tight top-full right-2 min-w-[8rem] w-[128px] mt-1 styrene-font text-[#c2c0b6] bg-[#30302e] border-[1px] border-[#5f5d59]/50 backdrop-blur-xl rounded-lg p-1 overflow-hidden menu-shadow"
                        >
                          <button 
                            className="w-full text-left px-2 py-1 hover:bg-[#151514]/70 rounded hover:cursor-pointer"
                            onClick={() => handleChatRename(chat)}
                          >
                            Rename
                          </button>
                          <button 
                            className="w-full text-left px-2 py-1 text-[#e86b6b] hover:bg-[#240e0d]/40 rounded hover:cursor-pointer"
                            onClick={() => handleChatDelete(chat.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
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
      <div
        className="flex-1 flex flex-col tiempos-font text-[#f5f4ef] overflow-y-scroll bg-[#262624] overflow-x-none"
        style={{
          marginLeft: isMobile ? '0' : (sidebarCollapsed ? '3rem' : '18rem'),
          transition: 'margin-left 0.2s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
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
          <div className='flex items-center justify-between w-full mt-2'>
            <div className="flex-1 flex relative">
              {!isRenaming ? (
                <div className='flex items-center'>
                  <button 
                    ref={titleMenuBtnRef}
                    onClick={() => setShowTitleMenu(!showTitleMenu)}
                    className="flex items-center hover:cursor-pointer hover:bg-black px-1 py-1 rounded-md ring-offset-2 ring-accent-[#ae5630] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none"
                  >
                    <span className="truncate tracking-tight text-[0.9rem] styrene-font">{currentChat.title}</span>
                    <ChevronDown className="w-5 h-5 text-[#ceccc5] ml-1" />
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
                className="inline-flex items-center justify-center relative shrink-0 can-focus tracking-tighter hover:cursor-pointer select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none text-text-300 border-transparent transition styrene-font duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] hover:bg-[#0f0f0e] aria-pressed:bg-[#0f0f0e] aria-checked:bg-[#0f0f0e] aria-expanded:bg-[#141413] hover:text-[#faf9f5] aria-pressed:text-[#faf9f5] aria-checked:text-[#faf9f5] aria-expanded:text-[#faf9f5] h-9 px-4 py-2 rounded-lg min-w-[5rem] active:scale-[0.985] whitespace-nowrap text-sm pl-2 pr-3 mr-3 gap-1 font-medium text-[0.83rem] !text-[#faf9f5]"
                type="button"
                onClick={() => setShowShareModal(true)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mb-1" aria-hidden="true"><path d="M12.1279 2.66477C12.3126 2.45986 12.6298 2.44322 12.835 2.62766L17.835 7.12773L17.9053 7.20585C17.9666 7.29039 17.9999 7.39362 18 7.4998C18 7.64143 17.9402 7.77707 17.835 7.87188L12.835 12.3719L12.7529 12.4315C12.5524 12.5493 12.2896 12.5144 12.1279 12.3348C11.9664 12.1552 11.9594 11.89 12.0977 11.703L12.165 11.6278L16.1963 7.99981H11.5C7.91029 7.99981 5.00023 10.9102 5 14.4999V16.4999L4.99023 16.6005C4.94371 16.8285 4.74171 16.9999 4.5 16.9999C4.25829 16.9999 4.05629 16.8285 4.00977 16.6005L4 16.4999V14.4999C4.00023 10.3579 7.35801 6.99979 11.5 6.99979H16.1963L12.165 3.37181C11.96 3.18704 11.9433 2.86994 12.1279 2.66477Z"></path></svg> Share
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 mt-7 pl-5 lg:pl-10 text-[#f5f4ef] lg:pr-10">
          <div className="max-w-[45rem] mx-auto">
            {currentChat.messages.map((message) => (
              <div key={message.id} className={`group relative mr-4 lg:mr-0 ${
                message.sender === 'user' ? 'mb-4 mt-1 flex w-fit flex-col break-words bg-[#141413] styrene-font max-w-[75ch] ml-px pl-2.5 py-2.5 pr-6 leading-6 rounded-xl text-[0.9375rem] shadow-[0_2px_16px_rgba(0,0,0,0.025)]' : 'mb-8 pr-4 lg:pr-8 leading-[1.65rem] tracking-[0.015em] pt-2 px-2 pb-[1.125rem]'
              }`}>
                <div className="flex items-start space-x-2">
                  {message.sender === 'user' && (
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center tracking-tighter ${
                      'bg-[#6c5bb9] text-white styrene-font-bold text-[12px]'
                    }`}>
                    <span className='mt-0.5'>CL</span>
                  </div>
                  )}
                  <div className="flex-1 relative leading-[1.75rem]">
                    <div className={`prose mt-1 prose-invert prose-p:my-2 prose-headings:my-4 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-strong:text-[#faf9f5] prose-strong:font-semibold prose-em:text-[#faf9f5] prose-code:text-[#faf9f5] prose-code:bg-[#1f1e1d] prose-code:px-1 prose-code:py-0.5 prose-code:rounded ${message.sender === 'user' ? `text-[0.87rem] leading-[1.4rem]` : ''}`}>
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
                {message.sender === 'assistant' && (
                      <div className={`absolute bottom-[-10] text-[#b8b5a9] transition-all duration-150 right-2 lg:right-0 rounded-lg flex items-center translate-x-2 styrene-font text-xs p-1 ${currentChat.messages.length === (currentChat.messages.indexOf(message) + 1) ? "opacity-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}` }>
                        <button 
                          className="p-1.5 rounded-md hover:bg-bg-300 flex items-center space-x-1.5 cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(message.content);
                            setCopiedMessageId(message.id);
                            setTimeout(() => setCopiedMessageId(null), 2000);
                          }}
                        >
                          <div className='group/up relative'>
                            <div className="relative w-5 h-5">
                              {/* Clipboard icon */}
                              <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 20 20" 
                                fill="currentColor" 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`absolute inset-0 shrink-0 transition-all duration-200 ease-in-out ${
                                  copiedMessageId === message.id 
                                    ? 'opacity-0 scale-75' 
                                    : 'opacity-100 scale-100'
                                }`} 
                                aria-hidden="true"
                              >
                                <path d="M10 1.5C11.1097 1.5 12.0758 2.10424 12.5947 3H14.5C15.3284 3 16 3.67157 16 4.5V16.5C16 17.3284 15.3284 18 14.5 18H5.5C4.67157 18 4 17.3284 4 16.5V4.5C4 3.67157 4.67157 3 5.5 3H7.40527C7.92423 2.10424 8.89028 1.5 10 1.5ZM5.5 4C5.22386 4 5 4.22386 5 4.5V16.5C5 16.7761 5.22386 17 5.5 17H14.5C14.7761 17 15 16.7761 15 16.5V4.5C15 4.22386 14.7761 4 14.5 4H12.958C12.9853 4.16263 13 4.32961 13 4.5V5.5C13 5.77614 12.7761 6 12.5 6H7.5C7.22386 6 7 5.77614 7 5.5V4.5C7 4.32961 7.0147 4.16263 7.04199 4H5.5ZM12.54 13.3037C12.6486 13.05 12.9425 12.9317 13.1963 13.04C13.45 13.1486 13.5683 13.4425 13.46 13.6963C13.1651 14.3853 12.589 15 11.7998 15C11.3132 14.9999 10.908 14.7663 10.5996 14.4258C10.2913 14.7661 9.88667 14.9999 9.40039 15C8.91365 15 8.50769 14.7665 8.19922 14.4258C7.89083 14.7661 7.48636 15 7 15C6.72386 15 6.5 14.7761 6.5 14.5C6.5 14.2239 6.72386 14 7 14C7.21245 14 7.51918 13.8199 7.74023 13.3037L7.77441 13.2373C7.86451 13.0913 8.02513 13 8.2002 13C8.40022 13.0001 8.58145 13.1198 8.66016 13.3037C8.88121 13.8198 9.18796 14 9.40039 14C9.61284 13.9998 9.9197 13.8197 10.1406 13.3037L10.1748 13.2373C10.2649 13.0915 10.4248 13.0001 10.5996 13C10.7997 13 10.9808 13.1198 11.0596 13.3037C11.2806 13.8198 11.5874 13.9999 11.7998 14C12.0122 14 12.319 13.8198 12.54 13.3037ZM12.54 9.30371C12.6486 9.05001 12.9425 8.93174 13.1963 9.04004C13.45 9.14863 13.5683 9.44253 13.46 9.69629C13.1651 10.3853 12.589 11 11.7998 11C11.3132 10.9999 10.908 10.7663 10.5996 10.4258C10.2913 10.7661 9.88667 10.9999 9.40039 11C8.91365 11 8.50769 10.7665 8.19922 10.4258C7.89083 10.7661 7.48636 11 7 11C6.72386 11 6.5 10.7761 6.5 10.5C6.5 10.2239 6.72386 10 7 10C7.21245 10 7.51918 9.8199 7.74023 9.30371L7.77441 9.2373C7.86451 9.09126 8.02513 9 8.2002 9C8.40022 9.00008 8.58145 9.11981 8.66016 9.30371C8.88121 9.8198 9.18796 10 9.40039 10C9.61284 9.99978 9.9197 9.81969 10.1406 9.30371L10.1748 9.2373C10.2649 9.09147 10.4248 9.00014 10.5996 9C10.7997 9 10.9808 9.11975 11.0596 9.30371C11.2806 9.8198 11.5874 9.99989 11.7998 10C12.0122 10 12.319 9.81985 12.54 9.30371ZM10 2.5C8.89543 2.5 8 3.39543 8 4.5V5H12V4.5C12 3.39543 11.1046 2.5 10 2.5Z"></path>
                              </svg>
                              
                              {/* Checkmark icon */}
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className={`absolute inset-0 shrink-0 text-text-200 transition-all duration-200 ease-in-out ${
                                  copiedMessageId === message.id 
                                    ? 'opacity-100 scale-95' 
                                    : 'opacity-0 scale-70'
                                }`} 
                                aria-hidden="true"
                              >
                                <path d="M20 6 9 17l-5-5"/>
                              </svg>
                            </div>
                            <div className="absolute bottom-full left-1/2 shadow-md -translate-x-1/2 -translate-y-0.5 mb-1 px-2 py-1.5 bg-[#171717] text-text-100 leading-none text-[0.7rem] rounded-lg opacity-0 group-hover/up:opacity-100 transition-opacity whitespace-nowrap border-[1px] border-[#5f5d59]/25">
                              {copiedMessageId === message.id ? 'Copied!' : 'Copy'}
                            </div>
                          </div>
                        </button>
                        
                        <button className="p-1.5 rounded-md hover:bg-bg-300 flex items-center justify-center cursor-pointer">
                          <div className="group/up relative flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0 " aria-hidden="true"><path d="M9.56055 2C11.1381 2.00009 12.3211 3.44332 12.0117 4.99023L11.6094 7H13.8438C15.5431 7 16.836 8.52594 16.5566 10.2021L15.876 14.2842C15.6148 15.8513 14.2586 17 12.6699 17H4.5C3.67157 17 3 16.3284 3 15.5V9.23828C3.00013 8.57996 3.4294 7.99838 4.05859 7.80469L5.19824 7.4541L5.33789 7.40723C6.02983 7.15302 6.59327 6.63008 6.89746 5.9541L8.41113 2.58984L8.48047 2.46094C8.66235 2.17643 8.97898 2.00002 9.32324 2H9.56055ZM7.80957 6.36523C7.39486 7.2867 6.62674 7.99897 5.68359 8.3457L5.49219 8.41016L4.35254 8.76074C4.14305 8.82539 4.00013 9.01904 4 9.23828V15.5C4 15.7761 4.22386 16 4.5 16H12.6699C13.7697 16 14.7087 15.2049 14.8896 14.1201L15.5703 10.0381C15.7481 8.97141 14.9251 8 13.8438 8H11C10.8503 8 10.7083 7.9331 10.6133 7.81738C10.5184 7.70164 10.4805 7.54912 10.5098 7.40234L11.0312 4.79395C11.2167 3.86589 10.507 3.00009 9.56055 3H9.32324L7.80957 6.36523Z"></path></svg>
                            <div className="absolute bottom-full left-1/2 shadow-md -translate-x-1/2 -translate-y-0.5 mb-1 px-2 py-1.5 bg-[#171717] text-text-100 leading-none text-[0.7rem] rounded-lg opacity-0 group-hover/up:opacity-100 transition-opacity whitespace-nowrap border-[1px] border-[#5f5d59]/25">
                              Give positive feedback
                            </div>
                          </div>
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-bg-300 flex items-center justify-center cursor-pointer">
                          <div className="group/down relative flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true"><path d="M12.6699 3C14.2586 3 15.6148 4.14871 15.876 5.71582L16.5566 9.79785C16.836 11.4741 15.5431 13 13.8438 13H11.6094L12.0117 15.0098C12.3211 16.5567 11.1381 17.9999 9.56055 18H9.32324C8.97898 18 8.66235 17.8236 8.48047 17.5391L8.41113 17.4102L6.89746 14.0459C6.59327 13.3699 6.02983 12.847 5.33789 12.5928L5.19824 12.5459L4.05859 12.1953C3.4294 12.0016 3.00013 11.42 3 10.7617V4.5C3 3.67157 3.67157 3 4.5 3H12.6699ZM4.5 4C4.22386 4 4 4.22386 4 4.5V10.7617C4.00013 10.981 4.14305 11.1746 4.35254 11.2393L5.49219 11.5898L5.68359 11.6543C6.62674 12.001 7.39486 12.7133 7.80957 13.6348L9.32324 17H9.56055C10.507 16.9999 11.2167 16.1341 11.0312 15.2061L10.5098 12.5977C10.4805 12.4509 10.5184 12.2984 10.6133 12.1826C10.7083 12.0669 10.8503 12 11 12H13.8438C14.9251 12 15.7481 11.0286 15.5703 9.96191L14.8896 5.87988C14.7087 4.79508 13.7697 4 12.6699 4H4.5Z"></path></svg>
                            <div className="absolute bottom-full shadow-md -translate-y-0.5 mb-1 px-2 py-1.5 bg-[#171717] text-text-100 leading-none text-[0.7rem] rounded-lg opacity-0 group-hover/down:opacity-100 transition-opacity whitespace-nowrap border-[1px] border-[#5f5d59]/25">
                              Give negative feedback
                            </div>
                          </div>
                        </button>
                        <button className="py-1.5 px-2 rounded-md hover:bg-bg-300 flex items-center space-x-1.5 cursor-pointer">
                          <span className='text-[0.83rem] mt-1'>Retry</span>
                        </button>
                       
                      </div>
                    )}
                
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 bg-gradient-to-b from-transparent via-bg-100 to-bg-100 mx-auto w-full pt-6 z-[5] min-w-0 pl-2 lg:pl-11  lg:pr-11 max-w-3xl lg:max-w-[52.5rem]">
          <div className="relative flex flex-col gap-2 bg-[#30302e] border-[0.5px] border-[#dfddd3]/10 outline-[#ae5630] p-3.5 bottom-2 sm:mx-0 transition-all duration-200 shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/3.5%)] focus-within:shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/7.5%)] hover:border-border-200/30 focus-within:border-border-200/30 cursor-text z-10 rounded-2xl">
            {/* Top: Text input */}
            <textarea
              placeholder="Reply to Scott..."
              className="w-full bg-transparent border-none focus:outline-none styrene-font py-1 resize-none min-h-[24px] max-h-[200px] overflow-y-auto text-[0.92rem]"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={1}
            />

            {/* Bottom: controls row */}
            <div className="flex items-center justify-between">
              {/* Left controls */}
              <div className="flex items-center gap-2">
                <button className="p-[7.5px] active:scale-[0.98] hover:text-text-200/90 hover:bg-bg-100 transition-all rounded-lg hover:bg-[#151514]/50 text-text-300 border-[0.5px] border-border-300/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
                </button>
                <button className="p-2 active:scale-[0.98] hover:text-text-200/90 hover:bg-bg-100 transition-all rounded-lg hover:bg-[#151514]/50 text-text-300 border-[0.5px] border-border-300/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z"></path></svg>
                </button>
                
              </div>

              {/* Right controls: model selector + send */}
              <div className="flex items-center gap-2">
                <button
                  id="model-menu-btn"
                  type="button"
                  onClick={() => setShowModelMenu((v) => !v)}
                  className="flex items-center justify-center relative can-focus select-none mt-1
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none h-7 border-[0.5px] text-text-100 ml-1.5 gap-[0.175em] rounded-md border-transparent text-sm opacity-80 transition hover:opacity-100 disabled:!opacity-80 hover:bg-bg-100 hover:border-border-400/20 px-1.5"
                >
                  <div className="inline-flex items-center  text-[14px] leading-none tracking-wide">Scott Daly 4.1</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256" className="text-text-500 shrink-0 mb-0.5"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                </button>
                <button
                  onClick={handleSubmitMessage}
                  disabled={!inputValue.trim()}
                  className="inline-flex
  items-center
  justify-center
  relative
  shrink-0
  can-focus
  select-none
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none
  disabled:drop-shadow-none bg-accent-main-000
          text-oncolor-100
          font-base-bold
          transition-colors
          hover:bg-accent-main-200 h-8 w-8 rounded-md active:scale-95 !rounded-lg !h-8 !w-8"
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" className=""><path d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"></path></svg>
                </button>
              </div>
            </div>

            {showModelMenu && (
              <div id="model-menu" className="absolute right-12 bottom-10 mb-2 min-w-[220px] w-[280px] bg-[#30302e] border border-[#5f5d59]/25 rounded-xl shadow-lg z-50 p-1 menu-shadow">
                <button
                  className="w-full flex flex-col items-start px-4 py-2 rounded-lg hover:bg-[#191917] transition-colors text-left styrene-font hover:cursor-pointer"
                  onClick={() => setShowModelMenu(false)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col space-x-2">
                      <span className="text-[13px] text-[#c2c0b6]">Scott Daly 4.1</span>
                      <div className="text-xs text-text-400 mt-0.5">Our most capable model yet</div>
                    </div>
                    <Check className="w-4 h-4 text-[#2c84db]" />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div ref={shareModalContentRef} className="bg-[#262624] mx-4 rounded-2xl shadow-xl border-[0.5px] border-border-300/20 max-w-lg w-full p-4 md:p-6 relative flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <div className="text-xl md:text-2xl tiempos-font mb-1">Share Scott's Site</div>
                <div className="flex items-center gap-2">
                  <button 
                    className="text-[#9c9a92] hover:text-text-400 hover:bg-[#141413] -mr-2 rounded-xl px-1.5 py-1.5 transition-colors cursor-pointer"
                    onClick={() => setShowShareModal(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
                  </button>
                </div>
              </div>
              <div className="text-sm text-[#c2c0b6] mb-4 styrene-font -mt-1">Anyone with this link can view</div>
              <div className="flex items-center mb-2">
                <input
                  ref={shareLinkRef}
                  type="text"
                  value="https://anthropic.rsdaly.com/"
                  readOnly
                  className="flex-1 bg-transparent border-[0.5px] border-border-300/20 rounded-md px-3 py-2 text-[#c2c0b6] styrene-font focus:outline-none select-all"
                  onFocus={e => e.target.select()}
                />
                
              </div>
              <div className="bg-[#141413] text-[#b8b5a9] text-[0.7rem] rounded-lg px-2 py-2 mb-6 flex flex-row items-start gap-1.5">
                <div className="flex flex-row items-center gap-1 pt-0.5">
                <InfoIcon className="w-3.5 h-3.5" />
                </div>
                <div className="styrene-font mt-0.5">
                <span className="">Don't share personal information or third-party content without permission,</span> and see our <a href="/usage" className="underline hover:text-[#faf9f5]">Usage Policy</a>.
                </div>
              </div>
              <div>
                <button
                  className={
                    copied
                      ? "flex flex-row items-center gap-2 border-[0.5px] border-[#dedcd1]/30 text-white hover:border-[#0f0f0e] hover:bg-[#0f0f0e] pl-2.5 pr-3.5 py-2 rounded-lg text-[0.95rem] font-medium styrene-font transition-all duration-200"
                      : "flex flex-row items-center cursor-pointer gap-1.5 bg-[#faf9f5] text-[#30302e] pl-2.5 pr-3.5 py-2 rounded-lg text-[0.95rem] font-medium styrene-font hover:opacity-90 hover:scale-y-[1.015] hover:scale-x-[1.005] transition-all duration-200"
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
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="2" fill="none" />
                        <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="mt-1">Copied</span>
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4" />
                      <span className="mt-1">Copy link</span>
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
            <div className="bg-bg-100 rounded-2xl shadow-2xl border border-border-300/10 mx-4 max-w-md w-full p-4 md:p-6 relative flex flex-col">
              <div className="text-[1.15rem] styrene-font font-medium tracking-tight mb-2.5">Rename chat</div>
              <form onSubmit={handleRenameSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-bg-000 h-9 text-[0.9rem] text-text-100 border border-border-300/15 hover:border-border-200/30 px-3 pt-2 pb-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#599ee3]/70 focus:ring-offset-2 focus:ring-offset-bg-100 transition-colors mb-1"
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={handleRenameCancel}
                    className="px-4 pb-1 pt-2 border border-[#5f5d59]/50 rounded-lg hover:bg-[#141413] hover:border-[#141413] text-[0.84rem] tracking-tighter font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#faf9f5] hover:opacity-90 opacity-100 text-[#141413] hover:scale-102 tracking-tighter font-medium rounded-lg text-[0.84rem] transition-all
        ease-[cubic-bezier(0.165,0.85,0.45,1)]
        duration-200
         h-9 px-4 pb-1 pt-2 rounded-lg min-w-[5rem] whitespace-nowrap"
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
            <div className="bg-bg-100 mx-4 rounded-2xl shadow-2xl border-[0.5px] border-border-300/20 max-w-md w-full p-6 relative flex flex-col">
              <div className="text-[1.12rem] font-medium styrene-font text-text-100 mb-1">Delete chat</div>
              <div className="mb-6 text-[0.96rem] tracking-tight text-text-200">Are you sure you want to delete this chat?</div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(false)}
                  className="px-4.5 pb-1.5 pt-2 border border-[#5f5d59]/50 rounded-lg hover:bg-[#141413] hover:border-[#141413] text-[0.84rem] tracking-tighter font-medium transition-colors duration-200"
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
                  className="px-4.5 pb-1.5 pt-2 bg-danger-200 hover:opacity-95 hover:scale-102 text-oncolor-100 rounded-lg text-[0.84rem] tracking-tight transition-all duration-200"
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