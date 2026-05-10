"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { calculateAudit } from "@/lib/audit-logic";
import { TrendingDown, Users, Zap, BarChart3, ArrowUpRight } from "lucide-react";

export default function AuditPage() {
  const [userCount, setUserCount] = useState(50);

  // Simulating a real company stack: 
  // Everyone has ChatGPT, half have Claude, some use Cursor.
  const audit = calculateAudit([
    { toolId: "chatgpt", userCount: userCount },
    { toolId: "claude", userCount: Math.floor(userCount * 0.5) },
    { toolId: "cursor", userCount: Math.floor(userCount * 0.3) }
  ]);

  const isSaving = audit.annualSavings >= 0;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2 text-center md:text-left">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">
            v1.1 Intelligence Engine
          </Badge>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            AI Spend Auditor
          </h1>
          <p className="text-slate-500 text-lg max-w-xl">
            Consolidate fragmented AI subscriptions into enterprise-grade team plans and eliminate ghost seats.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {/* Input Section */}
          <Card className="md:col-span-3 shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Organization Size
              </CardTitle>
              <CardDescription>Total employees currently provisioned with AI licenses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 pt-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-slate-500 uppercase">Active Licenses</span>
                  <p className="text-4xl font-bold text-slate-900">{userCount}</p>
                </div>
                <Badge variant="secondary" className="text-sm font-semibold py-1">
                  Est. $20/user avg.
                </Badge>
              </div>
              
              <Slider 
                value={[userCount]} 
                onValueChange={(v) => setUserCount(v[0])} 
                max={500} 
                min={10}
                step={10} 
                className="py-4"
              />
              
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase text-slate-400 tracking-tighter">
                <p>Startup (10-100)</p>
                <p>Growth (100-300)</p>
                <p>Enterprise (300+)</p>
              </div>
            </CardContent>
          </Card>

          {/* Result Card */}
          <Card className={`md:col-span-2 border-none shadow-2xl transition-colors duration-500 ${isSaving ? 'bg-slate-900' : 'bg-red-950'} text-white`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className={`w-5 h-5 ${isSaving ? 'text-green-400' : 'text-red-400'}`} />
                Projected ROI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Annual Recovery</p>
                <p className={`text-6xl font-black tracking-tighter mt-2 ${isSaving ? 'text-green-400' : 'text-red-400'}`}>
                  ${Math.abs(audit.annualSavings).toLocaleString()}
                </p>
              </div>

              {/* Comparative Spending Bars */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <span>Fragmented Cost</span>
                    <span>${audit.monthlyTotal.toLocaleString()}/mo</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all duration-700" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-green-400 tracking-wider">
                    <span>Optimized Cost</span>
                    <span>${audit.potentialTeamCost.toLocaleString()}/mo</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-green-400 transition-all duration-1000 ease-out`} 
                      style={{ width: `${Math.min((audit.potentialTeamCost / audit.monthlyTotal) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Day 3 Task: Efficiency Breakdown Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-200 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                Strategic Consolidation Gains
              </CardTitle>
              <Badge variant="outline" className="text-[10px] border-slate-300">ESTIMATED DATA</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {[
                { name: "ChatGPT", impact: "40% Gain", save: 0.45, color: "text-emerald-600" },
                { name: "Claude", impact: "30% Gain", save: 0.30, color: "text-blue-600" },
                { name: "Cursor", impact: "30% Gain", save: 0.25, color: "text-indigo-600" }
              ].map((tool) => (
                <div key={tool.name} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors">
                      <Zap className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 flex items-center gap-2">
                        {tool.name} 
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${tool.color} bg-slate-100`}>{tool.impact}</span>
                      </p>
                      <p className="text-xs text-slate-500">Seat consolidation & plan migration</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 flex items-center justify-end gap-1">
                      +${Math.floor(audit.annualSavings * tool.save).toLocaleString()}
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Annual Recovery</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}