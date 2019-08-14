// https://brokergenius.atlassian.net/wiki/spaces/BF/pages/65817627/Stubhub+API+Documentation?preview=/65817627/65817743/API%20Reference%20-%20Event.pdf
const fetch = require('node-fetch');

// https://developer.stubhub.com/searchevent/apis/get/search/events/v3

const searchUrl = 'https://api.stubhub.com/search/catalog/events/v3';

const qs = params => Object.keys(params)
  .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&');

const findEvents = fields => fetch(`${searchUrl}?${qs(fields)}`, { headers: { 'content-type': 'application/json' } });

export default findEvents;

/*

url: https://api.brokergenius.com/v1/exchange/over_write_event

v4.0: app\libraries\Pricegenius\OverWriteEvent.php

public function save_event_central_database($form_data)
    {

        if (!empty($this->acc_type)) {
            $pos_event_id = $form_data['local_event_id'];

            $product  = explode('-', $this->product_name);
            $pos_name = $product[1];
            $resource = "over_write_event";
            $url      = $this->url . $resource;

            $this->request_options['body'] = [
                'pos_event_id'      => $pos_event_id,
                'exchange_event_id' => $this->get_stubhub_id_by_url($form_data['stubhub_url']),
                'event_date'        => $form_data['date'],
                'event_time'        => '',
                'venue_name'        => $form_data['venue_name'],
                'event_name'        => $form_data['event_name'],
                'pos_name'          => $pos_name,
                'acc_type'          => $this->acc_type,
                'user'              => $this->name,
                'approve_status'    => $form_data['approve_status'],
                'source'            => "manual",
                'exchange_id'       => $form_data['exchange_id']
            ];

            $resp = $this->guzzle->post($url, $this->request_options);
            $resp = $resp->json();
            $this->cache_library->deleteCacheEventmetaResponse($pos_event_id);
//                sleep(1.3);
            return $resp;
        }
        return false;
    }
    */
