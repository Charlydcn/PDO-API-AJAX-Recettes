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
    clearForm()

    loadRecipes()
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
    try {
        const response = await fetch(`api.php?action=deleteRecipe&id=${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error(`Erreur de chargement : ${response.status}`)
        }
    } catch(error) {
            console.error('Erreur :', error.message)
        }

}

function displayRecipes(data) {
    var recipesContainer = document.querySelector('#recipes')

    if(data.length <= 0) {
        const text = document.createElement('h2')
        text.innerHTML = 'Pas encore de recette en base de données, créez la vôtre !'

        recipesContainer.appendChild(text)
    }

    data.forEach((recipe) => {
        
        const recipeContainer = document.createElement('div')
        recipeContainer.classList.add('recipe')

        const title = document.createElement('h3')
        title.innerHTML = recipe['title']
        recipeContainer.appendChild(title)

        const description = document.createElement('p')
        description.innerHTML = recipe['description']
        recipeContainer.appendChild(description)

        const prepTime = document.createElement('p')
        prepTime.innerHTML = `Temps de préparation : ${recipe['preparation_time']} min`
        recipeContainer.appendChild(prepTime)

        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = 'Supprimer'
        deleteBtn.classList.add('btn', 'btn-danger')
        recipeContainer.appendChild(deleteBtn)

        recipesContainer.appendChild(recipeContainer)

        deleteBtn.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr(e) de vouloir supprimer cette recette ?')) {
                deleteRecipe(recipe['id'])
                loadRecipes()
            }
        })
    })
}

function clearForm() {
    const formFields = newRecipeForm.querySelectorAll('input')

    formFields.forEach((field) => {
        field.value = ''
    })
}