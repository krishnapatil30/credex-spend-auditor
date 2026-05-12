# Testing Protocol

## 🧪 Manual Test Cases
1. **Lead Capture:** - *Input:* email@test.com, 50 seats, $1200 spend.
   - *Result:* Verified row appears in Supabase 'leads' table.
2. **AI Generation:**
   - *Action:* Click "Generate Audit".
   - *Result:* AI summary appears within 3 seconds (or fallback triggers on 404).
3. **Form Validation:**
   - *Input:* Invalid email format.
   - *Result:* Client-side validation prevents submission.

## 📱 Cross-Device Testing
- **Chrome/Desktop:** 100% UI fidelity.
- **Mobile :** Responsive grid stacks correctly; sliders remain touch-friendly.