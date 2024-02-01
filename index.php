<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <title>AJAX PHP Recettes</title>
</head>
<body class="p-3">
    <h1>AJAX PHP Recettes</h1>
    <form id="new-recipe-form" method="POST">
        <div class="form-group">
            <label for="recipeTitle">Titre</label>
            <input type="text" class="form-control" id="title" name="title" placeholder="Titre de la recette">
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" id="description" name="description" placeholder="Description">
        </div>

        <div class="form-group">
            <label for="prep-time">Temps de Préparation (en minutes)</label>
            <input type="number" class="form-control" id="prep-time" name="preparation_time" placeholder="Durée (en min)">
        </div>

        <button type="submit" name="submit" id="new-recipe-btn" class="btn btn-success">Ajouter la recette</button>
    </form>

    <ul id="recipes"></ul>


    <script src="js/script.js"></script>
</body>
</html>