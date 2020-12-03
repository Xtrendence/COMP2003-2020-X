<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	include_once '../config/Database.php';
	include_once '../models/User.php';

	$database = new Database();
	$db = $database->connect();

	$user = new User($db);
	$user->patientID = isset($_GET['id']) ? $_GET['id'] : die();

	$user->read();

	$item = array(
		'patientID' => $user->patientID,
		'patient_nhsRef' => $user->patient_nhsRef,
		'patient_username' => $user->patient_username,
		'patient_password' => $user->patient_password,
		'patient_fName' => $user->patient_fName,
		'patient_lName' => $user->patient_lName,
		'patient_dob' => $user->patient_dob,
		'patient_addressI' => $user->patient_addressI,
		'patient_addressII' => $user->patient_addressII,
		'patient_postcode' => $user->patient_postcode,
		'patient_tel' => $user->patient_tel,
		'patient_mobile' => $user->patient_mobile,
		'patient_email' => $user->patient_email,
		'patient_comment' => $user->patient_comment,
		'fcmToken' => $user->fcmToken,
		'fcmToken_creation' => $user->fcmToken_creation
	);

	echo json_encode($item);
?>