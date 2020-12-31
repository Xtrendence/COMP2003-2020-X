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
            $query = 'SELECT answer.patientID, answer.questionID, question.question, question.question_type, question.charLim, choice.choice, answer.answer
                      FROM ' . $this->table . ', question, choice
                      INNER JOIN answer ON answer.questionID = question.questionID
                      INNER JOIN answer ON answer.questionID = choice.questionID';
			$command = $this->connection->prepare($query);
            $command->execute();

            return $command;
        }

        public function readUser($patientID) {
            $query = 'SELECT answer.patientID, answer.questionID, question.question, question.question_type, question.charLim, choice.choice, answer.answer FROM ' . $this->table . ', question, choice WHERE patientID=:id INNER JOIN answer ON answer.questionID = question.questionID INNER JOIN answer ON answer.questionID = choice.questionID';
            $command = $this->connection->prepare($query);
            $command->bindParam('anspatientID', $patientID);
            $command->execute();

            return $command;
        }

        public function read() {
        }

        public function update() {
            
        }
    }
?>