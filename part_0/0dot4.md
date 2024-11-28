::: mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: Make POST request to server at https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 302 Redirect to /notes
    deactivate server

    browser->>server: Make GET request for HTML document at https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: Server sends HTML Document (200 OK)
    deactivate server

    browser->>server: Make GET request for CSS file at https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: Server sends CSS file (200 OK)
    deactivate server

    browser->>server: Make GET request for JS file at https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: Server sends JS file (200 OK)
    deactivate server

    Note right of browser: Start executing JS in browser. JS file demands JSON

    browser->>server:Send GET request for data.json at https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Server sends data.json (200 OK)
    deactivate server

    Note right of browser: Render received JSON into HTML by modifying the DOM
:::