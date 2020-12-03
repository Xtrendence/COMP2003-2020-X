<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	include_once '../config/Database.php';
	include_once '../models/DiaryEntry.php';

	$database = new Database();
	$db = $database->connect();

	$diaryEntry = new DiaryEntry($db);
	$diaryEntry->entryID = isset($_GET['id']) ? $_GET['id'] : die();

	$diaryEntry->read();

	$item = array(
		'entryID' => $diaryEntry->entryID,
		'patientID' => $diaryEntry->patientID,
		'entry_date' => $diaryEntry->entry_date,
		'entry' => $diaryEntry->entry
	);

	echo json_encode($item);
?>