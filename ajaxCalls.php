
    <?php
    session_start();
    require_once "autoload.php";
    if (isset($_GET['c'])) {
        $nameController = $_GET['c'] . "Controller";
    } else {
        $nameController = "clientController";
    }
    if (class_exists($nameController)) {
        $controler = new $nameController();
        if (isset($_GET['a'])) {
            $action = $_GET['a'];
        }
        if ($action) {
            $controler->$action();
        }
    } else {
        echo "No existe el controlador";
    }
    ?>
