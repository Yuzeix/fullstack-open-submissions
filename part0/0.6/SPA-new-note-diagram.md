```mermaid
    sequenceDiagram
        participant browser
        participant server

        Note right of browser: User writes a note in the text field
        Note right of browser: User clicks the Save button

        Note right of browser: The spa.js code handles the click event

        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        Note left of server: Server receives and saves the new note
        server-->>browser: 201 Created (Response includes new note data)
        deactivate server

        Note right of browser: The spa.js code processes the 201 response and updates the UI

        Note right of browser: (Optional but common in SPAs): The spa.js code fetches updated data to ensure consistency

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server-->>browser: Updated JSON data including the new note
        deactivate server

        Note right of browser: The spa.js JavaScript renders the updated list