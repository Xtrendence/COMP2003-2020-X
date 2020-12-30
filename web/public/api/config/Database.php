<?php
	class Database {
		private $host = 'proj-mysql.uopnet.plymouth.ac.uk';
		private $name = 'COMP2003_X';
		private $username = 'COMP2003_X';
		private $password = 'TdhU553+';
		public $api_key = '8c068d98-874e-46ab-b2a1-5a5eb45a40a6';
		private $connection;

		public function connect($key) {
			if ($key == $this->api_key || $key == 'bypass') {
				$this->connection = null;

				try {
					$this->connection = new PDO('mysql:host=' . $this->host . '; dbname=' . $this->name, $this->username, $this->password);
				} catch(PDOException $e) {
					echo 'Connection Error: ' . $e->getMessage();
				}

				return $this->connection;
			} else {
				return "Error: Wrong API key.";
			}
		}
	}
?>