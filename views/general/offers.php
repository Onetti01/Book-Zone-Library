<?php
require_once "controllers/categoryController.php";
$cat = new CategoryController;
$categories = $cat->getAllCategories(); ?>
<div class="espace"></div>
<h1 class="catName">Mejores ofertas</h1>
<?php foreach ($categories as $ca) :
    if ($ca->estado == 1) : ?>
        <section class="container" id="<?php echo $ca->id_categoria; ?>">
            <?php if (isset($productList)) {
                foreach ($productList as $product) :
                    if ($product->estado == 1 && $product->id_categoria == $ca->id_categoria) :
            ?>
                        <section class="mainMenu">
                            <iframe onload="desplegarImagen(<?php echo ($product->id) ?>)" style="display: none">
                            </iframe>
                            <article class="gallery">
                                <div class="galleryImageContainer<?php echo ($product->id) ?> galleryImageContainer" style='background-image:url(data:image/jpg;base64,<?php echo base64_encode($product->foto); ?>);'>
                                </div>
                            </article>
                            <article class="details">
                                <h2 class="detailsAuthor">
                                    <?php echo ($product->autor); ?>
                                </h2>
                                <h2 class="detailsTitle">
                                    <?php echo ($product->nombre); ?>
                                </h2>
                                <p class="detailsDescription">
                                    <?php echo ($product->descripcion); ?>
                                </p>
                                <div class="detailsPrices">
                                    <?php
                                    if ($product->precioAnterior != null) {
                                    ?>
                                        <p class="detailsNewPrice">
                                            <?php echo ($product->precio); ?>€
                                            <span class="detailsDiscount">-
                                                <?php echo (round($product->precio / $product->precioAnterior, 2) * 100); ?>%
                                            </span>
                                        </p>
                                        <p class="detailsBeforePrice">Antes:
                                            <span class="detailsBeforeLine">
                                                <?php echo ($product->precioAnterior); ?>€
                                            </span>
                                        </p>
                                    <?php
                                    } else {
                                    ?>
                                        <p class="detailsNewPrice">
                                            <?php echo ($product->precio); ?>€
                                        </p>
                                    <?php
                                    }
                                    ?>
                                </div>
                                <iframe onload="anadirCarrito(<?php echo ($product->id); ?>)" style="display: none"></iframe>
                                <div class="detailsQuantity">
                                    <div class="detailsInput">
                                        <i class="fa-solid fa-minus detailsInputMinus" id="detailsInputMinus<?php echo ($product->id); ?>"></i>
                                        <input type="text" value="0" class="detailsInputNumber<?php echo ($product->id); ?> detailsInputNumber">
                                        <i class="fa-solid fa-plus detailsInputPlus" id="detailsInputPlus<?php echo ($product->id); ?>"></i>
                                    </div>
                                    <?php
                                    if (isset($_SESSION['client'])) {
                                        if ($product->stock > 0) {
                                            echo '<button class="detailsButton' . $product->id . ' detailsButton"><i class="fa-solid fa-cart-shopping"></i> Añadir a la cesta</button>';
                                        } else {
                                            echo '<button class="detailsButtonDisabled">No hay unidades</button>';
                                        }
                                    } else {
                                        echo '<button class="detailsButtonDisabled"><a class="cartLink" href="index.php?log=true&c=client&a=loginClient">Inicia sesión</a> para comprar</button>';
                                    }
                                    ?>
                                </div>
                            </article>
                        </section>
                        <div class="modalNoProducts">
                            <div class="modalNoProductsBox">
                                <p class="modalNoProductsP">Selecciona el número de unidades!</p>
                                <button class="modalNoProductsB">ACEPTAR</button>
                            </div>
                        </div>
                        
            <?php endif;
                endforeach;
            } ?>
        </section>
<?php endif;
endforeach; ?>
<div class="arrowUp"><button onclick="catScroll(0)" class="arrowButton"><i class="fa-solid fa-arrow-up"></i>
        <p>Volver arriba</p>
    </button></div>