<?php

	class Zillow_Api {

		private $zws_id;
		private $zpid;

		public function __construct($zws_id = null)
		{
			if ( ! empty($zws_id)) {
				$this->zws_id = $zws_id;
			}
		}

		public function __set($property, $value)
		{
			$this->$property = $value;
		}

		public function __get($property)
		{
			if (isset($this->$property)) {
				return $this->$property;
			}
		}

		public function url_get_contents ($Url) {
			if (!function_exists('curl_init')){ 
				die('CURL is not installed!');
			}
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $Url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$output = curl_exec($ch);
			curl_close($ch);
			return $output;
		}
		public function GetSearchResults($params)
		{
			if ( empty($this->zws_id)) {
				throw new Exception('ZWS_id is required.');
			}
			$params['zws-id'] = $this->zws_id;
			$url = 'http://www.zillow.com/webservice/GetSearchResults.htm?' . http_build_query($params);

			$result = $this->url_get_contents($url);

			if ( isset($result) ) {
				$xml_result = simplexml_load_string($result);
				$this->zpid = $xml_result->xpath('//response/results/result/zpid')[0];
			}

			return $this->zpid;
			
		}

		public function GetDeepComps($zpid)
		{
			$params = null;
			$params['zws-id'] = $this->zws_id;
			$params['count'] = 10;
			$params['zpid'] = $zpid;

			

			$url = 'http://www.zillow.com/webservice/GetDeepComps.htm?' . http_build_query($params);

			$result = $this->url_get_contents($url);


			return $result;
		}

		

	}

?>
