# Understanding concepts in NgRx and Services

This section focuses on the core components of NgRx (Actions, Reducers, and Store) and contrast them with the use of Services for state management in Angular. Understanding these concepts is crucial for effectively implementing state management, whether you choose NgRx or Services.

## NgRx: Actions, Reducers, and Store

### Actions

- Purpose: Actions represent unique events that are dispatched from components and services. They are the only source of information for the store.
- Structure: Actions are plain JavaScript objects that must have a type property, indicating the type of action being performed.
- Example:

```
export const addProduct = createAction('[Product List] Add Product', props<{ product: Product }>());

```

### Reducers

- Purpose: Reducers are pure functions that define how the state changes in response to an action. They take the current state and an action as arguments and return a new state.
- Structure: They are typically implemented using the `createReducer` function.
- Example:

```
const initialState: State = { products: [] };

const productReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => ({ ...state, products: [...state.products, product] }))
);

```

### Store

-Purpose: The store is a centralized repository for all the application state. It is an Observable of state and an Observer of actions.
-Usage: Components and services can select data from the store or dispatch actions to the store.
-Example:

```
constructor(private store: Store<{ products: Product[] }>) {}

this.store.select('products').subscribe(products => {
  // Use products
});

```

## Angular Services for State Management

- Overview: Services in Angular are often used for managing state, especially in applications where NgRx might be overkill. They utilize RxJS Observables to create a reactive system.
- Structure: A service typically contains the state as private variables and exposes it as Observables. It also provides methods to modify this state.
- Example:

```
@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = new BehaviorSubject<Product[]>([]);

  get products$(): Observable<Product[]> {
    return this.products.asObservable();
  }

  addProduct(product: Product) {
    const currentValue = this.products.getValue();
    this.products.next([...currentValue, product]);
  }
}

```

## Hands-On: Setting Up NgRx and Services

### Setting Up NgRx

1. Install NgRx: Add NgRx to your Angular project using Angular CLI:

```
ng add @ngrx/store

```

2.  Define Actions, Reducers, and Effects: Implement the core concepts as described above.

3.  Register the Store: Add your reducers to the StoreModule in your application's main module.

4.  Using Store in Components: Inject the store into your components and services to dispatch actions or select data.

### Setting Up Services for State Management

1. Create a Service: Generate a service using Angular CLI.

```
ng generate service product

```

2. Implement State Logic: Use RxJS BehaviorSubject or Subject for the state, and provide methods for state modifications.
3. Using the Service: Inject the service into components where you need to access or modify the state.
