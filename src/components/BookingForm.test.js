import { render, act, screen, queryByAttribute, waitFor, fireEvent, prettyDOM} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

// Some mock functions for our times props
const state = () => {return {times: []};}
const dispatch = (action) => ["17:00", "20:00"];
const setter = (values) => {};

// Utility function for getting by id
const getById = queryByAttribute.bind(null, 'id');

// To simplify testing the date selection we're just gonna mock the datepicker
jest.mock('react-datepicker', () => props => {
    // console.log('mock props: ', props);
    return (
        <input
            id='datetime'
            onChange={e => props.onChange(e.target.value)}
            onBlur={props.onBlur}
        />
    )
});

// To reduce duplicate code
const getBookingForm = () => {
    return render(
        <BookingForm state={state()} dispatch={dispatch} setter={setter}/>
    ).container
}

describe('BookingForm', () => {
    test('Basic rendering', () => {
        // Our root dom node we'll be inspecting
        const dom = getBookingForm();

        // Just check that our components rendered
        expect(getById(dom, 'bookingform')).toBeInTheDocument();
        expect(screen.getByText("Book Now")).toBeInTheDocument();
    });

    describe('Name', () => {
        test('Rendered', () => {
            const dom = getBookingForm();
            expect(getById(dom, 'name')).toBeInTheDocument();
        });
        test('Required', async () => {
            const dom = getBookingForm();

            const input = getById(dom, 'name');
            fireEvent.blur(input);

            await waitFor(() => {
                expect(getById(dom, 'name-error')).not.toBe(null);
                expect(screen.getByText("Please provide a name for your reservation")).toBeInTheDocument();
            });
        });
        test('Too short', async () => {
            const dom = getBookingForm();

            // NOTE: We still need to trigger blur to cause the message to appear
            const input = getById(dom, 'name');
            fireEvent.change(input, { target: {value: "A" } });
            fireEvent.blur(input);

            await waitFor(() => {
                expect(getById(dom, 'name-error')).not.toBe(null);
                expect(screen.getByText("Name must have at least 2 characters")).toBeInTheDocument();
            });
        });
        test('Too long', async () => {
            const dom = getBookingForm();

            // NOTE: We still need to trigger blur to cause the message to appear
            const input = getById(dom, 'name');
            fireEvent.change(input, { target: {value: "A".repeat(51) } });
            fireEvent.blur(input);

            await waitFor(() => {
                expect(getById(dom, 'name-error')).not.toBe(null);
                expect(screen.getByText("Name cannot be more than 50 characters long")).toBeInTheDocument();
            });
        });
    });

    describe('Email', () => {
        test('Rendered', () => {
            const dom = getBookingForm();
            expect(getById(dom, 'email')).toBeInTheDocument();
        });

        test('Required', async () => {
            const dom = getBookingForm();

            const input = getById(dom, 'email');
            fireEvent.blur(input);

            await waitFor(() => {
                expect(getById(dom, 'email-error')).not.toBe(null);
                expect(screen.getByText("Please provide an email to confirm your reservation")).toBeInTheDocument();
            });
        });

        test('Invalid', async () => {
            const dom = getBookingForm();

            // NOTE: We still need to trigger blur to cause the message to appear
            const input = getById(dom, 'email');
            fireEvent.change(input, { target: {value: "foobar" } });
            fireEvent.blur(input);

            await waitFor(() => {
                expect(getById(dom, 'email-error')).not.toBe(null);
                expect(screen.getByText("Invalid email")).toBeInTheDocument();
            });
        });
    });

    describe('Datetime', () => {
        test('Rendered', () => {
            const dom = getBookingForm();
            expect(getById(dom, 'datetime')).toBeInTheDocument();
        });

        test('Required', async () => {
            const dom = getBookingForm();

            const input = getById(dom, 'datetime');
            fireEvent.blur(input);

            await waitFor(() => {
                expect(getById(dom, 'datetime-error')).not.toBe(null);
                expect(screen.getByText("Please select a reservation slot")).toBeInTheDocument();
            });
        });
    });

    describe('Guests', () => {
        test('Rendered', () => {
            const dom = getBookingForm();
            expect(getById(dom, 'guests')).toBeInTheDocument();
        });

        test('Required', async () => {
            const dom = getBookingForm();

            const input = getById(dom, 'guests');
            fireEvent.blur(input);

            await waitFor(() => {
                expect(getById(dom, 'guests-error')).not.toBe(null);
                expect(screen.getByText("How many guests will be attending?")).toBeInTheDocument();
            });
        });

        test('Too few', async () => {
            const dom = getBookingForm();

            // NOTE: We still need to trigger blur to cause the message to appear
            const input = getById(dom, 'guests');
            fireEvent.change(input, { target: {value: 0 } });
            fireEvent.blur(input);

            await waitFor(() => {
                expect(getById(dom, 'guests-error')).not.toBe(null);
                expect(screen.getByText("Too few guests")).toBeInTheDocument();
            });
        });

        test('Too many', async () => {
            const dom = getBookingForm();

            // NOTE: We still need to trigger blur to cause the message to appear
            const input = getById(dom, 'guests');
            fireEvent.change(input, { target: {value: 12 } });
            fireEvent.blur(input);

            await waitFor(() => {
                expect(getById(dom, 'guests-error')).not.toBe(null);
                expect(screen.getByText("Too many guests. Please call us for special events.")).toBeInTheDocument();
            });
        });
    });

    describe('Occasion', () => {
        test('Rendered', () => {
            const dom = getBookingForm();
            expect(getById(dom, 'occasion')).toBeInTheDocument();
        });
    });

    describe('Requests', () => {
        test('Rendered', () => {
            const dom = getBookingForm();
            expect(getById(dom, 'requests')).toBeInTheDocument();
        });
    });
});
