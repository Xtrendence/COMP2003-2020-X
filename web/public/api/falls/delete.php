<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
		include_once '../config/Database.php';
		include_once '../models/Fall.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);

		$fall = new Fall($db);
		
		parse_str(file_get_contents("php://input"), $input);

		$fall->fallID = !empty($input['fallID']) ? $input['fallID'] : die();

		$fall->delete();
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use DELETE instead.'));
	}
?>