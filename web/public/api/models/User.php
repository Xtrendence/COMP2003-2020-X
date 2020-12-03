<?php
	class User {
		private $connection;
		private $table = 'patient';

		public $patientID;
		public $patient_nhsRef;
		public $patient_username;
		public $patient_password;
		public $patient_fName;
		public $patient_lName;
		public $patient_dob;
		public $patient_addressI;
		public $patient_addressII;
		public $patient_postcode;
		public $patient_tel;
		public $patient_mobile;
		public $patient_email;
		public $patient_comment;
		public $fcmToken;
		public $fcmToken_creation;

		public function __construct($db) {
			$this->connection = $db;
		}

		public function create() {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function read() {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->bindParam(1, $this->patientID);
			$command->execute();

			$row = $command->fetch(PDO::FETCH_ASSOC);

			$this->patientID = $row['patientID'];
			$this->patient_nhsRef = $row['patient_nhsRef'];
			$this->patient_username = $row['patient_username'];
			$this->patient_password = $row['patient_password'];
			$this->patient_fName = $row['patient_fName'];
			$this->patient_lName = $row['patient_lName'];
			$this->patient_dob = $row['patient_dob'];
			$this->patient_addressI = $row['patient_addressI'];
			$this->patient_addressII = $row['patient_addressII'];
			$this->patient_postcode = $row['patient_postcode'];
			$this->patient_tel = $row['patient_tel'];
			$this->patient_mobile = $row['patient_mobile'];
			$this->patient_email = $row['patient_email'];
			$this->patient_comment = $row['patient_comment'];
			$this->fcmToken = $row['fcmToken'];
			$this->fcmToken_creation = $row['fcmToken_creation'];
		}

		public function readAll() {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function readRange($start, $end) {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function update() {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function delete() {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function login() {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function logout() {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}
	}
?>