# Handling side effects and state queries in both NgRx and Angular Services.

## NgRx: Effects and Selectors

1. NgRx Effects for Side Effects

- Purpose: Effects handle side effects in an NgRx-based app, like API calls, routing actions, etc.
- How it Works: Effects are Observable streams that listen for actions, perform operations, and then dispatch new actions.
- Example: Making an API call in response to an action and then dispatching a success or failure action based on the API response.

```
@Injectable()
export class MyEffects {
  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(myActions.loadData),
    mergeMap(() => this.myService.getData().pipe(
      map(data => myActions.loadDataSuccess({ data })),
      catchError(error => of(myActions.loadDataFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private myService: MyService
  ) {}
}

```

2. NgRx Selectors for State Queries

- Purpose: Selectors are pure functions used to select, derive and compose pieces of state.
- Efficiency: They can improve performance by using memoization, allowing Angular to only recompute and render when the specific piece of state changes.
- Example: Creating a selector to get a specific part of the state.
  typescript

```
export const selectFeature = (state: AppState) => state.feature;

export const selectFeatureItems = createSelector(
  selectFeature,
  (state: FeatureState) => state.items
);

```

## Services: Reactive Data Management

1. Reactive State Management with Angular Services

- Overview: Services in Angular can be used to manage and distribute state reactively using RxJS.
- Pattern: Typically involves a BehaviorSubject for holding state, and Observable streams for components to react to state changes.
- Example: A service that holds an array of items and allows components to add items and subscribe to item updates.

```
@Injectable({ providedIn: 'root' })
export class ItemService {
  private itemsSource = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsSource.asObservable();

  addItem(item: Item) {
    const currentItems = this.itemsSource.getValue();
    this.itemsSource.next([...currentItems, item]);
  }
}

```

2. Data Fetching and Handling Side Effects in Services

- How it Works: Services can also handle side effects like data fetching, integrating with HTTP client, and more.
- Pattern: Use RxJS operators to handle asynchronous operations and side effects within services.
- Example: A service that fetches data from an API and handles potential errors.

```
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private httpClient: HttpClient) {}

  fetchData(): Observable<Data> {
    return this.httpClient.get<Data>('/api/data').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // handle error and return an observable
    return throwError('An error occurred');
  }
}

```
