<?php
private function handle_trip_guide_request($data)
  {
    $data['title'] = $data['trip_title'] . ' | ' . $this->lang->line('自由行攻略') . ' | '. $this->lang->line('旅行酒吧');
    $data['page_desc'] = $data['trip_desc'];
    $data['og_title'] = $data['title'];
    $data['article_title'] = 'article';
    require_once APPPATH . 'libraries/Mobile_Detect.php';
    $mobile_detect = new Mobile_Detect();
    $data['is_mobile'] = $mobile_detect->isMobile();
    if ($data['is_mobile']) {
      $data['mobile_cover'] = $this->trip_model->get_trip_extra_data($data['trip_id'], 'mobile_cover');
    }

    $data['MINI_PLANNER'] = true;

    // get day recommend data
    $prod_rec = $this->trip_model->get_trip_guide_day_recommend($data['trip_id'], 'prod_rec');
    foreach ($prod_rec as $rec) {
      $data['trips'][$rec['tdid']]['prod_rec'][] = json_decode($rec['col_data'], true);
    }

    $hotel_rec = $this->trip_model->get_trip_guide_day_recommend($data['trip_id'], 'hotel_rec');
    foreach ($hotel_rec as $rec) {
      $data['trips'][$rec['tdid']]['hotel_rec'][] = json_decode($rec['col_data'], true);
    }

    $res_rec = $this->trip_model->get_trip_guide_day_recommend($data['trip_id'], 'res_rec');
    foreach ($res_rec as $rec) {
      $data['trips'][$rec['tdid']]['res_rec'][] = json_decode($rec['col_data'], true);
    }

    $data['copy_count'] = $this->trip_model->get_trip_copy_count($data['trip_id'], ['include_draft' => true]);
    $data['add_to_trip_count'] = $this->trip_model->get_add_to_trip_count($data['trip_id']);
    $data['add_to_collection_count'] = $this->trip_model->get_add_to_collection_count($data['trip_id']);

    $data['recommend_kouryaku'] = $this->trip_model->get_kouryaku_recommend($this->language_code);

    $this->load->model("poi_model");
    foreach ($data['trips'] as $tdid => $trip) {
      foreach ($trip['pois'] as $x => $dayX) {
        $data['trips'][$tdid]['pois'][$x][0]['poi_hasbeen'] = $this->poi_model->get_HasBeen_count($dayX[0]['poi_type'], $dayX[0]['poi_id']);
      }
    }

    $data['css_files'] = [
      'css/trip/trip_guide_detail.css',
      'css/trip/trip_guide_detail_day_info.css',
      'css/trip/trip_guide_article_body.css',
      'css/trip/trip_guide_detail_sticky.css',
      'css/trip/trip_guide_map.css',
      'js/datetimepicker/jquery.datetimepicker.css',
      'css/components/addToTrip.css',
      'css/components/collection_v2.css',
      'css/image_slider.css',
    ];

    $data['js_files'] = [
      'js/vendors/vuejs/2.2.6/vue.min.js',
      'js/moment/min/moment.min.js',
      'js/datetimepicker/jquery.datetimepicker.js',
      'js/components/addDayToTrip.js',
      'js/components/addToTrip.js',
      'js/components/collection_v2.js',
      'js/trip/trip_guide_map.js',
      'js/trip/trip_guide_detail.'.$this->language_code.'.js',
      'js/image_slider.js',
      'js/lang/select_language.js',
      'js/currency/currency.js',
      'js/sweetalert-cdn/sweetalert2.js',
      'js/components/addPoiToWant.js',
      'js/blank.js'
    ];
    $data['css_files'][] = 'css/animate/animate.min.css';

    // check is event trip guide
    if (in_array($data['trip_id'], [326955, 327272, 327298, 327326, 327370, 327371])) {
      $this->load->model('event_model');
      $data['fixbar'] = true;
      $data['share_btn'] = $this->event_model->get_dototrip2019_results($data['userid'], $data['trip_id'], $this->language_code);

      $data['css_files'][] = 'css/event/dototrip2019_fixbar.css';
      $data['miyoko_url'] = $this->trip_model->get_trip_extra_data($data['trip_id'], 'miyoko_url');
    }

    $data['header_style'] = 'new_header';

    // $this->output->enable_profiler();
    // \Kint::$maxLevels = 0;
    // d($data['trips']);
    // return;

    // $this->layout->loadview_v3("trip/trip_guide_detail", $data);
  }