<header class="menu">
    <nav class="menuContainer">
        <a href="index.php" class="menuLogo" aria-label="start">
            <img src="assets/img/img_general/logo2.png" width="90px" height="90px" alt="icono">
        </a>
        <ul class="menuLinks">
            <?php

            if (!isset($_SESSION['admin'])) { ?>
                <li class="menuItem">
                    <a aria-label="start" href="index.php" class="menuLink"><i class="fa-solid fa-house"></i></a>
                </li>
                <li class="menuItem menuItemShow">
                    <button class="menuLinkCat" aria-label="category">
                        <p>Categorías</p><i class="fa-solid fa-angle-up" id="menuArrow"></i>
                    </button>
                    <ul class="menuNesting">
                        <li class="menuItem">
                            <?php
                            require_once 'controllers/categoryController.php';
                            $cat = new CategoryController;
                            $categories = $cat->getAllCategories();
                            foreach ($categories as $ca) : ?>
                        <li class="menuInside">
                            <button aria-label="categoryscrll" onclick=catScroll(<?php echo $ca->id_categoria ?>) class="menuLinkInside"><?php echo $ca->nombre; ?></button>
                        </li>
                    <?php
                            endforeach; ?>
                    </ul>
                </li>
                <li class="menuItem">
                    <a aria-label="offerts" href="index.php?c=client&a=showOffers&t=Ofertas" class="menuLink">Ofertas</a>
                </li>
                <li class="menuItem">
                    <button aria-label="cart" class="menuLink" id="cartShopContainer"><i class="fa-solid fa-cart-shopping" id="cartShopButton"></i></button>
                </li>
                <?php
                if (!isset($_SESSION['client'])) { ?>
                    <li class="menuItem">
                        <a aria-label="login" href="index.php?log=true&c=client&a=loginClient&t=Inicia%20sesion" class="menuLink">
                            <p>Acceder</p></i>
                        </a>
                    </li>
                    <li class="menuItem">
                        <a aria-label="register" href="index.php?c=client&a=registerClient&t=Registrate" class="menuLink">
                            <div class="menuLinkContainer">
                                <p>Registrarse</p>
                            </div>
                        </a>
                    </li>
                <?php
                } else { ?>
                    <li class="menuItem menuItemShow">
                        <a aria-label="start" href="" class="menuLink"><i class="fa-solid fa-circle-user" id="userIcon"></i></a>
                        <ul class="menuNesting">
                            <li class="menuInside">
                                <a aria-label="orders" href="index.php?c=client&a=menuClient&t=Pedidos" class="menuLinkInside">
                                    <div class="menuInsideIcons"><i class="fa-solid fa-user"></i></div>
                                </a>
                            </li>
                            <li class="menuInside">
                                <a aria-label="edit" href="index.php?c=client&a=showModifyClient&t=Editar%20Informacion" class="menuLinkInside">
                                    <div class="menuInsideIcons"><i class="fa-solid fa-gear"></i></div>
                                </a>
                            </li>
                            <li class="menuInside">
                                <a aria-label="log-out" href="index.php?&c=client&a=closeClient" class="menuLinkInside">
                                    <div class="menuInsideIcons"><i class="fa-solid fa-right-from-bracket"></div></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                <?php
                } ?>
                </li>
            <?php } else { ?>
                <li class="menuItem">
                    <a aria-label="admin" href="index.php?c=Admin&a=menuAdmin" class="menuLink"><i class="fa-solid fa-house"></i></a>
                </li>
                <li class="menuItem">
                    <a aria-label="category" class="menuLink" href="index.php?c=Admin&a=viewTableCategory&t=Categorias">Categorias</a>
                </li>
                <li class="menuItem">
                    <a aria-label="orders" class="menuLink" href="index.php?c=Admin&a=viewTableOrders&t=Pedidos">Pedidos</a>
                </li>
                <li class="menuInside">
                    <a aria-label="logout" href="index.php?c=Admin&a=closeAdmin" class="menuLinkInside">
                        <div class="menuInsideIcons"><i class="fa-solid fa-right-from-bracket"></div></i>
                    </a>
                </li>
            <?php } ?>
        </ul>
        <menu class="menuCart"><i class="fa-solid fa-cart-shopping" id="cartShopContainer2"></i></menu>
        <menu class="menuDisplay"><i class="fa-solid fa-bars" id="menuBars"></i></menu>
    </nav>
    <div class="cartModal">
        <div>
            <p class="cartModalTitle">Cesta</p>
            <p>Total: <span id="totalCart"></span></p>
        </div>
        <div class="cartModalCheckoutContainer">
            <?php
            if (isset($_SESSION['client'])) {
                try {
                    require_once "controllers/cartController.php";
                    $cartObj = new CartController;
                    $carrito = $cartObj->getCart();
                } catch (Throwable $th) {
                    var_dump($th);
                }
                foreach ($carrito as $cart) : ?>
                    <div class="cartModalDetailsContainer">
                        <img src="data:image/jpg;base64,<?php echo base64_encode($cartObj->getImage($cart->id_producto)->foto); ?>" class="cartModalImg">
                        <div>
                            <p class="cartModalProduct">
                                <?php echo ($cartObj->getProduct($cart->id_producto)->nombre); ?>
                            </p>
                            <p class="cartModalPrice" id="cartPrice<?php echo ($cart->id_producto); ?>">
                                <?php echo ($cartObj->getPrice($cart->id_producto)->precio . '€ x ' . $cart->unidades . ': <span class="cartModalPriceBold">' . ($cartObj->getPrice($cart->id_producto)->precio) * $cart->unidades . '€</span>'); ?>
                            </p>
                        </div>
                        <div id=<?php echo ($cart->id_producto); ?>></div>
                        <div class="">
                            <button onclick="restUnitCart(<?php echo ($cart->id_producto); ?>)" class="delete-btn-cart"> <i class="fa-solid fa-minus "></i></button>
                            <button onclick="sumUnitCart(<?php echo ($cart->id_producto); ?>)" class="delete-btn-cart"><i class="fa-solid fa-plus "></i></button>
                        </div>
                        <?php echo ('<button aria-label="delete" class="deleteButton' . $cart->id_producto . ' delete-btn-cart"><i class="fa-solid fa-trash-can" ></i></button>') ?>
                    </div>
                <?php endforeach;
                ?>
                <button aria-label="buy" class="cartModalButton">Comprar</button>
            <?php
            } else {
            ?>
                <p><a class="cartLink" href="index.php?log=true&c=client&a=loginClient&t=Inicia%20sesion">Inicia sesión</a> para usar la
                    cesta de la compra.</p>
            <?php } ?>
        </div>
    </div>
</header>