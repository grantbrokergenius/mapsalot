import { format, subDays, addDays } from 'date-fns';

const yesterday = (fmt) => format(subDays(new Date(), 1), fmt);
const twoyears = (fmt) => format(addDays(new Date(), 750), fmt);
const dateformat = (seconds) => format(new Date(Number(seconds)), 'E MMM d, yyyy h:mm a');

export { yesterday, twoyears, dateformat };
