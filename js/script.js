const newRecipeForm = document.querySelector('#new-recipe-form')

document.addEventListener('DOMContentLoaded', () => {
    loadRecipes()
})

/* ------------------------------------------------------------------------------------------------
---------- REQUÊTE POST AVEC XMLHttpRequest() -----------------------------------------------------

newRecipeForm.addEventListener("submit", function(e) {
    const formData = new FormData(newRecipeForm)
    const xhr = new XMLHttpRequest()

    xhr.open('POST', 'api.php?action=createRecipe', true)

    xhr.onload = function() {
        if(xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if(response.success) {
                alert(response.msg)
            } else {
                alert(`Erreur (${response.msg})`)
            }

        } else {
            alert('Error #00001')
        }
    }

    xhr.send(formData)
    e.preventDefault()
})
------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------
---------- REQUÊTE POST AVEC fetch ---------------------------------------------------------------- */

newRecipeForm.addEventListener("submit", async function(e) {
    e.preventDefault()
    createRecipe()
})

async function createRecipe() {
    try {
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const prepTime = document.getElementById('prep-time').value

        if(!title || !description || !prepTime) {
            alert('Veuillez remplir tous les champs.')
            return
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('preparation_time', prepTime)

        const response = await fetch('api.php?action=createRecipe', {
            method: 'POST',
            body: formData
        })

        if (!response.ok) {
            throw new Error(`Erreur d'ajout : ${response.status}`)
        }
        
        alert('Votre recette a bien été ajoutée')
        
        loadRecipes()
        clearForm()
    } catch(error) {
        console.error('Erreur :', error.message)
    }
}
/* ------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------ */

async function loadRecipes() {
    // try...catch regroupe des instructions à exécuter et définit une réponse si l'une de ces instructions provoque une exception
    try {
        // await interrompt l'exécution d'une fonction asynchrone et attend la résolution d'une promesse
        const response = await fetch('api.php?action=getRecipes')

        /*
            une promesse est un objet qui représente la complétion ou l'échec d'une opération asynchrone
        */

        // si la reponse n'est pas ok
        if (!response.ok) {
            // throw interrompt l'exécution du programme et redirige vers le 'catch' le plus proche, si il n'y en a pas, le programme est arrêté
            throw new Error(`Erreur de chargement : ${response.status}`)
        }

        const data = await response.json()
        displayRecipes(data)
    } catch(error) {
        console.error('Erreur :', error.message)
    }
}

async function deleteRecipe(id) {
    if(confirm('Voulez-vous vraiment supprimer cette recette ?')) {
        try {
            const response = await fetch(`api.php?action=deleteRecipe&id=${id}`, {
                method: 'DELETE',
            })
    
            if (!response.ok) {
                throw new Error(`Erreur de chargement : ${response.status}`)
            }
    
            loadRecipes()
        } catch(error) {
                console.error('Erreur :', error.message)
            }
    }

}

function displayRecipes(data) {
    var recipesContainer = document.querySelector('#recipes')
    recipesContainer.innerHTML = ''

    if (data.length <= 0) {
        recipesContainer.innerHTML = '<p>Aucune recette en base de données</p>'
    }

    data.forEach((recipe) => {
        const recipeElement = document.createElement('li')
        recipeElement.classList.add('recipe')

        recipeElement.innerHTML = `
            <h3>${recipe['title']}</h3>
            <p>${recipe['description']}</p>
            <p>Temps de préparation : ${recipe['preparation_time']}</p>
            <button class="delete-btn btn btn-danger" onclick="deleteRecipe(${recipe['id']})">Supprimer</button>`

        recipesContainer.appendChild(recipeElement)
    })
}

function clearForm() {
    const formFields = newRecipeForm.querySelectorAll('input')

    formFields.forEach((field) => {
        field.value = ''
    })
}