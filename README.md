# Exercise
Create a React application using this [ITunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1)\
**Note:** The API won’t work with CORS enabled, it is suggested to run the app with Chrome in web-security-OFF mode (linked [here](https://alfilatov.com/posts/run-chrome-without-cors/)) or proxy calls through NodeJs/Express.
## The Spec
  **As** a user\
  **I** want to be able perform a search query about an artist, album or song\
  **So** that I can see a list of artists, albums and/or songs related to my query

**Given** I am using the search form\
**When** I conduct a search\
**Then** I should be able to see the results returning matching Artists, Albums, and/or Songs\
**And** it should limit to 10 items at a time\
**And** when I scroll down, another 10 items should be revealed.

**Given** I am using the search form\
**When** I conduct a search\
**And** there are no results\
**Then** I should be notified that there are no results

Presentation is secondary to the above so use of a CSS framework is permitted (and encouraged), but we are 
interested to see how your markup is structured.
Testing is essential though, we would like to see, at least, unit testing approach.

**Essential tech-stack:**

- React
- Typescript
- Redux
- Redux Thunk
- NodeJS + Express static serving of pages

**Optional (not mandatory but encouraged):**

- Styled Components
- Functional programming/Hooks encouraged over Classes
- Jest + @testing-library/react
- MaterialU

# Details of Solution
Used React, Redux Toolkit, React Infinite Scroll to create a list page with inifinite scrolling. 
For UI used MaterialUI. 
Used funcitonal programming with hooks. 
For testing used react testing library , mainly added a test for search page where we tested if the mock data is loaded properly.
