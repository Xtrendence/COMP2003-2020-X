<?php
	class Admin {
		private $connection;
		private $table = 'researcher';

		public $researcherID;
		public $researcher_nhsRef;
		public $researcher_username;
		public $researcher_password;
		public $researcher_fName;
		public $researcher_lName;
		public $researcher_tel;
		public $researcher_mobile;
		public $researcher_email;

		public function __construct($db) {
			$this->connection = $db;
		}

		public function create() {
			$query = 'CALL createResearcher(:researcher_nhsRef, :researcher_username, :researcher_password, :researcher_fName, :researcher_lName, :researcher_tel, :researcher_mobile, :researcher_email)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':researcher_nhsRef', $this->researcher_nhsRef);
			$command->bindParam(':researcher_username', $this->researcher_username);
			$command->bindParam(':researcher_password', $this->researcher_password);
			$command->bindParam(':researcher_fName', $this->researcher_fName);
			$command->bindParam(':researcher_lName', $this->researcher_lName);
			$command->bindParam(':researcher_tel', $this->researcher_tel);
			$command->bindParam(':researcher_mobile', $this->researcher_mobile);
			$command->bindParam(':researcher_email', $this->researcher_email);
			$command->execute();
		}

		public function read() {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE researcherID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->researcherID);
			$command->execute();

			$row = $command->fetch(PDO::FETCH_ASSOC);

			$this->researcherID = $row['researcherID'];
			$this->researcher_nhsRef = $row['researcher_nhsRef'];
			$this->researcher_username = $row['researcher_username'];
			$this->researcher_password = $row['researcher_password'];
			$this->researcher_fName = $row['researcher_fName'];
			$this->researcher_lName = $row['researcher_lName'];
			$this->researcher_tel = $row['researcher_tel'];
			$this->researcher_mobile = $row['researcher_mobile'];
			$this->researcher_email = $row['researcher_email'];
		}

		public function readAll() {
			$query = 'SELECT * FROM ' . $this->table;
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function readRange($from, $to) {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE researcherID BETWEEN :from AND :to';
			$command = $this->connection->prepare($query);
			$command->bindParam(':from', $from);
			$command->bindParam(':to', $to);
			$command->execute();

			return $command;
		}

		public function update() {
			if (empty($this->researcher_password)) {
				$query = 'SELECT researcher_password FROM ' . $this->table . ' WHERE researcher_nhsRef=:researcher_nhsRef';
				$command = $this->connection->prepare($query);
				$command->bindParam(':researcher_nhsRef', $this->researcher_nhsRef);
				$command->execute();

				$row = $command->fetch(PDO::FETCH_ASSOC);

				$this->researcher_password = $row['researcher_password'];
			}

			$query = 'CALL updateResearcher(:researcher_nhsRef, :researcher_username, :researcher_password, :researcher_fName, :researcher_lName, :researcher_tel, :researcher_mobile, :researcher_email)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':researcher_nhsRef', $this->researcher_nhsRef);
			$command->bindParam(':researcher_username', $this->researcher_username);
			$command->bindParam(':researcher_password', $this->researcher_password);
			$command->bindParam(':researcher_fName', $this->researcher_fName);
			$command->bindParam(':researcher_lName', $this->researcher_lName);
			$command->bindParam(':researcher_tel', $this->researcher_tel);
			$command->bindParam(':researcher_mobile', $this->researcher_mobile);
			$command->bindParam(':researcher_email', $this->researcher_email);
			$command->execute();
		}

		public function delete() {
			$query = 'CALL deleteResearcher(:id)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->researcherID);
			$command->execute();
		}

		public function login() {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE researcher_username=:username';
			$command = $this->connection->prepare($query);
			$command->bindParam(':username', $this->researcher_username);
			$command->execute();

			$row = $command->fetch(PDO::FETCH_ASSOC);

			if ($this->researcher_username == $row['researcher_username'] && password_verify($this->researcher_password, $row['researcher_password'])) {
				$id = $row['researcherID'];
				$token = 'admin$' . bin2hex(openssl_random_pseudo_bytes(32)) . '$' . $id . '$' . time();

				$query = 'CALL createResearcherLogin(:researcherID, :login_token)';
				$command = $this->connection->prepare($query);
				$command->bindParam(':researcherID', $id);
				$command->bindParam(':login_token', $token);
				$command->execute();

				return array('valid' => true, 'researcherID' => $id, 'token' => $token);
			}
			return array('valid' => false);
		}

		public function logout($token) {
			$query = 'UPDATE researcherlogin SET login_status=FALSE WHERE login_token=:login_token AND patientID=:patientID';
			$command = $this->connection->prepare($query);
			$command->bindParam(':researcherID', $this->researcherID);
			$command->bindParam(':login_token', $token);
			$command->execute();
		}
	}
?>