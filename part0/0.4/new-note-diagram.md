```mermaid
    sequenceDiagram
        participant browser
        participant server

        Note right of browser: User writes a note in the text field
        Note right of browser: User clicks the Save button

        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
        activate server
        Note left of server: Server receives form data (application/x-www-form-urlencoded)
        Note left of server: Server processes and saves the new note
        server-->>browser: 302 Found (Redirect)
        deactivate server

        Note right of browser: Browser receives 302 redirect and GETs the new location

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        activate server
        Note left of server: Server prepares the notes page (now including the new note)
        server-->>browser: HTML document (the updated notes page)
        deactivate server

        Note right of browser: Browser loads and renders the updated HTML document (which triggers loading CSS, JS, data.json, etc. again, as in the initial load)