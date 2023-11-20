# Little Lemon Restauant

Basic implementation of booking system for Coursera capstone project.
As usual, you can clone this repo and run `npm start` to get a local instance running.

![Screenshot 2023-11-19 at 10 38 13 PM](https://github.com/rofinn/ll-frontend-capstone/assets/5276097/384a24ae-29ee-486c-a381-6d2de62e4971)

## Minimum Viable Product

For simplicity, only the landing, booking and confirmation pages were implemented.

- `Menu` page is under construction
- No authentication
- Bookings / reservations cannot be deleted or modified

## API

The course provided link for the `api.js` is no longer available so I wrote my own.

```
> curl https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js
404: Not Found
```
I'm not sure how the original code worked, but this implementation:

1. `fetchAPI` - Takes still takes a `date` and returns an array of available `datetime`s
2. `submitAPI` - Takes the `datetime` from your form data and blocks off that availability
3. Availability is pseudo-randomly generated using the requested date as a seed to an LCG, for reproduciblity.
4. Requested dates closer to the current date will likely have fewer availability slots.
5. Persistence between calls is managed with `sessionStorage`, so you can either clear it
  manually or just open a new tab.


If folks want to use it for their own project you just need to grab
```
> curl https://raw.githubusercontent.com/rofinn/ll-frontend-capstone/main/src/api.js

// Since Math.random doesn't take a seed we'll just use a simple
// implementation of LCG (same constants as glibc)
// https://en.wikipedia.org/wiki/Linear_congruential_generator
export function* LCG(seed) {
  const m = 2 ** 31 // modulus
  const a = 1103515245 // multiplier
  const c = 12345 // increment

  while (true) {
    seed = (a * seed + c) % m
    yield seed / (m - 1)
  }
}
...
```

## CI

To avoid breaking changes I've setup a minimal CI pipeline using github actions which runs
unit tests, a linter (`eslint`) and a formatter (`prettier`) on node v20.
I've also setup `axe` to run accessibility testing on node v18 as I was running into trouble
with compatibility issues for the headless chrome version it needs to run.

![Screenshot 2023-11-19 at 9 46 44 PM](https://github.com/rofinn/ll-frontend-capstone/assets/5276097/b5e5f882-ac8a-45c8-a903-318bbb23ef48)

Coverage is just under 99% from the CI

```
PASS src/api.test.js
PASS src/components/BookingForm.test.js
PASS src/App.test.js
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|-------------------
All files             |   98.71 |    88.88 |     100 |   98.64 |
 src                  |   97.91 |    83.33 |     100 |   97.72 |
  App.js              |   93.75 |    83.33 |     100 |   93.75 | 29
  api.js              |     100 |    83.33 |     100 |     100 | 45
  theme.js            |     100 |      100 |     100 |     100 |
 src/components       |     100 |     92.3 |     100 |     100 |
  BookingForm.js      |     100 |      100 |     100 |     100 |
  Footer.js           |     100 |      100 |     100 |     100 |
  Header.js           |     100 |        0 |     100 |     100 | 21
  Hero.js             |     100 |      100 |     100 |     100 |
 src/pages            |     100 |      100 |     100 |     100 |
  Bookings.js         |     100 |      100 |     100 |     100 |
  ConfirmedBooking.js |     100 |      100 |     100 |     100 |
  Home.js             |     100 |      100 |     100 |     100 |
  Menu.js             |     100 |      100 |     100 |     100 |
----------------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        2.404 s, estimated 3 s
Ran all test suites.
```
