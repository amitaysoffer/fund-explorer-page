# Funds Explorer Page

An app that utilises local data to search, filter and sort funds

## Live version of the app:

- https://pokemon-list-sorting.vercel.app/

## How to run the app

- Clone the repo locally or download the zip file
- In the terminal run `npm install; npm run dev`
- To run the tests `npm run test`
- Enjoy

## Technologies used

- React, Typescript, Vite
- React Testing Library, Vitest
- feather icons

## App flow

- On first mount a list of funds is displayed
- User can toggle between grid view and list view
- User can search funds via input text field
- User can filter funds via checkboxes on the left side panel
- User can select funds' manager to filter funds

## Technical Notes

- As the instructions state, responsive design isn't needed and therefore the app looks decent only on desktop view.
-

- I used React Query (TanStack) library to fetch the data because it offers caching capabilities, deals with race condition and solves many others potential issues when trying to fetch data.
- The biggest red flag I've had with this app, was the fact that I had to make in total 151 api requests on mount. I searched at the pokemon api docs for a better way to somehow request a single piece of data with all the types, and to send the entire pokemon URLs, but I couldn't find anything. Probably GraphQL could have helped there. On top of that, I think it's implied in the instructions that I should make a new api request for each pokemon's url in-order to get its type.
- Every time I change the value of the dropdown menu the app re-renders because of the state change and as a result the app makes another 151 api requests. If I had more time I would look into it more, potentially trying to memoize the functions, components, or dig more into React Query docs to find a solution there.
- I did not make any changes to styling because it wasn't mentioned as part of the 5 tasks I needed to complete and I didn't want to over complicate things. But obviously there are many things to add like new drop down from a ui component such as shadcn, adjust grid view for mobile and smaller screens etc..
- In the utils file you'd find a few helper functions I created. I made them in a new file because I wanted them to be generic so I could use them in my testings as well. They also didn't feel right to be as part of a react component as they are very vanilla js involved.
- Testing:
  - I used MSW (Mock service worker) to mock the data. msw is recommended to use in the RTL docs. Using msw I could successfully intercept the two api requests- one for the pokemon list and the second one to get the individual pokemon data (where I got the type). MSW helps us test our FE app in a safer and cheaper way because we don't have to pay extra money for APIs for every request we want to test.
  - I created four tests, all located at the same App.test.tsx file. I believe I tested most of the possible scenarios of the app. Using MSW I could easily trigger server errors and assert the error messages the user sees.
  - With MSW I could also return 5 pokemon instead of 151 which made it easier to test. You can see those requests and responses in the handler file.
