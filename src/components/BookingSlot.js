// AFAICT, we're just wrapping our option in a BookingSlot component?
export default function BookingSlot(props) {
    return <option value={props.value}>{props.value}</option>
}
