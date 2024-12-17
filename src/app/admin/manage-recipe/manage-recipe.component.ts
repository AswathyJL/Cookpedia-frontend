import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  @Input() id !: string

  recipeDetails:RecipeModel = {}
  cuisineArray:any = []
  mealTypeArray:any = []
  ingredients:any = []
  instructions:any = []
  mealArray:any = []

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      if(this.id){
        this.recipeDetails = res.find((item:any)=>item._id==this.id)
        this.ingredients = this.recipeDetails.ingredients
        this.instructions = this.recipeDetails.instructions
        this.mealArray = this.recipeDetails.mealType
      }
      res.forEach((item:any)=>{
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
      })
      // console.log(this.cuisineArray);
      const dummyMeal = res.map((item:any)=>item.mealType)
      // console.log(dummyMeal.flat(Infinity));
      const flatDummyArray = dummyMeal.flat(Infinity)
      flatDummyArray.forEach((item:any)=>{
        !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
      })
      
    })
  }

  addIngredients(ingredientInput:any){
    if(ingredientInput.value){
      this.ingredients.push(ingredientInput.value)
      ingredientInput.value=""
      console.log(this.ingredients);
      
    }
  }

  removeIngredients(value:string){
    this.ingredients = this.ingredients.filter((item:string)=>item!=value)
  }

  addInstruction(instructionInput:any){
    if(instructionInput.value){
      this.instructions.push(instructionInput.value)
      instructionInput.value=""
      console.log(this.instructions);
      
    }
  }

  removeInstruction(value:string){
    this.instructions = this.instructions.filter((item:string)=>item!=value)
  }

  mealTypeSelect(event:any){
    if(event?.target.checked){
      !this.mealArray.includes(event.target.name) && this.mealArray.push(event.target.name)
    }
    else{
      this.mealArray = this.mealArray.filter((item:string)=>item!=event.target.name)
    }
    console.log(this.mealArray);
    
  }

  removeMealtype(meal:string){
    this.mealArray = this.mealArray.filter((item:string)=>item!=meal)
  }

  addRecipe(){
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    console.log(this.recipeDetails);
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails

    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0)
    {
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next:(res:any)=>{
          alert(`${this.recipeDetails.name} has been added to the recipe collection`)
          this.recipeDetails = {}
          this.ingredients = []
          this.instructions = []
          this.mealArray = []
          this.router.navigateByUrl("/admin/recipe-list")
        },
        error:(reason:any)=>{
          alert(reason.error)
          this.recipeDetails.name = ""
        }
      })
    }
    else
    {
      alert("Please fill the form correctly!!!")
    }
    
  }

  editRecipe(){
      this.recipeDetails.ingredients = this.ingredients
      this.recipeDetails.instructions = this.instructions
      this.recipeDetails.mealType = this.mealArray
      console.log(this.recipeDetails);
      const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails
  
      if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0)
      {
        this.api.editRecipeAPI(this.id,this.recipeDetails).subscribe((res:any)=>{
          alert(`${this.recipeDetails.name} has been successfully updated!!!`)
          this.recipeDetails = {}
          this.ingredients = []
          this.instructions = []
          this.mealArray = []
          this.router.navigateByUrl("/admin/recipe-list")
          
        })

      }
      else
      {
        alert("Please fill the form correctly!!!")
      }
      
    }
}
