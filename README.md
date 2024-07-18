# Funds Explorer Page

An app that utilises local data to search, filter and sort funds.

## Live version of the app:

- https://fund-explorer-page.vercel.app/

## How to run the app

- Clone the repo locally or download the zip file.
- In the terminal run `npm install; npm run dev`.
- To run the tests `npm run test` OR: `npm run test:ui`.
- Enjoy!

## Technologies used

- React, Typescript, Vite
- React Testing Library, Vitest
- feather icons

## Acceptance Criteria

- On the first render, a list of funds is displayed on the screen.
- As a user, I want to be able to sort funds in ascending and descending order.
- As a user, I want to be able to toggle between grid view and list view.
- As a user, I want to search for funds using the search input text field.
- As a user, I want to filter funds using checkboxes.
- Unit tests and integration tests have been added to test all the acceptance criteria.

## Things to do

- Create a responsive web app.
- Add pagination.

## Technical Notes

- Some funds don't have managers. I wasn't sure if I should add managers or not. Again, I didn't want to overcomplicate the design. I was told that I can "Feel free to add more managers," but by doing so, I might break parts of the design, like the region of each manager. So I decided to leave some funds without a manager, just as the design shows.
- I did not have the fonts that appear in the design, so there is a discrepancy there.
