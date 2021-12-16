<?php

public function get_trip_guide_detail($id, $archive = 0)
  {
    $r = array();
    $this->db->select("trip_date.tdid, trip_date.seq,trip_day_summary.col_data as summary,trip_day_body.col_data as article_body,
            trip_poi.tpid, ptype as poi_type, trip_poi.name as poi_name, pid as poi_id, lat, lng, image_id, image_file, trip_poi.seq as poi_seq, share_col_5,
            trip_poi_extra_data.title, trip_poi_extra_data.description, trip_poi_extra_data.images,
            trip_poi_extra_data.related_articles, trip_poi_extra_data.poi_info ,trip_poi_extra_data.transport, 
            trip_poi_extra_data.disable_flg", false);
    $this->db->from('trip_date');
    $this->db->join('trip', 'trip_date.tid = trip.tid');
    $this->db->join('trip_date_extra_data trip_day_summary', 'trip_date.tdid = trip_day_summary.tdid AND trip_day_summary.data_type = "summary"', 'left');
    $this->db->join('trip_date_extra_data trip_day_body', 'trip_date.tdid = trip_day_body.tdid AND trip_day_body.data_type = "article_body"', 'left');
    $this->db->join(
      '(select * from trip_poi where tid=' . $this->db->escape($id) . ' )as trip_poi',
      'trip_date.tdid = trip_poi.tdid',
      'left'
    );
    $this->db->join('trip_poi_extra_data', 'trip_poi_extra_data.tpid = trip_poi.tpid', 'left');
    $this->db->where('trip_date.tid', $id);
    $this->db->order_by('trip_date.seq, trip_poi.seq');

    $list = $this->db->get()->result_array();
    $weekarray = array('日', '一', '二', '三', '四', '五', '六');

    foreach ($list as $key => $value) {
      if (!isset($r[$value['tdid']])) {
        $r[$value['tdid']] = [
          'tdid' => $value['tdid'],
          'seq' => $value['seq'],
          'summary' => $value['summary'],
          'article_body' => $value['article_body'],
          'pois' => []
        ];
      }
      if ($value['poi_type'] != '') {
        if (in_array($value['poi_type'], array('H', 'R', 'S'))) {
          $poi_type = get_full_type($value['poi_type']);
          $poi_url = site_url(build_poi_url($this->_site_path, $poi_type, $value['poi_id']));
          $poi_image_url = build_unit_image_url($value['image_id'], $value['image_file'], 'n');
          $poi_image_s_url = build_unit_image_url($value['image_id'], $value['image_file'], 's');
        } else {
          $poi_url = '';
          $poi_image_url = '';
          $poi_image_s_url = '';
        }

        $related_ano = json_decode($value['related_articles'], true);
        if (!empty($related_ano)) {
          $this->load->model("article_model");
          $related_info_arr = $this->article_model->get_trip_guide_article($related_ano, $this->language_code);
        } else {
          $related_info_arr = NULL;
        }

        $poi_transport = json_decode($value['transport'], true);

        // To get most priority to displaying transportation icon,  0=>'walk', 1=>'car', 2=>'train'
        if ($poi_transport) {
          $mode_arr = array();
          foreach ($poi_transport as $t => $detail) {
            if ($detail['type'] == 'train' || $detail['type'] == 'bus') {
              $mode_arr[$t] = 2;
            } else if ($detail['type'] == 'car') {
              $mode_arr[$t] = 1;
            } else if ($detail['type'] == 'walk') {
              $mode_arr[$t] = 0;
            }
          }
        }
        $route_mode = !empty($poi_transport) ? max($mode_arr) : NULL;

        $r[$value['tdid']]['pois'][$value['poi_seq']][] =
          [
            'tdid' => $value['tdid'],
            'tpid' => $value['tpid'],
            'poi_type' => $value['poi_type'],
            'poi_name' => $value['poi_name'],
            'poi_id' => $value['poi_id'],
            'route_mode' => $route_mode,
            'lat' => $value['lat'],
            'lng' => $value['lng'],
            'poi_url' => $poi_url,
            'poi_image_url' => $poi_image_url,
            'poi_image_s_url' => $poi_image_s_url,
            'poi_title' => $value['title'],
            'poi_extra_images' => json_decode($value['images'], true),
            'poi_desc' => $value['description'],
            'poi_related' => $related_info_arr,
            'poi_info' => json_decode($value['poi_info'], true),
            'poi_transport' => $poi_transport,
            'poi_disable_flg' => $value['disable_flg'],
          ];
      }
    }

    return $r;
  }