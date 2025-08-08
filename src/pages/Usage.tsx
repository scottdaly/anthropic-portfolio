function Usage() {
  return (
    <div className="min-h-screen bg-[#f6f5f1] text-[#1a1a18]">
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <header className="pt-24 pb-8">
          <a href="/" className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true"><path d="M8.14648 4.64648C8.34176 4.45136 8.6583 4.45127 8.85352 4.64648C9.04868 4.8417 9.04862 5.15826 8.85352 5.35352L4.70703 9.50001H16.5C16.7761 9.50001 17 9.72387 17 10C16.9999 10.2761 16.7761 10.5 16.5 10.5H4.70703L8.85352 14.6465C9.04863 14.8418 9.04873 15.1583 8.85352 15.3535C8.6583 15.5487 8.34174 15.5486 8.14648 15.3535L3.14648 10.3535C3.05274 10.2598 3.00003 10.1326 3 10C3 9.90061 3.02967 9.80418 3.08398 9.72267L3.14648 9.64649L8.14648 4.64648Z"></path></svg>Return to Scott Daly
          </a>
          <h1 className="styrene-font font-semibold text-[5rem] leading-none text-[#1d1c18] tracking-tight">Usage Policy</h1>
          <div className="mt-6 flex items-center justify-between border-b border-[#1d1c18] py-4">
            <span className="styrene-font text-md font-semibold text-[#2c2c2c]">Effective August 6, 2025</span>
           
          </div>
        </header>

        <section className="tiempos-font text-[17px] leading-7 text-[#2a2822] space-y-6">
          <p>
            This portfolio is a playful homage to the Claude interface, built to show product sense and craft, not to impersonate anything official.
            It is <span className="styrene-font-medium">not an Anthropic product</span>, is <span className="styrene-font-medium">not affiliated with or endorsed by Anthropic</span>, and there’s no AI hiding behind the curtain.
          </p>
          <p>
            The chat UI is a front‑end demo only. Your messages live in your browser for the duration of the session and vanish on refresh like little ghosts. No accounts, no servers, no model calls.
          </p>

          <div className="h-6" />

          <h2 className="tiempos-font text-2xl text-[#1d1c18]">What this site is (and isn’t)</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="styrene-font-medium">Is:</span> a UX case study wrapped in a claude-inspired interface .</li>
            <li><span className="styrene-font-medium">Isn’t:</span> an AI assistant, a data collection tool, or a production service.</li>
          </ul>

          <div className="h-6" />

          <h2 className="tiempos-font text-2xl text-[#1d1c18]">Attribution & Non‑Affiliation</h2>
          <p>
            Anthropic and Claude are the property of their respective owners. This site is an independent portfolio project for educational and illustrative purposes only. Any resemblance in vibe or layout is purely stylistic admiration.
          </p>

          <div className="h-6" />

          <h2 className="tiempos-font text-2xl text-[#1d1c18]">Say hello</h2>
          <p>
            Thoughts, feedback, or opportunities? Visit <a href="https://www.rsdaly.com" className="underline text-[#1d1c18]">Scott’s website</a> to get in touch.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Usage


