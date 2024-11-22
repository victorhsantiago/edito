# edito

This template should help get you started developing with Vue 3 in Vite.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Tests with [Playwright](https://playwright.dev/)

```sh
npm run test
```

## Improvements

- Batch actions, to allow users to remove several posts at once
- Add pagination on posts table
- Add select all functionality to the table
- Improve accessability allowing users to tab out of the editting box, or submit post by pressing `ctrl + Enter` while in it
- Add dark and light themes toggle
- Add better user experience when app is waiting for a network request, like a loading icon and/or skeletons

## Note(s)

This was my first time writing E2E tests, I thought it was super cool because, theoretically, you don't have to worry about mocking network requests because the test tool actually makes them, and is able to test the result as if the application was really being used. Having said that, my test coverage might not be as thorough as it could be.
