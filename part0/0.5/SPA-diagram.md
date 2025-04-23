```mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
        activate server
        server-->>browser: HTML document (minimal structure)
        deactivate server

        Note right of browser: Browser starts loading resources linked in HTML

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server-->>browser: The CSS file
        deactivate server

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
        activate server
        server-->>browser: The large JavaScript bundle (the SPA code)
        deactivate server

        Note right of browser: Browser executes the spa.js code. The SPA starts.

        Note right of browser: The SPA's JavaScript code (spa.js) fetches data needed for the initial view

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: [{ "content": "SPA is cool", "date": "2023-1-1" }, ... ] (Initial data)
        deactivate server

        Note right of browser: The spa.js JavaScript renders the UI based on the fetched data