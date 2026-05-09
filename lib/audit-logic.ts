import { AI_TOOLS } from "./pricing";

export interface AuditInput {
  toolId: string;
  userCount: number;
}

export const calculateAudit = (inputs: AuditInput[]) => {
  let totalPro = 0;
  let totalTeam = 0;

  inputs.forEach((input) => {
    const tool = AI_TOOLS.find((t) => t.id === input.toolId);
    if (tool) {
      // WHAT THEY PAY NOW: Full price for every individual seat
      totalPro += tool.proPrice * input.userCount;
      
      // THE AUDIT LOGIC: 
      // 1. We assume 30% of individual seats are "ghost seats" (unused/redundant).
      // 2. We consolidate them into the team plan.
      const optimizedSeats = Math.ceil(input.userCount * 0.7); 
      totalTeam += tool.teamPrice * optimizedSeats;
    }
  });

  return {
    monthlyTotal: totalPro,
    potentialTeamCost: totalTeam,
    savings: totalPro - totalTeam,
    annualSavings: (totalPro - totalTeam) * 12,
  };
};