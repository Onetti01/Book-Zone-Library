<?php
require_once("database.php");
class Admin
{
    private $admin;
    private $password;
    private $pdo;

    public function __construct()
    {
        $this->pdo = (new Database)->connect();
    }
    public function getAdmin()
    {
        return $this->admin;
    }
    public function setAdmin($admin): void
    {
        $this->admin = $admin;
    }
    public function getPassword()
    {
        return $this->password;
    }
    public function setPassword($password): void
    {
        $this->password = $password;
    }
    public function loginAuth()
    {
        $sql = "SELECT * FROM administrador WHERE admin = '{$this->getAdmin()}' AND password = '{$this->getPassword()}'";
        $login = $this->pdo->query($sql);
        if ($login && $login->rowCount() == 1) {
            return $login->fetch()['admin'];
        }
        return false;
    }
}
?>