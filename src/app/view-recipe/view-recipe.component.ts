import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
// for downloading the recipe pdf
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

  recipeId:string = ""
  recipe:any = {}
  allRelatedRecipes:any =[]

  constructor(private route:ActivatedRoute,private api:ApiService){}

  ngOnInit(){
    this.route.params.subscribe((res:any)=>{
      this.recipeId = res.id
      console.log(this.recipeId);
      this.getRecipeDetails(this.recipeId)
    })
  }

  getRecipeDetails(recipeId: string) {
    this.api.viewRecipeAPI(recipeId).subscribe(
      (res: any) => {
        this.recipe = res;
        this.getAllRelatedRecipes(res.cuisine);
      },
      (error: any) => {
        if (error.status === 401) {
          console.error('Unauthorized access. Please log in again.');
          // Redirect user to login or display a message
        } else {
          console.error('Error fetching recipe details:', error);
        }
      }
    );
  }

  getAllRelatedRecipes(cuisine:string){
    console.log(`inside getAllRecipeDetails`);

    this.api.relatedRecipeAPI(cuisine).subscribe((res:any)=>{
      if(res.length>1){
        this.allRelatedRecipes = res.filter((item:any)=>item.name!=this.recipe.name)
        console.log(this.allRelatedRecipes);
      }else{
        this.allRelatedRecipes = []
      }      
    })
  }

  downloadRecipe(){
    this.api.downloadRecipeAPI(this.recipeId, this.recipe).subscribe((res:any)=>{
      this.generatePDF()
    })

  }

  // generate pdf
  generatePDF(){
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine : ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings : ${this.recipe.servings}`,10,25)
    pdf.text(`Cuisine : ${this.recipe.difficulty}`,10,30)
    pdf.text(`Preparation Time : ${this.recipe.prepTimeMinutes}`,10,35)
    pdf.text(`Cooking Time : ${this.recipe.cookTimeMinutes}`,10,40)
    pdf.text(`Total Calorie Per Servings : ${this.recipe.caloriePerServing}`,10,45)

    let head = [['Ingredients Needed','Cooking Instructions']]
    let body = []
    body.push([this.recipe.ingredients, this.recipe.instructions])
    autoTable(pdf,{head, body, startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')
  }

  saveRecipe(){
    this.api.saveRecipeAPI(this.recipeId,this.recipe).subscribe({
      next:(res:any)=>{
        alert("Recipe added to your Collection!!!")
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }
  

}