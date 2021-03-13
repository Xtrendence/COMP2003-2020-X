<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../config/Database.php';
		include_once '../models/Admin.php';

		$expected = ['researcher_username', 'researcher_password'];
		$missing = [];

		$database = new Database(true);
		$db = $database->connect('bypass');

		if (empty($_POST)) {
			$json = file_get_contents('php://input');
			$_POST = json_decode($json, true);
		}
		
		$admin = new Admin($db);
		$admin->researcher_username = isset($_POST['researcher_username']) ? $_POST['researcher_username'] : array_push($missing, 'researcher_username');
		$admin->researcher_password = isset($_POST['researcher_password']) ? $_POST['researcher_password'] : array_push($missing, 'researcher_password');

		if (empty($missing)) {
			$loggedIn = $admin->login();

			if ($loggedIn['valid']) {
				echo json_encode(array('valid' => true, 'token' => $database->api_key, 'researcherID' => $loggedIn['researcherID']));
			} else {
				echo json_encode(array('valid' => false));
			}
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>