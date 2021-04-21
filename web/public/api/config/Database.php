<?php
	class Database {
		private $host = 'proj-mysql.uopnet.plymouth.ac.uk';
		private $name = 'COMP2003_X';
		private $username = 'COMP2003_X';
		private $password = 'TdhU553+';
		private $connection;
		private $dev_mode = true;
		private $dev_key = '8c068d98-874e-46ab-b2a1-5a5eb45a40a6';

		public function verify($credentials) {
			if ($this->dev_mode && $credentials['key'] == $this->dev_key) {
				return true;
			}

			$database = new Database();
			$db = $database->connect();

			$table = 'researcherlogin';

			if (!$this->isAdmin($credentials['key'])) {
				$table = 'patientlogin';
			}
			
			$query = 'SELECT * FROM ' . $table . ' WHERE login_status=TRUE AND login_token=:key';

			$command = $db->prepare($query);
			$command->bindParam(':key', $credentials['key']);
			$command->execute();

			if ($command->rowCount() > 0) {
				if (!$this->isExpired($credentials['key'])) {
					if (!$this->isAdmin($credentials['key'])) {
						if (array_key_exists('id', $credentials)) {
							if ($this->hasPermission($credentials['key'], $credentials['id'])) {
								return true;
							}
						}
						return false;
					}
					return true;
				} else {
					$query = 'UPDATE ' . $table . ' SET login_status = FALSE WHERE login_status=TRUE AND login_token=:key';

					$command = $db->prepare($query);
					$command->bindParam(':key', $credentials['key']);
					$command->execute();

					return false;
				}
			}
			return false;
		}

		public function isExpired($key) {
			$generated = intval(explode('$', $key)[3]);
			// 15780000 = 6 months.
			$expiry = $generated + 15780000;
			if (time() >= $expiry) {
				return true;
			}
			return false;
		}

		public function isAdmin($key) {
			return (explode('$', $key)[0] == "admin");
		}

		public function hasPermission($key, $id) {
			if ($this->isAdmin($key)) {
				return true;
			}

			return (explode('$', $key)[2] == $id);
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