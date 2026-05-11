graph TD
    subgraph Client_Side [Browser / Frontend]
        A[User] -->|Slider Input| B[Audit Logic Engine]
        B -->|Live ROI| C[Savings Report Card]
        D[Lead Form] -->|Email| E[Server Action]
    end

    subgraph Server_Side [Next.js Server]
        E -->|Context Injection| G[Gemini 1.5 Flash API]
        G -->|Generated Summary| H[Data Package]
        H -->|Store Lead| F[(Supabase DB)]
    end

    H -.->|Return to UI| D