<?php
	class DiaryEntry {
		private $connection;
		private $table = 'diaryentry';

		public $entryID;
		public $patientID;
		public $entry_date;
		public $entry;

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
	}
?>