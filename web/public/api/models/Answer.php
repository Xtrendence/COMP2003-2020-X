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

        }
    
        public function delete() {

        }

        public function readAll() {
            $query = 'SELECT answer.patientID, answer.questionID, question.question, question.question_type 
            FROM ' . $this->table . ' 
            INNER JOIN question ON answer.questionID = question.questionID';
            $command = $this->connection->prepare($query);
            $command->execute();

            return $command;
        }

        public function readUser($patientID) {
            $query = 'SELECT answer.patientID, answer.questionID, question.question, question.question_type 
            FROM ' . $this->table . ' 
            INNER JOIN question ON answer.questionID = question.questionID
            WHERE patientID=:id ';
            $command = $this->connection->prepare($query);
            $command->bindParam(':id', $patientID);
            $command->execute();

            return $command;
        }

        public function read() {
        }

        public function update() {
            
        }
    }
?>