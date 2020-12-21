<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../config/Database.php';
		include_once '../models/Question.php';

		$api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$database = new Database();
		$db = $database->connect($api_key);

		$question = new Question($db);
		$result = $question->readAll();

		$rows = $result->rowCount();

		if ($rows > 0) {
			$array = array();
			$array['data'] = array();
			while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
				extract($row);

				$item = array(
					'questionID' => $questionID,
					'question' => $question,
					'question_charlim' => $question_charLim,
					'question_type' => $question_type
				);

				array_push($array['data'], $item);
			}

			echo json_encode($array, JSON_PRETTY_PRINT);
		} else {
			echo json_encode(array('message' => 'No questions found.'));
		}
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}
?>