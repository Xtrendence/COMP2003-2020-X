<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../config/Database.php';
		include_once '../models/User.php';

		$database = new Database();
		$db = $database->connect('bypass');

		if(empty($_POST)) {
			$json = file_get_contents('php://input');
			$_POST = json_decode($json, true);
		}
		
		$user = new User($db);
		$user->patient_username = isset($_POST['username']) ? $_POST['username'] : die();
		$user->patient_password = isset($_POST['password']) ? $_POST['password'] : die();

		$loggedIn = $user->login();

		if ($loggedIn) {
			echo json_encode(array('valid' => true, 'token' => $database->api_key));
		} else {
			echo json_encode(array('valid' => false));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>