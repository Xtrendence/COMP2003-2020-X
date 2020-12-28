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

				if ($question_type == 'custom') {
					$item = array(
						'questionID' => $questionID,
						'question' => $question,
						'question_charLim' => $question_charLim,
						'question_type' => $question_type						
					);
				
				} else {
					$item = array(
						'questionID' => $questionID,
						'question' => $question,
						'question_type' => $question_type,
						'choices' => array()							
					);

					$choices = []

					$query = 'SELECT * FROM choice WHERE questionID=:id';
					$command = $db->prepare($query);
					$command->bindParam(':id', $questionID);
					$command->execute();

					if ($command->rowCount() > 0) {
						while ($row = $command->fetch(PDO::FETCH_ASSOC)) {
							array_push($choices, $row['choice']);
						}
					}

					for ($i = 0; $i < count($choices); $i++) {
						$item['choices'][$i + 1] = $choices[$i];
					}
					
					
				}
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