<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../config/Database.php';
		include_once '../models/Answer.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$input = json_decode(file_get_contents('php://input'), true);

		$expected = ['patientID', 'answerID', 'answer'];
		$missing = [];

		$patientID = !empty($input['patientID']) ? $input['patientID'] : array_push($missing, 'patientID');

		$database = new Database();

		if ($database->verify(array('key' => $api_key, 'id' => $patientID))) {
			$db = $database->connect();

			$answer = new Answer($db);
			$answer->answerID = isset($input['answerID']) ? $input['answerID'] : array_push($missing, 'answerID');
			$answer->answer = isset($input['answer']) ? $input['answer'] : array_push($missing, 'answer');

			if (empty($missing)) {
				$answer->update();
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