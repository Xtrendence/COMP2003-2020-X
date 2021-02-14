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
        
        $question = new Question($db);
        $question->questionID = isset($input['questionID']) ? $input['questionID'] : die();
        $question->question = isset($input['question']) ? $input['question'] : die();
        $question->question_type = isset($input['question_type']) ? $input['question_type'] : die();
        
        if ($question->question_type == 'custom') {
            $question->question_charLim = isset($input['question_charLim']) ? $input['question_charLim'] : die();
        } else {
            $question->choices = isset($input['choices']) ? $input['choices'] : die();
        }

        $answer->update();
    } else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use PUT instead.'));
	}
?>