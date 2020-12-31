<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        include_once '../config/Database.php';
        include_once '../models/Answer.php';

        $api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

        $database = new Database();
        $db = $database->connect($api_key);

        $answer = new Answer($db);
        $patientID = isset($_GET['id']) ? $_GET['id'] : die();
        
        $result = $answer->readUser($patientID);
        $rows = $result->rowCount();

        echo $rows;

        if ($rows > 0) {
            $array = array();
            $aray['data'] = array();

            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $item = array(
                    'patientID' => $patientID,
                    'questionID' => $questionID,
                    'question' => $question,
                    'question_type' => $question_type
                );

                if ($question_type == 'custom') {
					$charLim = array(
                        'question_charLim' => $question_charLim
                    );				
					array_push($item, $charLim);
				
				} else {
					$choiceArr = array(
						'choices' => array()							
					);

					$choices = [];

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
						$choiceArr['choices'][$i + 1] = $choices[$i];
					}
					array_push($item, $choiceArr);
					
                }
                $answerArr = array(
                    'answer' => $answer
                );
                array_push($item, $answerArr);
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