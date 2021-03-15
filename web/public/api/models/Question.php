<?php
    class Question {
        private $connection;
        private $table = 'question';

        public $questionID;
        public $question;
        public $question_charLim;
        public $question_type;

        public function __construct($db) {
			$this->connection = $db;
        }
        
        public function create($patientID) {
            $query = 'CALL createQuestion(:question, :question_charLim, :question_type)'; 
            $command = $this->connection->prepare($query);
            $command->bindParam(':question', $this->question);
            $command->bindParam(':question_type', $this->question_type);
            $command->bindParam(':question_charLim', $this->question_charLim);
            $command->execute();
            
            $query = 'SELECT MAX(questionID) AS questionID FROM question';
            $command = $this->connection->prepare($query);
            $command->execute();
            $row = $command->fetch(PDO::FETCH_ASSOC);
            $this->questionID = $row['questionID'];
            if ($this->question_type != 'custom') {
                for ($i = 0; $i < count($this->choices); $i++) {
                    $query = 'CALL createChoice(:questionID, :choice)';
                    $command = $this->connection->prepare($query);
                    $command->bindParam(':questionID', $this->questionID);
                    $command->bindParam(':choice', $this->choices[$i]);
                    $command->execute();
                } 
            }
            $query = 'INSERT INTO answer (questionID, patientID, answer) VALUES (:questionID, :patientID, "")';
            $command = $this->connection->prepare($query);
            $command->bindParam(':questionID', $this->questionID);
            $command->bindParam(':patientID', $patientID);
            $command->execute();
        }

        public function delete() {
            $query = 'CALL deleteQuestion (:id)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->questionID);
            $command->execute();
        }

        public function readAll() {
			$query = 'SELECT * FROM ' . $this->table;
			$command = $this->connection->prepare($query);
            $command->execute();

            return $command;
        }

        public function readRange($from, $to) {
			$query = 'SELECT * FROM ' . $this->table . ' WHERE questionID BETWEEN :from AND :to';
			$command = $this->connection->prepare($query);
			$command->bindParam(':from', $from);
			$command->bindParam(':to', $to);
            $command->execute();

			return $command;
        }

        public function read() {
            $query = 'SELECT * FROM ' . $this->table . ' WHERE questionID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->questionID);
			$command->execute();

			$result = $command->fetch(PDO::FETCH_ASSOC);

			$this->questionID = $result['questionID'];
			$this->question = $result['question'];
			$this->question_charLim = $result['question_charLim'];
            $this->question_type = $result['question_type'];

            $query = 'SELECT * FROM choice WHERE questionID=:id';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->questionID);
            $command->execute();

            if ($command->rowCount() > 0) {
                while ($row = $command->fetch(PDO::FETCH_ASSOC)) {
                    array_push($this->choices, $row['choice']);
                }
            }
        }

        public function update($choices) {
            $query = 'SELECT patientID FROM answer WHERE questionID=:id';
            $command= $this->connection->prepare($query);
            $command->bindparam(':id', $this->questionID);
            $command->execute();

            $patientID = $command->fetch(PDO::FETCH_ASSOC);
            json_encode($patientID);

            $query = 'CALL deleteQuestion (:id)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->questionID);
            $command->execute();

            $query = 'CALL createQuestion(:question, :question_charLim, :question_type)'; 
            $command = $this->connection->prepare($query);
            $command->bindParam(':question', $this->question);
            $command->bindParam(':question_type', $this->question_type);
            $command->bindParam(':question_charLim', $this->question_charLim);
            $command->execute();
            
            $query = 'SELECT MAX(questionID) AS questionID FROM question';
            $command = $this->connection->prepare($query);
            $command->execute();
            $row = $command->fetch(PDO::FETCH_ASSOC);
            $this->questionID = $row['questionID'];
            if ($this->question_type != 'custom') {
                for ($i = 0; $i < count($choices); $i++) {
                    $query = 'CALL createChoice(:questionID, :choice)';
                    $command = $this->connection->prepare($query);
                    $command->bindParam(':questionID', $this->questionID);
                    $command->bindParam(':choice', $choices[$i]);
                    $command->execute();
                } 
            }
            $query = 'INSERT INTO answer (questionID, patientID, answer) VALUES (:questionID, :patientID, "")';
            $command = $this->connection->prepare($query);
            $command->bindParam(':questionID', $this->questionID);
            $command->bindParam(':patientID', $patientID);
            $command->execute();
        }
    }
?>