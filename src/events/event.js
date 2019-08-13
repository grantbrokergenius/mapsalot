import db from '../db';

const findAll = (limit = 100, offset = 0, order = 'event_date', dir = 'asc') => db.select().from('bg_events')
  .whereNotNull('event_name')
  .whereNull('stubhub_event_id')
  .whereRaw('`event_date` > (now() - INTERVAL 1 DAY)')
  .orderBy(order, dir)
  .limit(limit)
  .offset(offset);

const findSome = (params, ...args) => {
  const q = findAll(...args);
  Object.keys(params).forEach(x => params[x] && q.where(x, 'like', `%${params[x]}%`.replace(/\s+/, '%')));
  return q;
};
export default { findAll, findSome };
