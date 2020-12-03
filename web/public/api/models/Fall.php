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