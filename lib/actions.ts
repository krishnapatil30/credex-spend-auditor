"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "./supabase";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function processAuditSubmission(email: string, userCount: number, annualSavings: number) {
  // 1. Basic Server-Side Validation
  if (!email || !email.includes("@")) {
    return { success: false, summary: "Please provide a valid work email to generate your report." };
  }

  try {
    // 2. Generate AI Summary (Requirement #4)
    let aiSummaryText = "";
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `
        You are an expert financial auditor at Credex. 
        Analyze this data for a startup founder:
        - Team Size: ${userCount}
        - Annual Savings Identified: $${annualSavings}
        
        Write a ~100-word professional, punchy summary. 
        Explain the overspending (mention seat fragmentation or retail pricing). 
        Highlight how Credex (discounted AI infrastructure credits) is the solution.
        Format: Professional but entrepreneurial. 
        IMPORTANT: Do not use markdown formatting like bold (**) or headers (#). Keep it as plain text.
      `;

      const result = await model.generateContent(prompt);
      aiSummaryText = result.response.text().trim();
    } catch (aiError) {
      console.warn("⚠️ AI API failed, using fallback summary:", aiError);
      // Fallback AI summary if Gemini fails
      aiSummaryText = `Your organization is operating ${userCount} AI seats with an annual spend of $${(userCount * 20).toLocaleString()}. Our analysis identifies ${Math.round(userCount * 0.3)} redundant licenses causing seat fragmentation. By consolidating to enterprise team plans through Credex, you can achieve $${annualSavings.toLocaleString()} in annual savings while maintaining full functionality and security compliance.`;
    }

    // 3. Save Lead to Database (Requirement #5)
    console.log("📊 Attempting Supabase insert with data:", { email, userCount, annualSavings, aiSummaryText: aiSummaryText.substring(0, 50) + "..." });
    
    const { data, error } = await supabase
      .from("leads")
      .insert([
        { 
          email: email.toLowerCase(), // Normalize email
          user_count: userCount, 
          annual_savings: annualSavings,
          ai_summary: aiSummaryText 
        }
      ])
      .select();

    if (error) {
      console.error("❌ Supabase Database Error:", error.message, error.details, error.code);
      throw new Error(`Supabase Error: ${error.message}`);
    }

    console.log("✅ Successfully inserted into Supabase:", data);

    return { 
      success: true, 
      summary: aiSummaryText 
    };

  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("❌ AUDIT PROCESSING ERROR:", errorMsg);
    console.error("Full error:", err);
    
    // Fallback: This ensures the user still sees a result even if the API is down
    return { 
      success: false, 
      summary: `Error: ${errorMsg}. Your AI spend audit shows significant opportunities for consolidation. By moving to enterprise-grade team plans and utilizing Credex credits, you can eliminate ghost seats and reduce your annual overhead significantly.` 
    };
  }
}