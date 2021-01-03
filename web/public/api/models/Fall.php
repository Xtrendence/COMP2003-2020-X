<?php
	class Fall {
		private $connection;
		private $table = 'fall';

		public $fallID;
		public $patientID;
		public $fall_date;

		public function __construct($db) {
			$this->connection = $db;
		}

		public function create() {
			$date = date('Y-m-d H:i:s');
			$query = 'INSERT INTO ' . $this->table . ' (patientID, fall_date) VALUES (:id, "' . $date . '")';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->patientID);
			$command->execute();
		}

		public function read() {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE patientID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->fallID);
			$command->execute();

			$row = $command->fetch(PDO::FETCH_ASSOC);

			$this->fallID = $row['fallID'];
			$this->patientID = $row['patientID'];
			$this->fall_date = $row['fall_date'];
		}

		public function readAll() {
			$query = 'SELECT * FROM ' . $this->table;
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function readUser() {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE patientID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->patientID);
			$command->execute();

			return $command;
		}

		public function readDate($from, $to) {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE fall_date BETWEEN :from AND :to AND patientID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':from', $from);
			$command->bindParam(':to', $to);
			$command->bindParam(':id', $this->patientID);
			$command->execute();

			return $command;
		}

		public function delete() {
			$query = 'DELETE FROM ' . $this->table . ' WHERE fallID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->fallID);
			$command->execute();
		}
	}
?>