import React from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { Footer } from '@/components/layout/Footer';
import { TAiEngineScene } from '@/components/canvas/TAiEngineScene';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#0A1628] text-white overflow-x-hidden">
      <LandingNavbar />
      
      {/* 3D Background */}
      <TAiEngineScene />

      {/* Scroll Container */}
      <div className="relative z-10">
        
        {/* SECTION 1: HERO (0% - 15%) */}
        <section className="h-screen flex items-center justify-center" data-scroll-section="0">
          <div className="text-center max-w-4xl px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              All-in-one <br/>
              <span className="text-[#0898BB]">Tax Intelligence Engine</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              A unified platform that maps your entities, ingests your ledgers, applies the law, and produces audit-ready answers.
            </p>
            <div className="inline-block bg-white/5 border border-white/10 rounded-lg px-6 py-3 font-mono text-sm text-[#0898BB]">
              npm i @taxai/sdk
            </div>
            <div className="mt-12 text-sm text-white/40 font-mono uppercase tracking-widest">
              Trusted by: Family Offices • Free Zone Groups • Multinational Structures
            </div>
          </div>
        </section>

        {/* SECTION 2: THE TOOLBOX (15% - 35%) */}
        <section className="min-h-screen flex items-center px-6 md:px-20" data-scroll-section="1">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-6">The complete tax-function toolbox.</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Entity Graph', 'Ledger Engine', 'Reg Sync', 'Scenario Builder', 'Disclosures', 'Risk Scanner'].map((item) => (
                <div key={item} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-[#0898BB] transition-colors cursor-default">
                  <span className="text-sm font-mono text-[#0898BB]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: ORCHESTRATOR (35% - 55%) */}
        <section className="min-h-screen flex items-center justify-end px-6 md:px-20" data-scroll-section="2">
          <div className="max-w-xl text-right">
            <h2 className="text-4xl font-bold mb-6">Runs like clockwork.</h2>
            <p className="text-lg text-white/70 mb-8">
              Coordinate each step—entity mapping, ledger ingestion, rule evaluation—with the TAi Orchestrator.
            </p>
            <div className="bg-[#0A1628]/90 border border-[#0898BB]/30 rounded-lg p-6 text-left font-mono text-sm shadow-2xl">
              <div className="text-[#0898BB]">const pipeline = new Orchestrator();</div>
              <div className="text-white/80 pl-4">.ingest('ERP_Data')</div>
              <div className="text-white/80 pl-4">.validate('UAE_CT_Rules')</div>
              <div className="text-white/80 pl-4">.generate('Filing_XML');</div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DATA & COMPLIANCE (55% - 75%) */}
        <section className="min-h-screen flex items-center px-6 md:px-20" data-scroll-section="3">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-6">Adaptive Compliance.</h2>
            <p className="text-lg text-white/70 mb-8">
              Make your outputs respond dynamically to jurisdictions, free-zone rules, and entity-level attributes.
            </p>
            <div className="bg-[#0A1628]/90 border border-[#0898BB]/30 rounded-lg p-6 font-mono text-sm shadow-2xl">
              <div className="text-[#FCD34D]">{"{"}</div>
              <div className="pl-4 text-[#0898BB]">"entity": <span className="text-white">"HoldCo_ADGM"</span>,</div>
              <div className="pl-4 text-[#0898BB]">"status": <span className="text-white">"Qualifying_Free_Zone_Person"</span>,</div>
              <div className="pl-4 text-[#0898BB]">"reliefs": <span className="text-white">["Participation_Exemption"]</span></div>
              <div className="text-[#FCD34D]">{"}"}</div>
            </div>
          </div>
        </section>

        {/* SECTION 5: KNOWLEDGE GRAPH (75% - 95%) */}
        <section className="min-h-screen flex items-center justify-center" data-scroll-section="4">
          <div className="text-center max-w-2xl">
            <h2 className="text-4xl font-bold mb-6">Modular Engine Architecture.</h2>
            <div className="flex justify-center gap-8 font-mono text-sm">
              <div className="text-center">
                <div className="text-[#0898BB] text-2xl font-bold">1.1 MB</div>
                <div className="text-white/50">Entity Graph</div>
              </div>
              <div className="text-center">
                <div className="text-[#0898BB] text-2xl font-bold">3.2 MB</div>
                <div className="text-white/50">Rule Engine</div>
              </div>
              <div className="text-center">
                <div className="text-[#0898BB] text-2xl font-bold">2.4 MB</div>
                <div className="text-white/50">Ledger Engine</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: SYNTHESIS (95% - 100%) */}
        <section className="h-[50vh] flex items-center justify-center" data-scroll-section="5">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-8">Start using TAi Engine.</h2>
            <button className="bg-gradient-to-r from-[#06708a] to-[#0898bb] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(8,152,187,0.4)] transition-all">
              Get Documentation
            </button>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}