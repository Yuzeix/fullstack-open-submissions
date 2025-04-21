```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes
    Note right of browser: Body JSON con { content, date }
    activate server
    server-->>browser: 200 OK y JSON { id, content, date }
    deactivate server
    Note right of browser: JS callback inserta la nueva nota en la lista

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: JSON actualizado con la nueva nota

