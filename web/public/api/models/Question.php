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
        
        public function create() {
            if ($this->question_type == 'custom') {
                $query = 'INSERT INTO ' . $this->table . ' (question, question_type, question_charLim) VALUES (:question, :question_type, :question_carLim)';
                $command = $this->connection->prepare($query);
                $command->bindParam(':question', $this->question);
                $command->bindParam(':question_type', $this->question_type);
                $command->bindParam(':question_charLim', $this->question_charLim);
                $command->execute();
            } else {
                for ($i = 0; $i <= count($this->choices); $i++) {
                    $query = 'INSERT INTO choice (questionID, choice) VALUES (:questionID, :choice)';
                    $command = $this->connection->prepare($query);
                    $command->bindParam(':questionID', $this->questionID);
                    $command->bindParam(':choice', $this->choices[$i]);
                    $command->execute();
                }
            }
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

			$row = $command->fetch(PDO::FETCH_ASSOC);

			$this->questionID = $row['questionID'];
			$this->question = $row['question'];
			$this->question_charLim = $row['question_charLim'];
            $this->question_type = $row['question_type'];
            $this->choices = $row['choices'];
        }

        public function update() {

        }
    }
?>