<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        include_once '../config/Database.php';
        include_once '../models/Answer.php';

        $api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

        $expected = ['id'];
        $missing = [];

        $database = new Database();

        if ($database->verify(array('key' => $api_key))) {
            $db = $database->connect();

            $answer = new Answer($db);
            $answerID = isset($_GET['id']) ? $_GET['id'] : array_push($missing, 'id');

            if (empty($missing)) {
                $result = $answer->read($answerID);
                $rows = $result->rowCount();

                if ($rows > 0) {
                    $array = array();
                    $array['data'] = array();

                    $row = $result->fetch(PDO::FETCH_ASSOC);
                    extract($row);
                    $item = array(
                        'patientID' => $patientID,
                        'questionID' => $questionID,
                        'question' => $question,
                        'question_type' => $question_type
                    );

                    if ($question_type == 'custom') {
                        $item['question_charLim'] = $question_charLim;

                    } else {
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
                            $item['choices'][$i + 1] = $choices[$i];
                        }					
                    }
                    $item['answerID'] = $answerID;
                    $item['answer'] = $answer;
                    array_push($array['data'], $item);

                    echo json_encode($array, JSON_PRETTY_PRINT);
                } else {
                    echo json_encode(array('message' => 'No questions found.'));
                }
            } else {
                die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
            }
        } else {
            echo json_encode(array('message' => 'Invalid API key.'));
        }
	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
	}  
?>