<?php
    class Question {
        private $connection;
        private $table = 'question';

        public $questionID;
        public $question;
        public $question_charLim;
        public $question_type;
        public $choices;

        public function __construct($db) {
			$this->connection = $db;
        }
        
        public function create($patientID) {
            $query = 'INSERT INTO ' . $this->table . ' (question, question_type, question_charLim) VALUES (:question, :question_type, :question_carLim)';
            $command = $this->connection->prepare($query);
            $command->bindParam(':question', $this->question);
            $command->bindParam(':question_type', $this->question_type);
            $command->bindParam(':question_charLim', $this->question_charLim);
            $command->execute();
            $query = 'SELECT MAX(questionID) AS questionID FROM question';
            $command = $this->connection->prepare($query);
            $row = $command->fetch(PDO::FETCH_ASSOC);
            $this->questionID = $row['questionID'];
            if ($this->question_type != 'custom') {
                for ($i = 0; $i < count($this->choices); $i++) {
                    $query = 'INSERT INTO choice (questionID, patientID, choice) VALUES (:questionID, :patientID, :choice)';
                    $command = $this->connection->prepare($query);
                    $command->bindParam(':questionID', $this->questionID);
                    $command->bindParam(':patientID', $patientID);
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
            $query = 'DELETE FROM choice (questionID) WHERE (questionID=:id)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':id', $this->questionID);
            $command->execute();
            if ($this->question_type == 'choice') {
                $query = 'DELETE FROM ' . $this->table . ' WHERE questionID=:id';
                $command = $this->connection->prepare($query);
                $command->bindParam(':id', $this->questionID);
                $command->execute();
            }
        }

        public function readAll() {
            $query = 'SELECT * FROM ' . $this->table;
			$command = $this->connection->prepare($query);
            $command->execute();

            $query = 'SELECT * FROM choice';
            $command = $this->connection->prepare($query);
            $command->execute();

            if ($command > 0) {
                while ($row = $command->fetch(PDO::FETCH_ASSOC)) {
                    array_push($this->choices, $row['choice']);
                }
            }

            return $command;
        }

        public function readRange($from, $to) {
            $query = 'SELECT * FROM ' . $this->table . ' WHERE questionID BETWEEN :from AND :to';
			$command = $this->connection->prepare($query);
			$command->bindParam(':from', $from);
			$command->bindParam(':to', $to);
            $command->execute();

            $query = 'SELECT * FROM choice WHERE questionID BETWEEN :from AND :to';
			$command = $this->connection->prepare($query);
			$command->bindParam(':from', $from);
			$command->bindParam(':to', $to);
            $command->execute();

            if ($command > 0) {
                while ($row = $command->fetch(PDO::FETCH_ASSOC)) {
                    array_push($this->choices, $row['choice']);
                }
            }

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

            if ($command > 0) {
                while ($row = $command->fetch(PDO::FETCH_ASSOC)) {
                    array_push($this->choices, $row['choice']);
                }
            }
        }

        public function update() {

        }
    }
?>