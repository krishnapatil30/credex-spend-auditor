# Audit Methodology & Logic

This document outlines the financial assumptions used by the Credex Spend Auditor (v1.1).

## 1. The "Ghost Seat" Hypothesis
Market research indicates that in companies with 50+ employees, approximately **30% of AI licenses** go underutilized or are "Ghost Seats" (provisioned but not logged into for 30+ days). 

## 2. Fragmented Retail vs. Enterprise Consolidation
Most startups suffer from "Bottom-Up" SaaS sprawl:
- **Individual Licenses:** Developers buy ChatGPT Plus ($20) or Claude Pro ($20) on personal/company cards.
- **Redundancy:** A developer often has both ChatGPT and Cursor, despite significant feature overlap.
- **The Credex Solution:** By consolidating these into a single Enterprise Team Plan via Credex, we apply a **15% bulk discount** and eliminate the 30% waste, resulting in an average **40-45% recovery** of the total AI spend.

## 3. Formula Breakdown
The auditor uses the following logic (simplified):
- **Gross Monthly Spend:** `(UserCount * AvgRetailPrice)`
- **Wasted Spend:** `GrossSpend * 0.30` (Ghost Seats)
- **Consolidation Gain:** `(GrossSpend - WastedSpend) * 0.15` (Credex Enterprise Discount)
- **Annual Savings:** `(WastedSpend + Consolidation Gain) * 12`