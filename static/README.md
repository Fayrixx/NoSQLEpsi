`index.html`
- A simple HTML page
- `#todos` is used to initialize the Vue.js (see `app.js`)
- There is usage of HTML vue.js's parts :
  - `v-model`
  - `v-on:click`
  - `v-for`

`app.js`
- data
  - `todo` is an object that represent a mongo document
  - `todos` is an array containing all `todo` objects
- `created`
  - Call the `fetchTodos()` method
- `addTodo()` adds a todo
- `deleteTodo()` removes a todo

As you can see, the `app.js` does not handle errors. Follow the official doc : https://github.com/pagekit/vue-resource/blob/develop/docs/http.md