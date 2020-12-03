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
			$query = '';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function read() {
			$query = '';
			$command = $this->connection->prepare($query);
			$command->bindParam(1, $this->fallID);
			$command->execute();

			$row = $command->fetch(PDO::FETCH_ASSOC);

			$this->fallID = $row['fallID'];
			$this->patientID = $row['patientID'];
			$this->fall_date = $row['fall_date'];
		}

		public function readAll() {
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
	}
?>