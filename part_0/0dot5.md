::: mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: Make GET request for HTML document at https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: Server sends HTML Document (200 OK)
    deactivate server

    browser->>server: Make GET request for CSS document https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: Server sends CSS file main.css (200 OK)
    deactivate server

    browser->>server: Make GET request for JS document https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: Server sends JS file spa.js (200 OK)
    deactivate server

    Note right of browser: Start executing JS in browser. JS file demands JSON

    browser->>server:Send GET request for data.json at https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Server sends data.json (200 OK)
    deactivate server

    Note right of browser: Render received JSON into HTML by modifying the DOM
:::