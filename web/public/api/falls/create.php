<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../config/Database.php';
		include_once '../models/Fall.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die("No API key provided.");

		$database = new Database();
		$db = $database->connect($api_key);
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>