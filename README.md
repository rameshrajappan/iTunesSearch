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
- Used Typescript, React, Redux Toolkit etc.
- Used React Infinite Scroll package for lazy loading. 
- For UI used MaterialUI.
- Used funcitonal programming with hooks.
- For testing used react testing library ,added tests for search components.
- Used Styled components and Material sx for styling
- Used express js to serve the buid pages.

View application in [GitHub Pages](https://rameshrajappan.github.io/iTunesSearchDemo/)  
View application in [CodeSandBox](https://codesandbox.io/p/github/rameshrajappan/iTunesSearchDemo/main).

![image](https://user-images.githubusercontent.com/13627992/226532243-227f4005-ba0a-4d44-9e1e-37655ecc2d15.png)

