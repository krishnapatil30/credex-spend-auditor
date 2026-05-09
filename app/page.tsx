"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { calculateAudit } from "@/lib/audit-logic";
import { TrendingDown, Users, Zap } from "lucide-react";

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
    <main className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="space-y-2 text-center md:text-left">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">
            v1.0 Audit Engine
          </Badge>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            AI Spend Auditor
          </h1>
          <p className="text-slate-500 text-lg max-w-xl">
            Stop overpaying for fragmented AI subscriptions. Consolidate seats and save thousands.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {/* Input Section (60% width) */}
          <Card className="md:col-span-3 shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Organization Size
              </CardTitle>
              <CardDescription>How many employees are currently using AI tools?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 pt-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-slate-500 uppercase">Current Seats</span>
                  <p className="text-4xl font-bold text-slate-900">{userCount}</p>
                </div>
                <Badge variant="secondary" className="text-sm font-semibold">
                  Avg. $20/user
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
              
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase text-slate-400">
                <p>Small Team</p>
                <p>Mid-Market</p>
                <p>Enterprise</p>
              </div>
            </CardContent>
          </Card>

          {/* Result Section (40% width) */}
          <Card className={`md:col-span-2 border-none shadow-2xl ${isSaving ? 'bg-slate-900' : 'bg-red-950'} text-white transition-colors duration-500`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <TrendingDown className={`w-5 h-5 ${isSaving ? 'text-green-400' : 'text-red-400'}`} />
                Annual ROI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Estimated Savings</p>
                <p className={`text-6xl font-black tracking-tighter mt-2 ${isSaving ? 'text-green-400' : 'text-red-400'}`}>
                  ${Math.abs(audit.annualSavings).toLocaleString()}
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Monthly Team Cost</span>
                  <span className="font-mono font-bold">${audit.potentialTeamCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Efficiency Gain</span>
                  <span className="text-green-400 font-bold">+30%</span>
                </div>
              </div>

              <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all mt-4">
                <Zap className="w-4 h-4 fill-current" />
                Generate Full PDF Report
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}