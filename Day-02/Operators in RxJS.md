# Understanding RxJS Operators

Operators allow you to transform, combine, manipulate, and work with the sequences of items emitted by Observables. They are what make RxJS powerful for complex asynchronous tasks.

## Types Of Operators

1. ### Creation Operators

Create an observable from nearly anything (e.g., of, from, interval)

- from: Creates an Observable from an array, promise, iterable, or other data source.

```
import { from } from 'rxjs';

const numbers = from([1, 2, 3, 4, 5]);
numbers.subscribe(x => console.log(x)); // Output: 1, 2, 3, 4, 5

```

- interval: Creates an Observable that emits sequential numbers every specified time interval.

```
import { interval } from 'rxjs';

const clock = interval(1000); // Emits every second
clock.subscribe(x => console.log(x)); // Output: 0, 1, 2, 3, ...

```

2. ### Transformation Operators

Transform values passed through the observable (e.g., map, bufferTime, concatMap)

- map: Applies a function to each emitted value and emits the transformed results.

```
import { map } from 'rxjs/operators';

const numbers = from([1, 2, 3]);
const doubledNumbers = numbers.pipe(map(x => x * 2));
doubledNumbers.subscribe(x => console.log(x)); // Output: 2, 4, 6

```

- filter: Emits only those values that pass a specified test condition.

```
import { filter } from 'rxjs/operators';

const numbers = from([1, 2, 3, 4, 5]);
const evenNumbers = numbers.pipe(filter(x => x % 2 === 0));
evenNumbers.subscribe(x => console.log(x)); // Output: 2, 4

```

3. ### Combination Operators
   Combine multiple observables (e.g., merge, concat, combineLatest).

- merge: Combines multiple Observables into a single Observable, emitting values as they arrive from any source.

```
import { merge } from 'rxjs';

const obs1 = interval(1000);
const obs2 = interval(500);
const merged = merge(obs1, obs2);
merged.subscribe(x => console.log(x)); // Output: interleaved values from both sources

```

4. ### Error Handling Operators
   For error handling strategies (e.g., catchError, retry)

```
import { catchError } from 'rxjs/operators';

const numbers = interval(1000).pipe(
  map(x => { if (x === 5) throw new Error('Error at 5'); else return x; })
);
numbers.pipe(catchError(error => of('Error handled!')))
  .subscribe(x => console.log(x));

```

5. ### Utility Operators
   Provide useful utilities (e.g., tap for debugging)

```
import { tap } from 'rxjs/operators';

const numbers = from([1, 2, 3]);
numbers.pipe(tap(x => console.log("Before map:", x)))
  .pipe(map(x => x * 2))
  .subscribe(x => console.log("After map:", x));

```
