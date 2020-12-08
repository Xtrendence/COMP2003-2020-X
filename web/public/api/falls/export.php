<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/Fall.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);

		$fall = new Fall($db);
		$fall->patientID = isset($_GET['id']) ? $_GET['id'] : die();

		$result = $fall->readUser();

		$rows = $result->rowCount();
		
		if ($rows > 0) {
			$array = array();
			$array['data'] = array();
			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);
		
				$item = array(
					'fallID' => $fallID,
					'patientID' => $patientID,
					'fall_date' => $fall_date
				);
		
				array_push($array['data'], $item);
			}

			header('Content-Type: text/csv');
			header('Pragma: no-cache');
			header('Expires: 0');
			header('Content-Disposition: attachment; filename=Patient-' . $fall->patientID . '-Falls.csv');

			for ($i = 0; $i < 5; $i++) {
				array_push($array['data'], array('fallID' => $i, 'patientID' => 1, 'fall_date' => '2020-05-02'));
			}

			$output = fopen('php://output', 'w');
			fputcsv($output, array('fallID', 'patientID', 'fall_date'));
			foreach ($array['data'] as $row) {
				fputcsv($output, $row);
			}
			fclose($output);
		} else {
			echo json_encode(array('message' => 'No falls found.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>