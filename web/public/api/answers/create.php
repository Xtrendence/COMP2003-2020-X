<?php
    header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../config/Database.php';
		include_once '../models/Answer.php';

        $api_key = isset($_GET['key']) ? $_GET['key'] : die(json_encode(array('message' => 'No API key provided.')));

		$expected = ['questionID', 'patientID', 'answer'];
		$missing = [];

		$database = new Database(false);
		$db = $database->connect($api_key);

        if (empty($_POST)) {
			$json = file_get_contents('php://input');
			$_POST = json_decode($json, true);
        }

        $answer = new Answer($db);
        $answer->questionID = isset($_POST['questionID']) ? $_POST['questionID'] : array_push($missing, 'questionID');
        $answer->patientID = isset($_POST['patientID']) ? $_POST['patientID'] : array_push($missing, 'patientID');
        $answer->answer = isset($_POST['answer']) ? $_POST['answer'] : array_push($missing, 'answer');

        if (empty($missing)) {
            $answer->create();
        } else {
            die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
        }
    } else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>