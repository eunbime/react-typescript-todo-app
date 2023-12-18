## 프로젝트 목적
React와 Typescript를 사용하여 To do list를 구현하기

level2: RTK를 사용한 구현

level3: Redux thunk와 json-server를 사용한 구현

level5: useQuery와 json-server를 사용한 구현 (타입에러가 발생하여 완벽히 구현하지 못했습니다. 문제해결 후 다시 올리겠습니다.)


## 파일 구조
```
src
 ┣ api
 ┃ ┗ todos.ts
 ┣ axios
 ┃ ┗ todosApi.ts
 ┣ components
 ┃ ┣ AddForm
 ┃ ┃ ┗ AddForm.tsx
 ┃ ┣ Header
 ┃ ┃ ┣ Nav
 ┃ ┃ ┃ ┗ Nav.tsx
 ┃ ┃ ┗ Header.tsx
 ┃ ┣ Modal
 ┃ ┃ ┣ AddTodoModal
 ┃ ┃ ┃ ┗ AddTodoModal.tsx
 ┃ ┃ ┗ Modal.styles.ts
 ┃ ┣ Navbar
 ┃ ┃ ┗ Navbar.tsx
 ┃ ┣ TextEditor
 ┃ ┃ ┗ TextEditor.tsx
 ┃ ┗ TodoList
 ┃ ┃ ┣ TodoItem
 ┃ ┃ ┃ ┗ TodoItem.tsx
 ┃ ┃ ┗ TodoList.tsx
 ┣ hooks
 ┃ ┗ redux.ts
 ┣ pages
 ┃ ┗ Home
 ┃ ┃ ┗ Home.tsx
 ┣ shared
 ┃ ┣ layout
 ┃ ┃ ┗ Layout.tsx
 ┃ ┗ Router.tsx
 ┣ store
 ┃ ┣ modules
 ┃ ┃ ┣ modalSlice.ts
 ┃ ┃ ┗ todosSlice.ts
 ┃ ┗ index.ts
 ┣ styles
 ┃ ┣ GlobalStyle.ts
 ┃ ┗ styles.tsx
 ┣ types
 ┃ ┗ todo.ts
 ┣ App.css
 ┣ App.tsx
 ┣ db.ts
 ┣ index.css
 ┣ index.tsx
 ┣ logo.svg
 ┗ react-app-env.d.ts
```


