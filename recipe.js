let allMealsShow = document.getElementById('all-meals')
let searchBtn = document.getElementById('search-btn')

searchBtn.addEventListener('click' , getMealList)
async function getMealList() {
    let getInput = document.getElementById("get-input").value.trim();
    let getAlert = document.getElementById('alert')
    if (getInput === "") {
        getAlert.innerText = "Please enter an ingredient";
        return;
    }

    allMealsShow.innerHTML = "";
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${getInput}`)
    let data = await res.json()
    console.log(data.meals)

    let getMeals = data.meals
    if (!getMeals) { 
        getAlert.innerText = 'No meals found!'
        return;
    }

    getAlert.innerText = ''
    getMeals.forEach(meal => {
        console.log(meal)
        let div = document.createElement('div')
        div.className = "card bg-base-100 shadow-sm"
        div.innerHTML = `
        <figure class="px-10 pt-10">
                <img src=${meal.strMealThumb} alt="Shoes"
                    class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${meal.strMeal}</h2>
                <div class="card-actions">
                    <button onclick="showRecipe('${meal.idMeal}')" class="btn bg-orange-600 text-white">Get Recipe</button>
                </div>
            </div>
        `
        allMealsShow.appendChild(div)
    });
}
// getMealList()

async function showRecipe(id) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let data = await res.json()
    let recipe = data.meals[0]
    let modalContent = document.getElementById("modal-content");
    // console.log(show)
    modalContent.innerHTML = `
            <div class="modal-box">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 class="text-lg font-bold">Hello!</h3>
                <p class="py-4">${recipe.strInstructions}</p>
            </div>
    `
    my_modal_3.showModal()
}