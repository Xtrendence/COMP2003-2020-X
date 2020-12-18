<?php
    class Question {
        private $connection;
        private $table = 'question';

        public $questionID;
        public $question;
        public $question_charlim
        public $question_type;

        public function __construct($db) {
			$this->connection = $db;
		}
    }
?>