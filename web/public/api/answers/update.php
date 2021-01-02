<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../config/Database.php';
		include_once '../models/Answer.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);

        $input = json_decode(file_get_contents('php://input'), true);
        
        $answer = new Answer($db);
        $answer->answerID = isset($input['answerID']) ? $input['answerID'] : die();
        $answer->questionID = isset($input['questionID']) ? $input['questionID'] : die();
        $answer->patientID = isset($input['patientID']) ? $input['patientID'] : die();
        $answer->answer = isset($input['answer']) ? $input['answer'] : die();

        $answer->update();
    } else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use PUT instead.'));
	}
?>