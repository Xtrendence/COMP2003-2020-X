<?php
	class Database {
		private $host = 'proj-mysql.uopnet.plymouth.ac.uk';
		private $name = 'COMP2003_X';
		private $username = 'COMP2003_X';
		private $password = 'TdhU553+';
		private $connection;

		public function verify($key) {
			$database = new Database();
			$db = $database->connect();

			$query = 'SELECT * FROM researcherlogin WHERE login_status=TRUE AND login_token=:key';

			if (explode('$', $key)[0] == 'user') {
				$query = 'SELECT * FROM patientlogin WHERE login_status=TRUE AND login_token=:key';
			}

			$command = $db->prepare($query);
			$command->bindParam(':key', $key);
			$command->execute();

			if ($command->rowCount() > 0) {
				return true;
			}

			return false;
		}

		public function connect() {
			$this->connection = null;

			try {
				$this->connection = new PDO('mysql:host=' . $this->host . '; dbname=' . $this->name, $this->username, $this->password);
			} catch(PDOException $e) {
				echo 'Connection Error: ' . $e->getMessage();
			}

			return $this->connection;
		}
	}
?>