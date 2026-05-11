# Supabase RLS Policy Fix for Leads Table

## Problem
The `leads` table has Row Level Security (RLS) enabled, but the policy is blocking anonymous (public) inserts. This causes the error:
```
new row violates row-level security policy for table "leads"
```

## Solution
Run the following SQL in your Supabase SQL Editor to fix this:

### Option 1: Disable RLS on the leads table (Simplest)
```sql
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
```

### Option 2: Enable INSERT for anonymous users (Recommended for security)
```sql
CREATE POLICY "Enable insert for anonymous users"
ON leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users"
ON leads
FOR SELECT
USING (auth.role() = 'authenticated');
```

### Option 3: Full public access (Most permissive)
```sql
CREATE POLICY "Enable all access"
ON leads
AS PERMISSIVE
FOR ALL
USING (true)
WITH CHECK (true);
```

## Steps to Apply
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (`rugynmrpcrqlfocsuykr`)
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste one of the SQL commands above
6. Click **Run**
7. Refresh your local app and test the form again

## After Fixing
Once you run the SQL, go back to http://localhost:3000 and try submitting the form again. It should now:
- ✅ Accept the Gemini API fallback (using a generated summary)
- ✅ Successfully insert data into the Supabase `leads` table
