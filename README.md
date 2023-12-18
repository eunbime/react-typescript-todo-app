## 프로젝트 목적
React와 Typescript를 사용하여 To do list를 구현하기

level2: RTK를 사용한 구현

level3: Redux thunk와 json-server를 사용한 구현

level5: useQuery와 json-server를 사용한 구현 


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

<br><br>

## RTK & thunk를 사용한 구현

useDispatch와 useSelector의 타입을 지정해주어야 한다.
먼저 store에서 타입을 가져온다.
```ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
hooks > redux 파일에 생성한 타입을 각각 지정해준다.
```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
// TypedUseSelectorHook를 사용하여 type 지정
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

사용할 때 useDispatch와 useSelector가 아닌, 타입을 지정한 useAppDispatch와 useAppSelector로 사용해준다.
```ts
const dispatch = useAppDispatch();
const { todos, isLoading, error } = useAppSelector((state) => state.todosSlice);
```

<br><br>

## RTK & useQuery를 사용한 구현

### 전에 구현했던 Javascript를 사용한 경우의 useQuery 사용방법
```js
  const { isLoading, isError, data } = useQuery("todos", getTodos, {
    retry: 7,
  });
```

```js
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
```


### typescript를 사용해 리팩토링한 useQuery 사용방법

```ts
  // useQuery
  const {
    isLoading,
    error,
    data: todos,
  } = useQuery<Todo[], AxiosError<unknown, any>, Todo[], string[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
    retry: 5,
  });
```

```ts
  // Mutations
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
```

- typescript에서 useQuery를 사용할 경우 queryKey, queryFn, mutationFn 와 같이 정확하게 명시해 주어야 에러 없이 잘 동작하였다.


