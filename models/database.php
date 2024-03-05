<?php
$envFile = __DIR__ . DIRECTORY_SEPARATOR . '../.env'; 

if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        list($key, $value) = explode('=', $line, 2);
        putenv("$key=$value");
    }
}

class Database
{
    public $db;

    public function __construct()
    {
        $servername = getenv('DB_HOST');
        $dbname = getenv('DB_NAME');
        $username = getenv('DB_USER');
        $password = getenv('DB_PASSWORD');

        //crearemos una nueva conexión instanciando el objeto PDO
        $this->db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        //establecemos el modo PDO error a exception para poder recuperar las excepciones
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function connect()
    {
        return $this->db;
    }
}

// Uso de la clase Database
$database = new Database();
$dbConnection = $database->connect();
