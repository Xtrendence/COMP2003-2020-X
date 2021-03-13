<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../config/Database.php';
		include_once '../models/Admin.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['researcher_nhsRef', 'researcher_username', 'researcher_password', 'researcher_fName', 'researcher_lName', 'researcher_tel', 'researcher_mobile', 'researcher_email'];
		$missing = [];

		$database = new Database(false);
		$db = $database->connect($api_key);

		if (empty($_POST)) {
			$json = file_get_contents('php://input');
			$_POST = json_decode($json, true);
		}

		$admin = new Admin($db);
		$admin->researcher_nhsRef = isset($_POST['researcher_nhsRef']) ? $_POST['researcher_nhsRef'] : array_push($missing, 'researcher_nhsRef');
		$admin->researcher_username = isset($_POST['researcher_username']) ? $_POST['researcher_username'] : array_push($missing, 'researcher_username');
		$admin->researcher_password = isset($_POST['researcher_password']) ? password_hash($_POST['researcher_password'], PASSWORD_DEFAULT) : array_push($missing, 'researcher_password');
		$admin->researcher_fName = isset($_POST['researcher_fName']) ? $_POST['researcher_fName'] : array_push($missing, 'researcher_fName');
		$admin->researcher_lName = isset($_POST['researcher_lName']) ? $_POST['researcher_lName'] : array_push($missing, 'researcher_lName');
		$admin->researcher_tel = isset($_POST['researcher_tel']) ? $_POST['researcher_tel'] : array_push($missing, 'researcher_tel');
		$admin->researcher_mobile = isset($_POST['researcher_mobile']) ? $_POST['researcher_mobile'] : array_push($missing, 'researcher_mobile');
		$admin->researcher_email = isset($_POST['researcher_email']) ? $_POST['researcher_email'] : array_push($missing, 'researcher_email');

		if (empty($missing)) {
			$admin->create();
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>