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
		$admin->researcherID = isset($_GET['id']) ? $_GET['id'] : array_push($missing, 'id');

		if (empty($missing)) {
			$admin->read();

			if (!empty($admin->researcherID)) {
				$item = array(
					'researcherID' => $admin->researcherID,
					'researcher_nhsRef' => $admin->researcher_nhsRef,
					'researcher_username' => $admin->researcher_username,
					'researcher_password' => $admin->researcher_password,
					'researcher_fName' => $admin->researcher_fName,
					'researcher_lName' => $admin->researcher_lName,
					'researcher_tel' => $admin->researcher_tel,
					'researcher_mobile' => $admin->researcher_mobile,
					'researcher_email' => $admin->researcher_email
				);

				echo json_encode($item, JSON_PRETTY_PRINT);
			} else {
				echo json_encode(array('message' => 'Admin not found.'));
			}
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>