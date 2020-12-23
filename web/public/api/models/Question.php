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
        
        public function create() {
            $query = 'INSERT INTO ' . $this->table . ' (question, question_type, question_charLim) VALUES (:question, :question_type, :question_carLim)';
            $command = $this->connection->prepare($query);
			$command->bindParam(':question', $this->question);
			$command->bindParam(':question_type', $this->question_type;
            $command->bindParam(':question_charLim', $this->question_charLim);
            $command->execute(); 
        }

        public function delete() {

        }

        public function readAll() {
            $query = 'SELECT * FROM ' . $this->table;
			$command = $this->connection->prepare($query);
            $command->execute();
            
            return $command;
        }

        public function readRange() {

        }

        public function read() {

        }

        public function update() {

        }
    }
?>