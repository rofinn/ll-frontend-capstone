import {LCG, floorDate, daysBetween, fetchAPI, submitAPI} from './api';

// Use a static current time for every run since the mocked available slots are based on
// the timespan from the current time.
beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2023, 10, 10))
});
afterAll(() => {jest.useRealTimers()});

// Clear our session storage between each test
beforeEach(() => {window.sessionStorage.clear()});

test('api - LCG', () => {
    const seed = 1234;
    const N = 1000;
    const generator = LCG(seed);
    const samples = Array.from({length: N}, (x, i) => generator.next().value);

    // Test that our values are between 0 and 1
    expect(Math.min(...samples)).toBeGreaterThanOrEqual(0.0);
    expect(Math.max(...samples)).toBeLessThanOrEqual(1.0);

    // Test that our results are largely unique
    expect(new Set(samples).size).toBeGreaterThan(N * 0.95);

    // Test that our generator is stateful and recreating with the same seed produces
    // the same sequence.
    const _generator = LCG(seed);
    let _samples = Array.from({length: N}, (x, i) => _generator.next().value);
    expect(_samples).toEqual(samples)

    // Rerunning the same generator should produce different samples
    _samples = Array.from({length: N}, (x, i) => _generator.next().value)
    expect(_samples).not.toEqual(samples)
});

test('api - floorDate', () => {
    const date = new Date(2023, 10, 15, 12, 40);
    expect(floorDate(date)).not.toEqual(date);
    expect(floorDate(date)).toEqual(new Date(2023, 10, 15));
})

test('api - daysBetween', () => {
    const a = new Date(2023, 10, 15, 12, 40);
    const b = new Date(2023, 10, 17, 13, 25);
    const c = new Date(2023, 10, 17, 1, 15);
    expect(daysBetween(a, b)).toEqual(2);
    expect(daysBetween(a, c)).toEqual(1);
})

test('api - fetchAPI', () => {
    const today = new Date();
    const future = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4);
    const today_slots = fetchAPI(today);
    const future_slots = fetchAPI(future);
    expect(today_slots.length).toBeLessThan(future_slots.length);
})

test('api - submitAPI', () => {
    const today = new Date();
    const available = fetchAPI(today);
    const data = {
        name: 'John Smith',
        email: 'john.smith@mail.com',
        datetime: available[0],
        guests: 2,
        occasion: '',
        requests: '',
    };

    const submitted = submitAPI(data);
    expect(submitted).toBeTruthy();

    // Test that we've removed our selected date from consideration
    const updated = fetchAPI(today);
    expect(updated).not.toEqual(available)

    // A bit awkward cause `difference` isn't supported in most browsers and datetime equality
    // is a nuisance in javascript.
    const diff = available.filter(x => updated.some(y => y.getTime() != x.getTime()));
    expect(diff.length).toEqual(1);
    expect(diff[0]).toEqual(available[0]);
})
