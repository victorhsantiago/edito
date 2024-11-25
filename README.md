# edito

Edito is a simple publishing app designed to make post creation and editing easy and efficient.

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

### Run End to End Tests with [Playwright](https://playwright.dev/)

```sh
npm run test
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Note(s)

About CRUD operations, I understood that the task was asking to setup the correct API calls. Because of the way the JSON placeholder API works, the local state don't update accordingly. Let me know if the state should reflects the changes localy.

For the design, I decided to follow the wireframe as closely as possible. The most noticeable deviation is that I didn't implement a dropdown menu for the actions in the table, instead, since it only has two buttons, I moved them out of the dropdown. My reasoning was that this would allow the user to perform these actions more quickly.

I used [VeeValidate](https://vee-validate.logaretm.com/v4/) to handle form validation, I've used it in the past, and really liked it, so I gave it another try. Also, its main competitor hasn't been updated in over a year.

[Quill](https://quilljs.com/) was my choice for the rich editor used on the post modal. Of the ones I researched, Quill was the most straightforward, easy to integrate with Vue, and offered a lot of features out of the box already, and it is free.

This was my first time writing E2E tests, I thought it was super cool because, theoretically, you don't have to worry about mocking network requests because the test tool actually makes them, and is able to test the result as if the application was really being used. Having said that, my test coverage might not be as thorough as it could be.

I choosed [Playwright](https://playwright.dev/) for E2E test, I didn't give it much thought as I'm not that experienced in writing E2E, but it has the most stars on Github 😆

## Improvements

- Batch actions, to allow users to remove several posts at once
- Add pagination on posts table
- Add select all functionality to the table
- Improve accessability allowing users to tab out of the editting box, or submit posts by pressing `ctrl + Enter` while in it
- Add dark and light themes toggle
- Add better user experience when app is waiting for a network request, like a loading icon and/or skeletons
- Add notifications
