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
    Select,
    Textarea
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

import { fetchAPI } from '../api';

// *** CONSTANTS ***

// Initial form values
const INIT = {
    name: '',
    email: '',
    datetime: '',
    guests: '',
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
        .required("Please provide a name for your reservation")
        .min(2, "Name must have at least 2 characters")
        .max(50, "Name cannot be more than 50 characters long"),
    email: Yup
        .string()
        .required("Please provide an email to confirm your reservation")
        .email("Invalid email"),
    datetime: Yup
        .date()
        .required("Please select a reservation slot"),
    guests: Yup
        .number()
        .required("How many guests will be attending?")
        .positive()
        .min(1, "Too few guests")
        .max(10, "Too many guests. Please call us for special events."),
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
    const MIN_DATE = setHours(setMinutes(new Date(), 0), 17);
    const [selectedDate, setSelectedDate] = useState(MIN_DATE);

    // useEffect when selectedDate changes
    useEffect(() => {
        dispatch({type: 'fetch', times: fetchAPI(selectedDate)})
    }, [dispatch, selectedDate])

    // TODO: Include prevent default and form reset once we're happy with the validation.
    // TODO: Move style to the central .css file?
    return (
        <form
            id="bookingform"
            onSubmit={FORMIK.handleSubmit}
        >
            <h1>Book Now</h1>
            <FormControl isInvalid={FORMIK.touched.name && FORMIK.errors.name}>
                <FormLabel htmlFor="name" className="formLabel">Name</FormLabel>
                <Input
                    id="name"
                    className="formInput"
                    {...FORMIK.getFieldProps('name')}
                    onChange={FORMIK.handleChange}
                />
                <FormErrorMessage id="name-error" className="errorMsg">{FORMIK.errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={FORMIK.touched.email && FORMIK.errors.email}>
                <FormLabel htmlFor="email" className="formLabel">Email</FormLabel>
                <Input
                    id="email"
                    className="formInput"
                    {...FORMIK.getFieldProps('email')}
                    onChange={FORMIK.handleChange}
                />
                <FormErrorMessage id="email-error" className="errorMsg">{FORMIK.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={FORMIK.touched.datetime && FORMIK.errors.datetime}>
                <FormLabel htmlFor="datetime" className="formLabel">Select a reservation slot</FormLabel>
                <DatePicker
                    id="datetime"
                    className="formInput"
                    {...FORMIK.getFieldProps('datetime')}
                    minDate={MIN_DATE}
                    selected={selectedDate}
                    onChange={(date) => {
                        // console.log('datetime onChange input: ', date);
                        FORMIK.setFieldTouched('datetime', true, false);
                        FORMIK.handleChange('datetime')(date);
                        setSelectedDate(date);
                    }}
                    onBlur={FORMIK.handleBlur}
                    showTimeSelect
                    inline
                    timeIntervals={60}
                    dateFormat='yyyy/MM/dd - hh:mm aa'
                    filterDate={(date) => date.getDay() !== 1}
                    filterTime={(time) => state.times.includes(`${time.getHours()}:00`)}
                />
                <FormErrorMessage id="datetime-error" className="errorMsg">{FORMIK.errors.datetime}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={FORMIK.touched.guests && FORMIK.errors.guests}>
                <FormLabel htmlFor="guests" className="formLabel">Number of guests</FormLabel>
                <Input
                    id="guests"
                    className="formInput"
                    {...FORMIK.getFieldProps('guests')}
                    onChange={FORMIK.handleChange}
                />
                <FormErrorMessage id="guests-error" className="errorMsg">{FORMIK.errors.guests}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={FORMIK.touched.occasion && FORMIK.errors.occasion}>
                <FormLabel htmlFor="occasion" className="formLabel">Occasion (optional)</FormLabel>
                <Select
                    id="occasion"
                    className="formInput"
                    {...FORMIK.getFieldProps('occasion')}
                    onChange={FORMIK.handleChange}
                >
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                </Select>
                <FormErrorMessage id="occasion-error" className="errorMsg">{FORMIK.errors.occasion}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={FORMIK.touched.requests && FORMIK.errors.requests}>
                <FormLabel htmlFor="requests" className="formLabel">Requests (optional)</FormLabel>
                <Textarea
                    id="requests"
                    className="formInput"
                    {...FORMIK.getFieldProps('requests')}
                    onChange={FORMIK.handleChange}
                />
                <FormErrorMessage id="requests-error" className="errorMsg">{FORMIK.errors.requests}</FormErrorMessage>
            </FormControl>

            <Button type="submit" width="full">
                Make Your reservation
            </Button>
        </form>
    );
}
