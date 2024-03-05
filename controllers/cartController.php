<?php
require_once "models/cart.php";
class CartController
{
    public function addToCart()
    {
        if (isset($_GET["product"])) {
            $client = $_SESSION["client"];
            $product = $_GET["product"];
            $number = $_GET["number"];
            $cart = new Cart($client, $product, $number);
            $cart->saveToCart();
            echo '<script>window.location.replace("index.php")</script>';
        } else {
            header('Location: index.php');
        }
    }
    public function getCart()
    {
        $client = $_SESSION["client"];
        $cart = new Cart($client);
        return $cart->getFullCart();
    }
    public function getProduct($id)
    {
        $cart = new Cart();
        return $cart->getProductName($id);
    }
    public function getImage($id)
    {
        $cart = new Cart();
        return $cart->getProductImage($id);
    }
    public function getPrice($id)
    {
        $cart = new Cart();
        return $cart->getProductPrice($id);
    }

    public function addToCartProduct()
    {
        $client = $_SESSION["client"];
        $cart = new Cart($client);

        $res=$cart->sumOne($_GET["id"]);

        $json_response = json_encode(array(
            "message" => $res
        ));

        header('Content-Type: application/json');

        echo $json_response;
    }

    public function removeToCartProduct()
    {
        $client = $_SESSION["client"];
        $cart = new Cart($client);

        $res=$cart->restOne($_GET["id"]);

        $json_response = json_encode(array(
            "message" => $res
        ));

        header('Content-Type: application/json');

        echo $json_response;
    }

    public function deleteCartProduct()
    {
        $client = $_SESSION["client"];
        $cart = new Cart($client);

        $res=$cart->deleteCart($_GET["id"]);

        $json_response = json_encode(array(
            "message" => $res
        ));

        header('Content-Type: application/json');

        echo $json_response;
    }
}
