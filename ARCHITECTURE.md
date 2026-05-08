# Architecture

## System Diagram
```mermaid
graph TD
    A[User] -->|Input Usage| B[Logic Engine]
    B -->|Calculate| C[Savings Report]
    B -->|AI| D[Personalized Summary]
    C & D --> E[Dashboard]
    E -->|Lead Gen| F[Supabase]