<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/Admin.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = [];
		$missing = [];

		$database = new Database(false);
		$db = $database->connect($api_key);

		$admin = new Admin($db);

		$from = isset($_GET['from']) ? $_GET['from'] : array_push($missing, 'from');
		$to = isset($_GET['to']) ? $_GET['to'] : array_push($missing, 'to');

		if(empty($missing)) {
			$result = $admin->readRange($from, $to);

			$rows = $result->rowCount();

			if ($rows > 0) {
				$array = array();
				$array['data'] = array();
				while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
					extract($row);

					$item = array(
						'researcherID' => $researcherID,
						'researcher_nhsRef' => $researcher_nhsRef,
						'researcher_username' => $researcher_username,
						'researcher_password' => $researcher_password,
						'researcher_fName' => $researcher_fName,
						'researcher_lName' => $researcher_lName,
						'researcher_tel' => $researcher_tel,
						'researcher_mobile' => $researcher_mobile,
						'researcher_email' => $researcher_email
					);

					array_push($array['data'], $item);
				}

				echo json_encode($array, JSON_PRETTY_PRINT);
			} else {
				echo json_encode(array('message' => 'No admins found.'));
			}
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>