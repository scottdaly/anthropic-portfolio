import React, { useState } from 'react';
import { Star, ChevronDown, ThumbsUp, Settings, Paperclip, PenLine, ThumbsDown, Clipboard, RotateCcw } from 'lucide-react';

// Mock data for chats
const initialChats = [
  {
    id: 1,
    title: 'Soldering Header Pins on MAX98357A I2S Amp',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'I am soldering header pins onto a max 98357A i2s amp, what temperature should I set my soldering iron to?',
      },
      {
        id: 2,
        sender: 'assistant',
        content: `For soldering header pins onto the MAX98357A I2S amplifier, I'd recommend setting your soldering iron between 315-340°C (600-650°F). This temperature range is suitable for lead-free solder, which is most commonly used today, while still being low enough to avoid damaging the board or components.

A few tips:
• Make sure your soldering iron tip is clean and properly tinned
• Don't hold the iron on the pins/pads for more than 2-3 seconds
• If the solder isn't flowing well at 315°C, you can gradually increase the temperature
• Let each joint cool completely before moving the board

Would you like any specific advice about soldering technique for these header pins?`,
      },
      {
        id: 3,
        sender: 'user',
        content: 'I am soldering header pins onto a max 98357A i2s amp, what temperature should I set my soldering iron to?',
      },
      {
        id: 4,
        sender: 'assistant',
        content: `For soldering header pins onto the MAX98357A I2S amplifier, I'd recommend setting your soldering iron between 315-340°C (600-650°F). This temperature range is suitable for lead-free solder, which is most commonly used today, while still being low enough to avoid damaging the board or components.

A few tips:
• Make sure your soldering iron tip is clean and properly tinned
• Don't hold the iron on the pins/pads for more than 2-3 seconds
• If the solder isn't flowing well at 315°C, you can gradually increase the temperature
• Let each joint cool completely before moving the board

Would you like any specific advice about soldering technique for these header pins?`,
      },
    ],
  },
  {
    id: 2,
    title: 'Connecting a Micro Switch',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'How do I wire a micro switch to an Arduino?',
      },
      {
        id: 2,
        sender: 'assistant',
        content: 'To connect a micro switch to an Arduino, you\'ll need to use a digital input pin and implement pull-up resistors. Would you like a detailed wiring diagram?',
      },
    ],
  },
  {
    id: 3,
    title: 'Simple Audio Tester',
    messages: [
      {
        id: 1,
        sender: 'user',
        content: 'What components do I need for a basic audio signal tester?',
      },
      {
        id: 2,
        sender: 'assistant',
        content: 'For a basic audio signal tester, you\'ll need an op-amp, some resistors, and a few capacitors. Let me help you design a simple circuit.',
      },
    ],
  },
];

