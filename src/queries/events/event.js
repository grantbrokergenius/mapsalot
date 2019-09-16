import { format } from 'date-fns';
import db from '../../db';
import { auth, authWithUser } from '../../utils/authorized';
import { yesterday, twoyears } from '../../utils/date';


const allowedSort = ['event_date', 'event_name', 'venue_name'];

const transform = (e) => e.map((f) => ({
  bgEventId: f.bg_event_id,
  event: f.event_name,
  venue: f.venue_name,
  eventDate: f.event_date,
  posName: f.pos_name,
}));

/*
 $update = DB::table('unresolveable_mappings')
            ->where('exchange_id', $exchangeId)
            ->where('bg_event_id', $bgEventId)
            ->count();
        if ($update ==  0) {
            return DB::table('unresolveable_mappings')
            ->insert([
                'bg_event_id' => $bgEventId,
                'exchange_id' => $exchangeId,
                'declared_by' => $userId,
                'created_at' => Carbon::now()
            ]);
        }
        */
const markUnresolved = authWithUser((user, bgEventId, exchangeId) => db.raw('INSERT INTO unresolveable_mappings (bg_event_id, exchange_id, declared_by) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE created_at = NOW()', [bg_event_id, exchange_id, user.user_id]));

const findEvents = ({
  dateFrom = format(yesterday(), 'yyyy-MM-dd'), dateTo = format(twoyears(), 'yyyy-MM-dd'), event = '%', venue = '%',
  limit = 100, offset = 0, order = 'event_date', dir = 'asc',
} = {}) => allowedSort.includes(order)
  && ['asc', 'desc'].includes(dir)
  && db.raw(`SELECT bg_events.bg_event_id as bg_event_id, event_name, venue_name, event_date, pos_name
    FROM \`bg_events\`
    LEFT JOIN \`event_mapping_flags\`
    ON \`bg_events\`.\`bg_event_id\` = \`event_mapping_flags\`.\`bg_event_id\`
    LEFT JOIN \`event_mappings\`
    ON \`bg_events\`.\`bg_event_id\` = \`event_mappings\`.\`bg_event_id\`
    AND \`event_mappings\`.\`exchange_id\` = 1
    LEFT JOIN \`unresolveable_mappings\`
    ON \`event_mappings\`.\`bg_event_id\` = \`unresolveable_mappings\`.\`bg_event_id\`
    AND \`event_mappings\`.\`exchange_id\` = \`unresolveable_mappings\`.\`exchange_id\`
    WHERE \`unresolveable_mappings\`.\`bg_event_id\` IS NULL
    AND \`bg_events\`.\`event_date\` BETWEEN ? AND ?

    AND event_name LIKE ?
    AND venue_name LIKE ?
    AND (
    \`event_mappings\`.\`approved\` = 0
    OR \`event_mappings\`.\`approved\` IS NULL
    OR \`event_mappings\`.\`exchange_id\` IS NULL
    ) ORDER BY ${order} ${dir} LIMIT ${limit} OFFSET ${offset}`,
  [dateFrom, dateTo, event, venue])
    .then((res) => res[0])
    .then(transform);

const find = auth(findEvents);


/*
$sql = <<<SQL
  SELECT bg_events.bg_event_id, pos_event_id, stubhub_event_id, event_name, venue_name, event_date,
            pos_name, event_mappings.exchange_id, event_mappings.exchange_event_id, mapping_source
    FROM `bg_events`
    LEFT JOIN `event_mapping_flags`
      ON `bg_events`.`bg_event_id` = `event_mapping_flags`.`bg_event_id`
    LEFT JOIN `event_mappings`
      ON `bg_events`.`bg_event_id` = `event_mappings`.`bg_event_id`
      AND `event_mappings`.`exchange_id` = 1
    LEFT JOIN `unresolveable_mappings`
      ON `event_mappings`.`bg_event_id` = `unresolveable_mappings`.`bg_event_id`
      AND `event_mappings`.`exchange_id` = `unresolveable_mappings`.`exchange_id`
    WHERE `unresolveable_mappings`.`bg_event_id` IS NULL
      AND `bg_events`.`event_date` BETWEEN :start AND :end
      AND (
        `event_mappings`.`approved` = 0
        OR `event_mappings`.`approved` IS NULL
        OR `event_mappings`.`exchange_id` IS NULL
      )
SQL;

        if (in_array($data['name_type'], ['event_name', 'venue_name'])) {
            $sql .= ' AND '.$data['name_type'].' LIKE :search_name';
            $bindings['search_name'] = '%'.$data['search_name'].'%';
        }


        if ($data['only_flagged_events'] != "false") {
            $sql .= ' AND `event_mapping_flags`.`bg_event_id` IS NOT NULL';
        }

        $sql .= ' ORDER BY `event_date` ASC';
        */


export default {
  find, markUnresolved,
};
