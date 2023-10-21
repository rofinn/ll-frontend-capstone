// I think I prefer the more minimal API of react-hook-form, but this course
// has a preference for controlled components which is why I'm using Formik here
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select
    // Textarea
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

import { fetchAPI } from '../api';
import BookingSlot from './BookingSlot';

// *** CONSTANTS ***

// Initial form values
const INIT = {
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 0,
    occasion: '',
    requests: '',
};

/* Our format validation schema
 *
 * NOTE: Date and time are just strings, so we have a regex to catch any issues with the
 * generated <select> lists.
 */
const SCHEMA = Yup.object({
    name: Yup
        .string()
        .min(2, "Name must have at least 2 characters")
        .max(50, "Name cannot be more than 50 characters long")
        .required("Please provide a name for your reservation"),
    email: Yup
        .string()
        .email("Invalid email")
        .required("Please provide an email to confirm your reservation"),
    date: Yup
        .string()
        .required("Please select a reservation date")
        .matches(/\d{2,4}-\d{1,2}-\d{1,2}/, "Date must be of the form yyyy-mm-dd"),
    time: Yup
        .string()
        .required("Please select a time")
        .matches(/\d{1,2}:\d{1,2}/, "Time must be of the form hh:mm"),
    guests: Yup
        .number()
        .positive()
        .min(1, "Too few guests")
        .max(10, "Too many guests. Please call us for special events.")
        .required("How many guests will be attending?"),
    occasion: Yup
        .string(),
    requests: Yup
        .string()
        .max(256, "Limit of 256 characters"),
});


export default function BookingForm({state, dispatch, setter}) {
    const FORMIK = useFormik({
        initialValues: INIT,
        onSubmit: values => {setter(values)},
        validationSchema: SCHEMA,
    });

    // Simply store the selected date
    const [selected, setSelected] = useState(new Date())

    // useEffect when selectedDate changes
    useEffect(() => {dispatch(
        {type: 'fetch', times: fetchAPI(new Date(selected))}
    )}, [dispatch, selected])

    // TODO: Include prevent default and form reset once we're happy with the validation.
    // TODO: Move style to the central .css file?
    return (
        <>
            <h1>Book Now</h1>
            <form
                onSubmit={FORMIK.handleSubmit}
                style={{display: 'grid', maxWidth: '200px', gap: '20px'}}
            >
                <FormControl isInvalid={FORMIK.touched.name && FORMIK.errors.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        id="name"
                        {...FORMIK.getFieldProps('name')}
                        onChange={FORMIK.handleChange}
                    />
                    <FormErrorMessage>{FORMIK.errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={FORMIK.touched.email && FORMIK.errors.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        id="email"
                        {...FORMIK.getFieldProps('email')}
                        onChange={FORMIK.handleChange}
                    />
                    <FormErrorMessage>{FORMIK.errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={FORMIK.touched.date && FORMIK.errors.date}>
                    <FormLabel htmlFor="date">Choose date</FormLabel>
                    <DatePicker
                        id="date"
                        {...FORMIK.getFieldProps('date')}
                        selected={new Date()}
                        onChange={(val) => {
                            const date = val.toLocaleDateString();
                            setSelected(date);
                            FORMIK.setFieldValue('date', date);
                        }}
                    />
                    <FormErrorMessage>{FORMIK.errors.date}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={FORMIK.touched.time && FORMIK.errors.time}>
                    <FormLabel htmlFor="time">Choose time</FormLabel>
                    <Select
                        id="time"
                        {...FORMIK.getFieldProps('time')}
                        onChange={FORMIK.handleChange}
                    >
                        <option></option>
                        {state.times.map((time) => <BookingSlot key={time} value={time} />)}
                    </Select>
                    <FormErrorMessage>{FORMIK.errors.time}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={FORMIK.touched.guests && FORMIK.errors.guests}>
                    <FormLabel htmlFor="guests">Number of guests</FormLabel>
                    <Input
                        id="guests"
                        {...FORMIK.getFieldProps('guests')}
                        onChange={FORMIK.handleChange}
                    />
                    <FormErrorMessage>{FORMIK.errors.guests}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={FORMIK.touched.occasion && FORMIK.errors.occasion}>
                    <FormLabel htmlFor="occasion">Occasion (optional)</FormLabel>
                    <Select
                        id="occasion"
                        {...FORMIK.getFieldProps('occasion')}
                        onChange={FORMIK.handleChange}
                    >
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                    </Select>
                    <FormErrorMessage>{FORMIK.errors.occasion}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={FORMIK.touched.requests && FORMIK.errors.requests}>
                    <FormLabel htmlFor="requests">Requests (optional)</FormLabel>
                    <Input
                        id="requests"
                        {...FORMIK.getFieldProps('requests')}
                        onChange={FORMIK.handleChange}
                    />
                    <FormErrorMessage>{FORMIK.errors.requests}</FormErrorMessage>
                </FormControl>

                <Button type="submit" width="full">
                    Make Your reservation
                </Button>
            </form>
        </>
    );
}
