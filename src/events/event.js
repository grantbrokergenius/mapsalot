import db from '../db';

const findAll = (limit = 100, offset = 0, order = 'event_date', dir = 'asc') => db.select().from('bg_events')
  .whereNotNull('event_name')
  .whereNull('stubhub_event_id')
  .whereRaw('`event_date` > (now() - INTERVAL 1 HOUR)')
  .orderBy(order, dir)
  .limit(limit)
  .offset(offset);

const findSome = (params, ...args) => {
  const q = findAll(...args);
  Object.keys(params).forEach((x) => params[x] && q.where(x, 'like', `%${params[x]}%`.replace(/\s+/, '%')));
  return q;
};

const markUnresolved = () => true;

const findReal = () => db.raw(`SELECT bg_events.bg_event_id, pos_event_id, stubhub_event_id, event_name, venue_name, event_date,
pos_name, event_mappings.exchange_id, event_mappings.exchange_event_id, mapping_source
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
AND \`bg_events\`.\`event_date\` BETWEEN :start AND :end
AND (
\`event_mappings\`.\`approved\` = 0
OR \`event_mappings\`.\`approved\` IS NULL
OR \`event_mappings\`.\`exchange_id\` IS NULL
)`);

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


export default { findAll, findSome, markUnresolved };
