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
			$date = date('Y-m-d H:i:s');
			$query = 'CALL createDiaryEntry(:id, :entry)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->patientID);
			$command->bindParam(':entry', $this->entry);
			$command->execute();
		}

		public function read() {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE entryID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->entryID);
			$command->execute();

			$row = $command->fetch(PDO::FETCH_ASSOC);

			$this->entryID = $row['entryID'];
			$this->patientID = $row['patientID'];
			$this->entry_date = $row['entry_date'];
			$this->entry = $row['entry'];
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
			$query = 'SELECT * FROM ' . $this->table . ' WHERE entry_date BETWEEN :from AND :to AND patientID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':from', $from);
			$command->bindParam(':to', $to);
			$command->bindParam(':id', $this->patientID);
			$command->execute();

			return $command;
		}

		public function delete() {
			$query = 'CALL deleteDiaryEntry(:id)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->entryID);
			$command->execute();
		}
	}
?>