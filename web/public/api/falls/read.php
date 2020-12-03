<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	include_once '../config/Database.php';
	include_once '../models/Fall.php';

	$database = new Database();
	$db = $database->connect();

	$fall = new Fall($db);
	$fall->fallID = isset($_GET['id']) ? $_GET['id'] : die();

	$fall->read();

	$item = array(
		'fallID' => $fall->fallID,
		'patientID' => $fall->patientID,
		'fall_date' => $fall->fall_date
	);

	echo json_encode($item);
?>