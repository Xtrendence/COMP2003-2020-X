<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../config/Database.php';
		include_once '../models/Answer.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = [];
		$missing = [];

		$database = new Database(false);
		$db = $database->connect($api_key);

        $input = json_decode(file_get_contents('php://input'), true);
        
        $answer = new Answer($db);
        $answer->answerID = isset($input['answerID']) ? $input['answerID'] : array_push($missing, 'answerID');
        $answer->answer = isset($input['answer']) ? $input['answer'] : array_push($missing, 'answer');

		if(empty($missing)) {
			$answer->update();
		} else {
			die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
		}
    } else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use PUT instead.'));
	}
?>