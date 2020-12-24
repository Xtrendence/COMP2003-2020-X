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

        }

        public function readUser() {

        }

        public function read() {

        }

        public function update() {
            
        }
    }
?>