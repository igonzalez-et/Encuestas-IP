<?php
if (isset($_POST['id'])) {
    $valor_id = $_POST['id'];

    $sql = "DELETE FROM nombre_tabla WHERE id = $valor_id";
    $sql->execute();

    if (mysqli_query($conn, $sql)) {
        echo "Registro eliminado exitosamente";
    } else {
        echo "Error al eliminar registro: " . mysqli_error($conn);
    }
}