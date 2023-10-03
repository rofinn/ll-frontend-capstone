import { useReducer } from 'react';
import { render, screen } from "@testing-library/react";
import BookingForm from './BookingForm';

// Some mock functions for our times props
const init = () => ["Select a time"];
const reducer = (action) => ["17:00", "20:00"];

test('Renders the BookingForm heading', () => {
    render(<BookingForm availableTimes={init()} dispatchTimes={reducer}/>);
    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
})
