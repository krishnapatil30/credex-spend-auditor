"use client";

import { useState, useMemo } from "react";
// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
// Logic & Actions
import { calculateAudit } from "@/lib/audit-logic";
import { processAuditSubmission } from "@/lib/actions";
// Icons
import { 
  TrendingDown, 
  Users, 
  Zap, 
  Mail, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  MousePointerClick, 
  BarChart3 
} from "lucide-react";
export default function AuditPage() {
  const [userCount, setUserCount] = useState(50);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiSummary, setAiSummary] = useState("");

  // Memoized audit calculation for performance
  const audit = useMemo(() => calculateAudit([
    { toolId: "chatgpt", userCount: userCount },
    { toolId: "claude", userCount: Math.floor(userCount * 0.5) },
    { toolId: "cursor", userCount: Math.floor(userCount * 0.3) }
  ]), [userCount]);

  const isHighSavings = audit.annualSavings > 15000;

  const handleSaveAudit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid work email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await processAuditSubmission(email, userCount, audit.annualSavings);
      setAiSummary(result.summary);
      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-12 font-sans selection:bg-blue-100">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Modern Header */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Badge className="bg-blue-600 text-white hover:bg-blue-700 border-none px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              Live Auditor v1.1
            </Badge>
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 md:text-6xl italic">
            CREDEX<span className="text-blue-600 font-light">.</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl leading-relaxed">
            Stop overpaying for fragmented AI seats. Calculate your enterprise recovery in seconds.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {/* Input Card */}
          <Card className="md:col-span-3 shadow-xl shadow-slate-200/50 border-white bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-slate-700 text-sm font-bold uppercase tracking-tighter">
                <Users className="w-4 h-4 text-blue-500" />
                Organization Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Licenses</span>
                  <p className="text-6xl font-black text-slate-900 tabular-nums leading-none">
                    {userCount}
                  </p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">Prosumer Tier</p>
                    <p className="text-[10px] text-slate-400 font-medium italic">Avg. $20/seat</p>
                </div>
              </div>
              
              <div className="px-2">
                <Slider 
                  value={[userCount]} 
                  onValueChange={(v) => setUserCount(v[0])} 
                  max={1000} min={10} step={10} 
                  className="py-6 cursor-grab active:cursor-grabbing"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Zap className="w-4 h-4" /></div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Overlap</p>
                        <p className="text-sm font-bold text-slate-700">30% Redundant</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><ShieldCheck className="w-4 h-4" /></div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Security</p>
                        <p className="text-sm font-bold text-slate-700">Shadow IT Risk</p>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          <Card className={`md:col-span-2 border-none shadow-2xl transition-all duration-700 ${isHighSavings ? 'bg-blue-600' : 'bg-slate-900'} text-white overflow-hidden relative`}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <BarChart3 className="w-32 h-32" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-200">
                <TrendingDown className="w-4 h-4" />
                Annual Recovery
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <p className="text-6xl font-black tracking-tighter tabular-nums">
                ${Math.abs(audit.annualSavings).toLocaleString()}
              </p>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/10">
                <p className="text-[10px] font-bold uppercase text-blue-100 mb-1">Impact Analysis</p>
                <p className="text-xs leading-relaxed text-blue-50">
                    Consolidating these seats would pay for 2 additional full-time engineers.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action / Success Card */}
        <Card className="border-blue-200 bg-white shadow-xl shadow-blue-500/5 overflow-hidden">
          <CardContent className="p-0">
            {!isSubmitted ? (
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="flex-1 p-8 space-y-2 bg-slate-50/50">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MousePointerClick className="w-5 h-5 text-blue-600" />
                    Claim Full Audit
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Enter your email to receive the personalized breakdown and infrastructure credits.
                  </p>
                </div>
                <div className="flex-1 p-8 flex flex-col sm:flex-row gap-3 items-center justify-center border-t md:border-t-0 md:border-l border-slate-100">
                  <input 
                    type="email" 
                    placeholder="work@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700"
                    disabled={isSubmitting}
                  />
                  <button 
                    onClick={handleSaveAudit}
                    disabled={isSubmitting || !email}
                    className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-200"
                  >
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing</> : "Generate"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex p-3 bg-green-100 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">Your Strategy is Ready</h3>
                
                <div className="max-w-2xl mx-auto p-6 bg-blue-50/50 rounded-2xl border border-blue-100 text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4">
                    <Sparkles className="w-5 h-5 text-blue-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">Personalized Intelligence</div>
                  <p className="text-slate-700 leading-relaxed italic text-sm md:text-base border-l-2 border-blue-400 pl-4">
                    "{aiSummary}"
                  </p>
                </div>
                
                <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Verified by Credex Optimization Engine • ID: {Math.random().toString(36).substring(7).toUpperCase()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}