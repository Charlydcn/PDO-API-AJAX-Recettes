<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="css/style.css">
    <title>AJAX PHP Recettes</title>
</head>
<body>
    <h1>AJAX PHP Recettes</h1>
    <button id="show-new-recipe-form-btn">
        <i class="fa-solid fa-circle-plus"></i>
    </button>

    <form id="new-recipe-form" class="container" method="POST">
        <div class="grid">
            <div>
                <label for="recipeTitle">Titre</label>
                <input type="text" id="title" name="title" placeholder="Titre de la recette">
            </div>
    
            <div>
                <label for="description">Description</label>
                <input type="text" id="description" name="description" placeholder="Description">
            </div>
        </div>

        <div>
            <label for="prep-time">Temps de Préparation</label>
            <input type="number" id="prep-time" name="preparation_time" placeholder="Durée">
            <small>(En minutes)</small>
        </div>

        <button type="submit" name="submit" id="new-recipe-btn">Ajouter la recette</button>
    </form>

    <ul id="recipes" class="container-fluid"></ul>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="js/script.js"></script>
</body>
</html>