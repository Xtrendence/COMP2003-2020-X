<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/Question.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
        $db = $database->connect($api_key);
     
        if (empty($_POST)) {
			$json = file_get_contents('php://input');
			$_POST = json_decode($json, true);
        }
        
        $question = new Question($db);
        $question->question = isset($_POST['question']) ? $_POST['question'] : die();
        $question->question_type = isset($_POST['question_type']) ? $_POST['question_type'] : die();
        if ($question->question_type == "custom") {
            $question->question_charLim = isset($_POST['question_charLim']) ? $_POST['question_charLim'] : die();
            $question->create();
        } else {
            $question->question_charLim = "null";
            $question->create();
        }
      

    } else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
        
?>