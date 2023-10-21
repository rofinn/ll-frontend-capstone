// TODO: Publish this somewhere public and pull it down like the original file was supposed to.

// Since Math.random doesn't take a seed we'll just use a simple
// implementation of LCG (same constants as glibc)
// https://en.wikipedia.org/wiki/Linear_congruential_generator
export function* LCG(seed) {
    const m = 2**31;         // modulus
    const a = 1103515245;    // multiplier
    const c = 12345;         // increment

    while (true) {
        seed = (a * seed + c) % m;
        yield seed / (m - 1);
    };
}

/*
Working with dates in javascript is a bit awkward, so we'll keep a
few utility function here to make our life easier
*/

/**
 * Returns only the yyyy-mm-dd part of any date type
 */
export function floorDate(date) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );
}

// Return number of days betwen a and b
export function daysBetween(a, b) {
    return Math.floor(Math.abs((a - b) / (1000 * 60 * 60 * 24)));
}

// Generate a static base set of times from 5pm to 10pm
const DEFAULT_TIMES = Array.from({length: (22 - 17)}, (x, i) => 17 + i);

/**
 * Since the api.js link provided gives a 404, I've implemented a mock function.
 * This function still takes a date and returns a list of available times.
 * We use a static seed so the behaviour is consistent, but for simplicity we're ignoring
 * timezones.
 */
export function fetchAPI(date) {
    const requested = floorDate(date);

    // Only prepopulate the available times if it hasn't already been stored.
    if (!sessionStorage.getItem(requested)) {
        const current = floorDate(new Date());
        const generator = LCG(requested.getTime());
        const span = daysBetween(current, requested);
        const threshold = 0.2 + (span * 0.1);

        // Filter out times with a threshold, so that future request dates have more
        // available spots.
        const available = Array.from(
            DEFAULT_TIMES.filter((time) => generator.next().value > threshold),
            (x, i) => {
                return new Date(
                    requested.getFullYear(),
                    requested.getMonth(),
                    requested.getDate(),
                    x,
                )
            }
        );

        sessionStorage.setItem(requested, JSON.stringify(available))
    }

    return JSON.parse(sessionStorage.getItem(requested)).map((str) => new Date(str))
}

/**
 * Updates the data store to remove the requested date and time.
 * If for some reason this function is called before fetchAPI for a specific date we
 * prepopulate it. If for some reason the form date / time isn't available return false.
 * @param {*} formData
 */
export function submitAPI(formData) {
    const date = floorDate(new Date(formData.date));
    const available = fetchAPI(date);
    const searchTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(formData.time.split(":")[0])
    );

    const index = available.findIndex((x) => x.getTime() === searchTime.getTime());
    console.log(available);
    console.log(searchTime);
    console.log(index);
    if (index === -1) return false;
    available.splice(index);
    sessionStorage.setItem(date, JSON.stringify(available));
    return true;
}
