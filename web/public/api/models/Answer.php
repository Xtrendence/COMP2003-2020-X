<?php
	class Answer {
		private $connection;
		private $table = 'answer';

		public $answerID;
		public $questionID;
		public $patientID;
		public $answer;

		public function __construct($db) {
			$this->connection = $db;
		}
		
		public function create() {
			$query = 'CALL createAnswer(:questionID, :patientID, :answer)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':questionID', $this->questionID);
			$command->bindParam(':patientID', $this->patientID);
			$command->bindParam(':answer', $this->answer);
			$command->execute();
		}
		
		public function delete() {
			$query = 'CALL deleteAnswer(:id)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->answerID);
			$command->execute();
		}

		public function readAll() {
			$query = 'SELECT answer.answerID, answer.patientID, answer.questionID, answer.answer, question.question, question.question_type, question.question_charLim
			FROM ' . $this->table . ' 
			INNER JOIN question ON answer.questionID = question.questionID';
			$command = $this->connection->prepare($query);
			$command->execute();

			return $command;
		}

		public function readRange($from, $to) {
			$query = 'SELECT answer.answerID, answer.patientID, answer.questionID, answer.answer, question.question, question.question_type, question.question_charLim
			FROM ' . $this->table . ' 
			INNER JOIN question ON answer.questionID = question.questionID
			WHERE answer.questionID BETWEEN :from AND :to';
			$command = $this->connection->prepare($query);
			$command->bindParam(':from', $from);
			$command->bindParam(':to', $to);
			$command->execute();

			return $command;
		}

		public function readUser($patientID) {
			$query = 'SELECT answer.answerID, answer.patientID, answer.questionID, answer.answer, question.question, question.question_type, question.question_charLim
			FROM ' . $this->table . ' 
			INNER JOIN question ON answer.questionID = question.questionID
			WHERE patientID=:id ';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $patientID);
			$command->execute();

			return $command;
		}

		public function read($answerID) {
			$query = 'SELECT answer.patientID, answer.questionID, answer.answer, question.question, question.question_type 
			FROM ' . $this->table . ' 
			INNER JOIN question ON answer.questionID = question.questionID
			WHERE answerID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $answerID);
			$command->execute();

			return $command;
		}

		public function update() {
			$query = 'CALL updateAnswer(:answerID, :answer)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':answerID', $this->answerID);
			$command->bindParam(':answer', $this->answer);
			$command->execute();
		}
	}
?>