function App() {
  const [showTitleMenu, setShowTitleMenu] = useState(false);
  const [chats, setChats] = useState(initialChats);
  const [currentChat, setCurrentChat] = useState(chats[0]);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [inputValue, setInputValue] = useState('');
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

  return (
    <div className="flex h-screen from-[#262624] to-[#30302e] bg-gradient-to-b text-gray-100 styrene-font">
      {/* Sidebar */}
      <div className="w-[18rem] from-[#201f1e]/70 to-[#1b1a18]/70 bg-gradient-to-b border-r-[1px] border-[#5f5d59]/25 flex flex-col">
        <div className="py-4 px-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="tiempos-font text-[#ceccc5] text-xl">Scott Daly</span>
          </div>
          
        </div>

        {/* Sidebar Content */}
        <div className="tracking-tight">
          <button className="w-full text-left px-3 py-1 rounded-lg hover:bg-gray-800 flex items-center space-x-1 text-[#b6613c]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" className="shrink-0"><path fill="currentColor" d="M8 1.5a6.5 6.5 0 0 1 5.74 9.55l.7 2.13a1 1 0 0 1-1.26 1.27l-2.13-.71A6.5 6.5 0 1 1 8 1.5Zm0 12a5.5 5.5 0 0 0 2.75-.74.5.5 0 0 1 .41-.04l2.34.78-.78-2.34a.5.5 0 0 1 .04-.4A5.5 5.5 0 1 0 8 13.5Z"></path><path stroke="currentColor" stroke-linecap="round" d="M8 6.4v3.2M9.6 8H6.4"></path></svg>
            <span className="text-[0.95rem]">Start new chat</span>
          </button>
          

          <div className="mt-4">
            <div className="px-3 py-2 text-sm text-gray-400">
              <span className='text-[#ceccc5] styrene-font-bold'>Recents</span>
            </div>
            <div className="mt-1 space-y-0.5 px-1">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setCurrentChat(chat)}
                  className={`w-full px-2 py-1 text-sm hover:bg-[#1a1918] text-[#e5e5e2] rounded-lg cursor-pointer flex items-center space-x-2 ${
                    currentChat.id === chat.id ? 'bg-[#1a1918]' : ''
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="shrink-0"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg>
                  <span className="truncate tiempos-font">{chat.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto py-2 px-3">
          <div className="flex items-center justify-center rounded-t-md mx-2 py-1 border-t-[1px] border-r-[1px] border-l-[1px] border-[#5645a1]/50 bg-gradient-to-b from-[#6c5bb9]/0 to-[#6c5bb9]/5">
            <span className="text-xs text-[#9b87f5]/80 tiempos-font">Professional Plan</span>
          </div>
          <div className="inline-flex items-center justify-center bg-[#191917]/25 hover:cursor-pointer bg-opacity-70 hover:bg-opacity-100 shrink-0 ring-offset-2 ring-accent-[#ae5630] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none border-[1px] border-[#5e5d59]/25 hover:border-[#5e5d59]/50 group relative z-[1] w-full overflow-hidden rounded-lg !px-2.5 !py-2 !text-left">
            <div className="flex items-center w-full gap-1.5">
              <div className="w-7 h-7 rounded-full bg-[#6c5bb9] flex items-center justify-center">
                <span className="text-xs styrene-font-bold">SD</span>
              </div>
              <span className="min-w-0 flex-1 text-sm truncate tracking-tight">desertcitysoundtrack@gmail.com</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
            </div>
            
          </div>
        </div>
        <div className="mt-0.5 mb-4 flex items-center justify-between px-4 tracking-tight">
          <p className="text-xs text-[#ceccc5]">SD</p>
          <div className="flex items-center space-x-1 hover:cursor-pointer group">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
          <p className="text-xs text-[#ceccc5] group-hover:underline styrene-font-medium">Help & Support</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col tiempos-font text-[#f5f4ef] overflow-y-scroll">
        {/* Header */}
        <div className='sticky top-0 z-[8] -mb-6 flex h-14 items-center gap-3 pl-11 pr-2 md:pt-1 md:pb-0.5 md:pl-6'>
          
        <div className="bg-gradient-to-b from-[#262624] via-[#262624] to-[#262624]/0 md:pl-6 md:pr-4 px-2  w-full z-[-1] -bottom-5 inset-0 via-50% absolute pointer-events-none"></div>
        <div className='flex items-center justify-between w-full'>
          <div className="flex-1 flex relative py-4">
            {isRenaming ? (
              <form onSubmit={handleRenameSubmit} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-[#171717] text-gray-100 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-gray-700 rounded-md hover:bg-gray-600 text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleRenameCancel}
                  className="px-3 py-1 bg-gray-800 rounded-md hover:bg-gray-700 text-sm"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className='flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" className="text-[#ceccc5] mr-1 mb-1.5 shrink-0 translate-y-px"><path d="M232.07,186.76a80,80,0,0,0-62.5-114.17A80,80,0,1,0,23.93,138.76l-7.27,24.71a16,16,0,0,0,19.87,19.87l24.71-7.27a80.39,80.39,0,0,0,25.18,7.35,80,80,0,0,0,108.34,40.65l24.71,7.27a16,16,0,0,0,19.87-19.86ZM62,159.5a8.28,8.28,0,0,0-2.26.32L32,168l8.17-27.76a8,8,0,0,0-.63-6,64,64,0,1,1,26.26,26.26A8,8,0,0,0,62,159.5Zm153.79,28.73L224,216l-27.76-8.17a8,8,0,0,0-6,.63,64.05,64.05,0,0,1-85.87-24.88A79.93,79.93,0,0,0,174.7,89.71a64,64,0,0,1,41.75,92.48A8,8,0,0,0,215.82,188.23Z"></path></svg>
                
              <button 
                onClick={() => setShowTitleMenu(!showTitleMenu)}
                className="flex items-center hover:bg-[#151514]/40 px-1 py-0.5 rounded-md ring-offset-2 ring-accent-[#ae5630] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none text-text-200"
              >
                <span>{currentChat.title}</span>
                <ChevronDown className="w-4 h-4 text-[#ceccc5]" />
              </button>
              </div>
            )}
            
            {showTitleMenu && !isRenaming && (
              <div className="absolute z-[10] top-full min-w-[8rem] w-[128px] mt-1 styrene-font text-[#e5e5e2] bg-[#262624] border-[1px] border-[#5f5d59]/25 backdrop-blur-xl rounded-lg p-1 overflow-hidden menu-shadow ">
                <button 
                  className="w-full text-left px-2 py-1 hover:bg-[#151514]/70 hover:text-[#f8f8f7] rounded hover:cursor-pointer"
                  onClick={handleRename}
                >
                  Rename
                </button>
                <button className="w-full text-left px-2 py-1 hover:bg-[#151514]/70 hover:text-[#f8f8f7] rounded hover:cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Star className="w-5 h-5 text-gray-400" />
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 mt-8 pl-6 text-[#f5f4ef] md:pr-16">
          <div className="max-w-3xl mx-auto">
            {currentChat.messages.map((message) => (
              <div key={message.id} className={`group relative ${
                message.sender === 'user' ? 'mb-4 inline-flex flex-col break-words bg-gradient-to-b from-[#1f1e1d] to-[#1a1918] styrene-font max-w-[75ch] ml-px pl-2.5 py-2.5 pr-6 leading-6 rounded-xl text-[0.9375rem] shadow-[0_2px_16px_rgba(0,0,0,0.025)]' : 'mb-8 bg-gradient-to-b from-[#3C3C39]/75 to-[#30302E] pr-4 md:pr-8 leading-[1.65rem] tracking-[0.015em] pt-3.5 px-4 pb-[1.125rem] rounded-2xl border-[0.5px] border-[#5e5d59]/15 shadow-[0_4px_24px_rgba(0,0,0,0.015)]'
              }`}>
                <div className="flex items-start space-x-4">
                  {message.sender === 'user' && (
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      'bg-[#e5e5e2] text-[#30302e] styrene-font-bold text-[12px]'
                    }`}>
                    <span>U</span>
                  </div>
                  )}
                  <div className="flex-1 relative">
                    <div className="prose prose-invert">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    
                  </div>
                </div>
                {message.sender === 'assistant' && (
                      <div className={`absolute bottom-[-10] text-[#b8b5a9] transition-all duration-150 right-0 bg-[#3d3d3a] rounded-lg flex items-center gap-1 translate-x-2 shadow-sm border-[1px] border-[#5f5d59]/25 styrene-font text-xs p-1 ${currentChat.messages.length === (currentChat.messages.indexOf(message) + 1) ? "opacity-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}` }>
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
        <div className="sticky bottom-0 mx-auto w-full pt-6 z-[5] min-w-0 md:pl-2 md:pr-12">
          <div className="flex flex-col bg-[#3d3d3a]  gap-1.5  border-[1px]  border-[#5f5d59]/25  pl-4  pt-2.5  pr-2.5  pb-2.5  sm:mx-0  items-stretch  transition-all  duration-200  relative  shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/3.5%)]  focus-within:shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/7.5%)]  hover:border-border-200  focus-within:border-border-200  cursor-text  z-10 rounded-t-2xl border-b-0">
            <div className="flex items-center justify-between rounded-lg">
              <input
                type="text"
                placeholder="Reply to Scott..."
                className="flex-1 bg-transparent border-none focus:outline-none styrene-font py-1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-md hover:bg-[#151514]/50 flex items-center space-x-1">
                  <Paperclip className="w-4 h-4" />
                </button>
                {inputValue.length > 0 && (
                <button className="hover:cursor-pointer inline-flex items-center justify-center relative shrink-0 ring-offset-2 ring-offset-[#1f1e1d] ring-[#ae5630] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none bg-[#ae5630] text-white font-medium font-styrene transition-colors hover:bg-[#a3512b] h-8 w-8 rounded-md active:scale-95 !rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z"></path></svg>
                </button>
                )}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <button className="hover:cursor-pointer inline-flex items-center justify-center relative shrink-0 ring-offset-2 ring-offset-[#1f1e1d] ring-[#ae5630] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none h-7 text-[#f5f4ef] text-sm transition-colors hover:bg-[#262624] border-[1px] border-transparent hover:border-[#5f5d59] opacity-80 hover:opacity-100 rounded-md ml-1.5 sm:ml-0 sm:pb-1 sm:pl-1.5 sm:pr-1 sm:pt-1">
                  <div className="whitespace-nowrap tracking-tight text-[14px]">Claude 3.5 Sonnet</div> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256" className="text-[#a6a39a] ml-1 shrink-0"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                  </button>
                
                <button className="hover:cursor-pointer inline-flex items-center justify-center relative shrink-0 ring-offset-2 ring-offset-[#1f1e1d] ring-[#ae5630] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none h-7 text-[#a6a39a] gap-1 text-sm transition-colors hover:bg-[#262624] border-[1px] border-transparent hover:border-[#5f5d59] opacity-80 hover:opacity-100 rounded-md ml-1.5 sm:ml-0 sm:pb-1 sm:pl-1.5 sm:pr-1 sm:pt-1">
                  <PenLine className="w-4 h-4" />
                  <div className="whitespace-nowrap tracking-tight text-[14px]">Choose style</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256" className="text-[#a6a39a] ml-px shrink-0"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                </button>
              </div>
              {inputValue.length > 4 && (
                <div className="flex items-center text-xs text-[#b8b5a9] styrene-font tracking-tight leading-[0.975rem]"><div className="max-md:hidden">Use <div className="bg-[#262624] inline-flex rounded-md px-1">shift + return</div> for new line</div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;