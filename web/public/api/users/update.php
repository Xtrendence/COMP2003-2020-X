<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if($_SERVER['REQUEST_METHOD'] == 'GET') {

	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use PUT instead.'));
	}
?>