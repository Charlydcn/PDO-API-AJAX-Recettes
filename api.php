<?php

try {
    $pdo = new PDO('mysql:host=localhost;dbname=recettes', 'root', '');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

if (isset($_GET['action'])) {
    switch($_GET['action']){

        case "getRecipes":
            $stmt = $pdo->query(
                'SELECT id, title, description, preparation_time
                FROM recette
                ORDER BY id DESC');
                
            $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($recipes);
            break;

        case "createRecipe":
            $response = [];
            
            $title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $description = filter_input(INPUT_POST, "description", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $preparationTime = filter_input(INPUT_POST, "preparation_time", FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_VALIDATE_INT);

            $response['title'] = $title;
            $response['description'] = $description;
            $response['preparation_time'] = $preparationTime;

            if ($title && strlen($title) <= 75 && $description && strlen($description) <= 65535 && $preparationTime) {
                $sql = "INSERT INTO recette (title, description, preparation_time)
                        VALUES (:title, :description, :preparation_time)";

                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':title', $title);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':preparation_time', $preparationTime);

                $stmt->execute();
            }

            echo json_encode($response);
            break;
            
        case "deleteRecipe":
            $id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_VALIDATE_INT);

            if ($id) {
                $sql = "DELETE recette
                        FROM recette
                        WHERE id = :id";

                $stmt = $pdo->prepare($sql);
                $stmt->execute([':id' => $id]);
            }
            break;
    }
}



/*

$query = 'SELECT * FROM recette';
$recettesStmt = $pdo->prepare($query);
$recettesStmt->execute();
$recettes = $recettesStmt->fetchAll();

INSERT INTO `recettes`.`recette` (`title`, `description`, `preparation_time`) VALUES ('test', 'test', '12');

*/

?>