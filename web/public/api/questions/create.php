<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../config/Database.php';
		include_once '../models/Question.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

        $missing = [];
        $choices = [];

		$database = new Database();

        if ($database->verify(array('key' => $api_key))) {
            $db = $database->connect();

            if (empty($_POST)) {
                $json = file_get_contents('php://input');
                $_POST = json_decode($json, true);
            }
            
            $question = new Question($db);
            $patientID = isset($_POST['patientID']) ? $_POST['patientID'] : array_push($missing, 'patientID');
            $question->question = isset($_POST['question']) ? $_POST['question'] : array_push($missing, 'question');
            $question->question_type = isset($_POST['question_type']) ? $_POST['question_type'] : array_push($missing, 'question_type');
            
            if ($question->question_type == 'custom') {
                $expected = ['patientID', 'question', 'question_type', 'charLim'];
                $question->question_charLim = isset($_POST['question_charLim']) ? $_POST['question_charLim'] : array_push($missing, 'question_charLim');
            } else {
                $expected = ['patientID', 'question', 'question_type', 'choices'];
                $choices = isset($_POST['choices']) ? $_POST['choices'] : array_push($missing, 'choices');
            }

            if (empty($missing)) {
                $question->create($patientID, $choices);
                echo json_encode(array("questionID" => $question->questionID));
            } else {
                die(json_encode(array("expected" => $expected, "missing" => $missing), JSON_PRETTY_PRINT));
            }
        } else {
            echo json_encode(array('message' => 'Invalid API key.'));
        }
    } else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
        
?>