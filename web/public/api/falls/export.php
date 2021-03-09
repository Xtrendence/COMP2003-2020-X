<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/Fall.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = [];
		$missing = [];

		$database = new Database(false);
		$db = $database->connect($api_key);

		$fall = new Fall($db);
		$fall->patientID = isset($_GET['id']) ? $_GET['id'] : array_push($missing, 'id');

		if (empty($missing)) {
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
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>