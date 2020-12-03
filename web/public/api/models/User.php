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
			$command->execute();

			return $command;
		}

		public function readAll() {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function readRange() {
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