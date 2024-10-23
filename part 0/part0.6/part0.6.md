
```mermaid
sequenceDiagram
    participant Browser as Browser
    participant Server as Server
    
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Server->>Browser: 201 Created
    Browser->>Browser: Render notes using JSON data
