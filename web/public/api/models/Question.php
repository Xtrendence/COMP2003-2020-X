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
        
        public function create($patientID, $choices) {
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
            $query = 'CALL createAnswer(:questionID, :patientID, "")';
            $command = $this->connection->prepare($query);
            $command->bindParam(':questionID', $this->questionID);
            $command->bindParam(':patientID', $patientID);
            $command->execute();

            $api_key = "AAAAO3Shusw:APA91bH-FgYl74yuESuuTvlIt5vGNhbOp7vWmvr6TYAWc6FOnaB2YmJOZ64M9SMlwKDBCQz3y-qcb9hFtz1Knf9d6yF6gl_akLrgHnAXLt5hrxTdR7btBJYNRUjCmMH9rGx3rEvqB8NS";

            $query = 'SELECT fcmToken FROM patient WHERE patientID=:id';
            $command = $this->connection->prepare($query);
            $command->bindParam(':id', $patientID);
            $command->execute();

            $row = $command->fetch(PDO::FETCH_ASSOC);

            $token = $row['fcmToken'];

            $message = array("body" => "You have a new question to answer.", "title" => "New Question");
            $fields = array("to" => $token, "notification" => $message);
            $headers = array("Authorization: key=" . $api_key, "Content-Type: application/json");

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://fcm.googleapis.com/fcm/send%22");
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
            curl_exec($ch);
            curl_close($ch);
        }

        public function delete() {
            $query = 'CALL deleteQuestion(:id)';
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

        public function read($choices) {
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
                    array_push($choices, $row['choice']);
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

            $query = 'CALL deleteQuestion(:id)';
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
            $query = 'CALL createAnswer(:questionID, :patientID, "")';
            $command = $this->connection->prepare($query);
            $command->bindParam(':questionID', $this->questionID);
            $command->bindParam(':patientID', $patientID);
            $command->execute();

            $api_key = "AAAAO3Shusw:APA91bH-FgYl74yuESuuTvlIt5vGNhbOp7vWmvr6TYAWc6FOnaB2YmJOZ64M9SMlwKDBCQz3y-qcb9hFtz1Knf9d6yF6gl_akLrgHnAXLt5hrxTdR7btBJYNRUjCmMH9rGx3rEvqB8NS";

            $query = 'SELECT fcmToken FROM patient WHERE patientID=:id';
            $command = $this->connection->prepare($query);
            $command->bindParam(':id', $patientID);
            $command->execute();

            $row = $command->fetch(PDO::FETCH_ASSOC);

            $token = $row['fcmToken'];

            $message = array("body" => "An un-answered question has been updated.", "title" => "Updated  Question");
            $fields = array("to" => $token, "notification" => $message);
            $headers = array("Authorization: key=" . $api_key, "Content-Type: application/json");

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://fcm.googleapis.com/fcm/send%22");
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
            curl_exec($ch);
            curl_close($ch);
        }
    }
?>
