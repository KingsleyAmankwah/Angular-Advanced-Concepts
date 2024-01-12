# NgRx Entity / Advanced Services

## NgRx Entity

NgRx Entity is a library that simplifies the management of normalized state. It provides utility functions to work with entities and their collections in the NgRx Store. This can lead to better performance and maintainability of your state.

Example code for NgRx Entity:

```
// Define entity model
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Create entity adapter
import { createEntityAdapter, EntityState } from '@ngrx/entity';
const todoAdapter = createEntityAdapter<Todo>();

// Define state interface
interface TodoState extends EntityState<Todo> {}

// Create initial state
const initialState: TodoState = todoAdapter.getInitialState();

// Reducer using NgRx Entity
const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, { todo }) => todoAdapter.addOne(todo, state)),
  // other actions...
);

// Use createSelector for efficient state access
const selectTodoState = (state: AppState) => state.todos;
const { selectAll, selectIds } = todoAdapter.getSelectors();
export const selectAllTodos = createSelector(selectTodoState, selectAll);
export const selectTodoIds = createSelector(selectTodoState, selectIds);

```

## Angular Services for State Management

Angular services can be used for more complex state management scenarios. Services can encapsulate the logic for fetching, updating, and managing state, providing a clean separation of concerns.

Example code for Angular Services:

```
// Create a service to manage state
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  // other methods...
}

```
