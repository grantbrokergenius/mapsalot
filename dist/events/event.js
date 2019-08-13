"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const findAll = (limit = 100, offset = 0, order = 'event_date', dir = 'asc') => _db.default.select().from('bg_events').whereNotNull('event_name').whereNull('stubhub_event_id').whereRaw('`event_date` > (now() - INTERVAL 1 DAY)').orderBy(order, dir).limit(limit).offset(offset);

const findSome = (params, ...args) => {
  const q = findAll(...args);
  Object.keys(params).forEach(x => params[x] && q.where(x, 'like', `%${params[x]}%`.replace(/\s+/, '%')));
  return q;
};

var _default = {
  findAll,
  findSome
};
exports.default = _default;