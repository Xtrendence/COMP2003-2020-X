<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	include_once '../config/Database.php';
	include_once '../models/DiaryEntry.php';

	$database = new Database();
	$db = $database->connect();

	$diaryEntry = new DiaryEntry($db);

	$result = $diaryEntry->readAll();

	$rows = $result->rowCount();

	if($rows > 0) {
		$array = array();
		$array['data'] = array();
		while($row = $result->fetch(PDO::FETCH_ASSOC)) {
			extract($row);

			$item = array(
				'entryID' => $entryID,
				'patientID' => $patientID,
				'entry_date' => $entry_date,
				'entry' => $entry
			);

			array_push($array['data'], $item);
		}

		echo json_encode($array);
	} else {
		echo json_encode(array('message' => 'No diary entries found.'));
	}
?>