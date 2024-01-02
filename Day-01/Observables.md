## Learn about Observables, Observers, and Subscriptions

### 1. Observables

In Angular, Observables are a core part of the `RxJS library` and represent a sequence of items that arrive over time. Observables are used in Angular for handling a variety of asynchronous operations such as HTTP requests, event handling, and form updates.

- Creating Observables: You can create an Observable from nearly anything, but the most common use in Angular is to create them from HTTP requests or event listeners.

- Transforming Data: RxJS provides a multitude of operators like map, filter, and tap that can manipulate and handle the data emitted by Observables.

### Example Code

```
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl: string = 'https://auth-endpoint.onrender.com';

  constructor(private http: HttpClient) { }

  getData(): Observable<string> {
    return this.http.get(this.dataUrl);
  }
}

```

### 2. Observers

An Observer is a set of callbacks that knows how to listen to values delivered by the Observable. It is an object with methods to handle each type of notification that an Observable can send: next, error, and complete.

- next: Called whenever the Observable emits a value.
- error: Called when there is an error in the Observable stream.
- complete: Called once when the Observable completes and will no longer emit values.

### Example Code:

```
// ...DataService as defined previously

@Component({
  selector: 'app-data-consumer',
  template: `<div *ngIf="data">{{ data | json }}</div>`
})
export class DataConsumerComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe({
      next: (data) => this.data = data,
      error: (error) => console.error('There was an error!', error),
      complete: () => console.log('Data fetching completed')
    });
  }
}

```

### 3. Subscriptions

Subscriptions are what you get when you subscribe to an Observable. They are useful for cancelling the execution of the Observable.

```
// Continuing from the DataConsumerComponent example

export class DataConsumerComponent implements OnInit, OnDestroy {
  data: any;
  private subscription: Subscription;

  ngOnInit() {
    this.subscription = this.dataService.getData().subscribe({
      next: (data) => this.data = data,
      error: (error) => console.error('There was an error!', error),
      complete: () => console.log('Data fetching completed')
    });
  }

  ngOnDestroy() {
    // Unsubscribing when the component is destroyed
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

```
