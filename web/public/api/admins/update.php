<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../config/Database.php';
		include_once '../models/Admin.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['researcher_nhsRef', 'researcher_username', 'researcher_password', 'researcher_fName', 'researcher_lName', 'researcher_tel', 'researcher_mobile', 'researcher_email'];
		$missing = [];

		$database = new Database();
		
		if ($database->verify(array('key' => $api_key))) {
			$db = $database->connect();

			$input = json_decode(file_get_contents('php://input'), true);

			$admin = new Admin($db);
			$admin->researcher_nhsRef = isset($input['researcher_nhsRef']) ? $input['researcher_nhsRef'] : array_push($missing, 'researcher_nhsRef');
			$admin->researcher_username = isset($input['researcher_username']) ? $input['researcher_username'] : array_push($missing, 'researcher_username');

			if (isset($input['researcher_password']) && !empty($input['researcher_password'])) {
				$admin->researcher_password = password_hash($input['researcher_password'], PASSWORD_DEFAULT);
			}

			$admin->researcher_fName = isset($input['researcher_fName']) ? $input['researcher_fName'] : array_push($missing, 'researcher_fName');
			$admin->researcher_lName = isset($input['researcher_lName']) ? $input['researcher_lName'] : array_push($missing, 'researcher_lName');
			$admin->researcher_tel = isset($input['researcher_tel']) ? $input['researcher_tel'] : array_push($missing, 'researcher_tel');
			$admin->researcher_mobile = isset($input['researcher_mobile']) ? $input['researcher_mobile'] : array_push($missing, 'researcher_mobile');
			$admin->researcher_email = isset($input['researcher_email']) ? $input['researcher_email'] : array_push($missing, 'researcher_email');

			if (empty($missing)) {
				$admin->update();
			} else {
				die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
			}
		} else {
			echo json_encode(array('message' => 'Invalid API key.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use PUT instead.'));
	}
?>