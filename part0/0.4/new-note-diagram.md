sequenceDiagram
  participant browser
  participant server
  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes  
  Note right of browser: Body JSON with { content, date }
  activate server
  server-->>browser: 200 OK and JSON { id, content, date }
  deactivate server
  Note right of browser: JS callback inserts the new note into the list
  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json  
  server-->>browser: Updated JSON with the new note