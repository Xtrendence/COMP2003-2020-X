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

		public function create($researcher_username) {
			$date = date('Y-m-d H:i:s');
			$query = 'INSERT INTO ' . $this->table . ' (patient_nhsRef, patient_username, patient_password, patient_fName, patient_lName, patient_dob, patient_addressI, patient_addressII, patient_postcode, patient_tel, patient_mobile, patient_email, patient_comment, fcmToken, fcmToken_creation) VALUES (:patient_nhsRef, :patient_username, :patient_password, :patient_fName, :patient_lName, :patient_dob, :patient_addressI, :patient_addressII, :patient_postcode, :patient_tel, :patient_mobile, :patient_email, :patient_comment, "-", "' . $date . '")';
			$command = $this->connection->prepare($query);
			$command->bindParam(':patient_nhsRef', $this->patient_nhsRef);
			$command->bindParam(':patient_username', $this->patient_username);
			$command->bindParam(':patient_password', $this->patient_password);
			$command->bindParam(':patient_fName', $this->patient_fName);
			$command->bindParam(':patient_lName', $this->patient_lName);
			$command->bindParam(':patient_dob', $this->patient_dob);
			$command->bindParam(':patient_addressI', $this->patient_addressI);
			$command->bindParam(':patient_addressII', $this->patient_addressII);
			$command->bindParam(':patient_postcode', $this->patient_postcode);
			$command->bindParam(':patient_tel', $this->patient_tel);
			$command->bindParam(':patient_mobile', $this->patient_mobile);
			$command->bindParam(':patient_email', $this->patient_email);
			$command->bindParam(':patient_comment', $this->patient_comment);
			$command->execute();
		}

		public function read() {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE patientID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->patientID);
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
			$query = 'SELECT * FROM ' . $this->table;
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function readRange($from, $to) {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE patientID BETWEEN :from AND :to';
			$command = $this->connection->prepare($query);
			$command->bindParam(':from', $from);
			$command->bindParam(':to', $to);
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
			$query = 'DELETE FROM ' . $this->table . ' WHERE patientID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->patientID);
			$command->execute();
		}

		public function login() {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE patient_username=:username';
			$command = $this->connection->prepare($query);
			$command->bindParam(':username', $this->patient_username);
			$command->execute();

			$row = $command->fetch(PDO::FETCH_ASSOC);

			if ($this->patient_username == $row['patient_username'] && $this->patient_password == $row['patient_password']) {
				return array('valid' => true, 'patientID' => $row['patientID']);
				$query = 'UPDATE ' . $this->table . ' SET fcmToken=:token WHERE patient_username=:username';
				$command = $this->connection->prepare($query);
				$command->bindParam(':username', $this->patient_username);
				$command->bindParam(':token', $this->fcmToken);
				$command->execute();
			}
			return array('valid' => false);
		}

		public function logout() {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}
	}
?>