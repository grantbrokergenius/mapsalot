import dateformat from 'dateformat';

export default (epoch) => dateformat(new Date(parseInt(epoch, 10)), 'ddd mmm d, yyyy h:MM TT');
