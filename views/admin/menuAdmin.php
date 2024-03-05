<section class="tabla">
    <form class="admin-menu" action="index.php?c=Admin&a=postSearchProduct" method="post">
        <a href="index.php?c=Admin&a=addProduct&t=Añadir%20libro">Añadir libro</a>
        <input type="search" placeholder="Busca el nombre" name="busqueda">
    </form>
    <table class="content-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Foto</th>
                <th>Stock</th>
                <th>Categoria</th>
                <th>Editar</th>
                <th>Desactivar</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if (!empty($productList)) :
                foreach ($productList as $v) : ?>
                    <tr>
                        <td>
                            <?php echo ($v->id); ?>
                        </td>
                        <td>
                            <?php echo ($v->nombre); ?>
                        </td>
                        <td>
                            <?php echo ($v->descripcion); ?>
                        </td>
                        <td>
                            <?php echo ("$" . $v->precio); ?>
                        </td>
                        <td><img class="fotoProduct" src="data:image/jpg;base64,<?php echo base64_encode($v->foto); ?>" />
                        </td>
                        <td>
                            <?php echo ($v->stock); ?>
                        </td>
                        <td>
                            <?php
                            if ($v->id_categoria != null) {
                                echo ($v->id_categoria);
                            } else {
                                echo ("null");
                            }
                            ?>
                        </td>
                        <td>
                            <a title="Edit" href="index.php?c=Admin&a=editProduct&id=<?php echo ($v->id); ?>&t=Editar%20producto">
                                <img src="assets/img/img_icons/editar.svg" alt="Editar" height='30px'>
                            </a>
                        </td>
                        <td>
                            <?php
                            $urlEstado = "index.php?c=Admin&a=conditionProduct&id=" . $v->id;
                            if ($v->estado == 1) {
                                echo "<a title='Desactivar' href='$urlEstado'><img src='assets/img/img_icons/tick.svg' height='30px' alt='Activar'></a>";
                            } else {
                                echo "<a title='Activar' href='$urlEstado'><img src='assets/img/img_icons/x.svg' height='30px' alt='Desactivar'></a>";
                            }
                            ?>
                        </td>
                        <td>
                            <a title="Delete" href="index.php?c=Admin&a=deleteProduct&id=<?php echo ($v->id); ?>">
                                <img src="assets/img/img_icons/delete.svg" height='30px' alt="Eliminar">
                            </a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php else : ?>
                <td>No hay productos</td>
            <?php endif ?>
        </tbody>
    </table>
</section>