<?php
    class Question {
        private $connection;
        private $table = 'question';

        public $questionID;
        public $question;
        public $question_charlim;
        public $question_type;

        public function __construct($db) {
			$this->connection = $db;
        }
        
        public function create() {

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