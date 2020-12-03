<?php
	class Database {
		private $host = 'proj-mysql.uopnet.plymouth.ac.uk';
		private $name = 'COMP2003_X';
		private $username = 'COMP2003_X';
		private $password = 'TdhU553+';
		private $connection;

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