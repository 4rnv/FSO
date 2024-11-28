::: mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: Make POST request to server at https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Server sends 201 Created acknowledgement
    deactivate server
    Note left of server: Server acknowledges POST request, browser does not send further HTTP requests for CSS or JS files, page does not redirect or reload.
:::