import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink], 
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent {

  // create a property to store array of saved recipes
  allRecipes:any = []
  // apiservice dependency inject
  constructor(private api:ApiService){}
  // call the function inside ngOnInit
  ngOnInit(){
    this.getAllSavedRecipes()
  }
  
  // define a function for callilng saverecipe api using api service
  getAllSavedRecipes(){
    this.api.getUserSaveRecipeAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
    })
  }

  deleteSavedRecipe(recipeId:string){
    console.log('inside deletesavedrecipe');
    
    this.api.removeSaveRecipeAPI(recipeId).subscribe((res:any)=>{
      this.getAllSavedRecipes()
    })
  }
}
