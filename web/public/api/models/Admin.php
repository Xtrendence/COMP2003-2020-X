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