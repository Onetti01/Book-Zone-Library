<div class="menuMoreInfo">
    <h2 class="detailsAuthor">
        <?php echo ($product['autor']); ?>
    </h2>
    <h2 class="detailsTitle">
        <?php echo ($product['nombre']); ?>
    </h2>
    <article class="gallery">
        <div class="galleryImageContainerMoreInfo" style=' background-image:url(data:image/jpg;base64,<?php echo base64_encode($product['foto']); ?>);'>
        </div>
    </article>
    <article class="details">
        <h2 class="detailsAuthor">
            <?php
            $db = new Database;
            $query = $db->db->prepare("SELECT nombre FROM categoria WHERE id_categoria LIKE '" . $product['id_categoria'] . "';");
            $query->execute();
            print($query->fetchAll(PDO::FETCH_OBJ)[0]->nombre);
            ?>
        </h2>
        <p class="detailsDescriptionInfo">
            <?php echo ($product['descripcion']); ?>
        </p>
        <?php
        if ($product['stock'] > 10) {
            echo '<p class="classStock">En stock.</p>';
        } else if ($product['stock'] < 5 && $product['stock'] > 0) {
            echo '<p class="classStock">Últimas unidades.</p>';
        } else {
            echo '<p class="classStock">No disponible.</p>';
        }
        ?>
    </article>
</div>