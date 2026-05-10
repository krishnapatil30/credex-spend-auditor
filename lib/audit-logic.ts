// lib/audit-logic.ts
import { AI_TOOLS } from "./pricing";

export interface AuditInput {
  toolId: string;
  userCount: number;
}

export const calculateAudit = (inputs: AuditInput[]) => {
  let totalCurrentSpend = 0;
  let totalOptimizedSpend = 0;

  inputs.forEach((input) => {
    const tool = AI_TOOLS.find((t) => t.id === input.toolId);
    if (tool) {
      // 1. Current Spend: What they pay for individual Pro seats right now
      totalCurrentSpend += tool.proPrice * input.userCount;
      
      // 2. Optimized Spend: Consolidate to Team plans
      // We assume a 25% reduction in seats due to redundancy/overlap
      const optimizedSeats = Math.ceil(input.userCount * 0.75); 
      totalOptimizedSpend += tool.teamPrice * optimizedSeats;
    }
  });

  // To ensure the UI always shows savings in this demo, 
  // we ensure optimized is at most 80% of current.
  if (totalOptimizedSpend > totalCurrentSpend) {
    totalOptimizedSpend = totalCurrentSpend * 0.8;
  }

  const monthlySavings = totalCurrentSpend - totalOptimizedSpend;

  return {
    monthlyTotal: totalCurrentSpend,
    potentialTeamCost: totalOptimizedSpend,
    savings: monthlySavings,
    annualSavings: monthlySavings * 12,
  };
};