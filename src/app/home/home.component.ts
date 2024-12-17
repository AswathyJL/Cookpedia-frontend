import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allRecipes: any = [];
  allTestimonies:any = []

  constructor(private api: ApiService) {}

  ngOnInit(){
    this.getAllRecipes()
    this.getTestimony()
  }

  getAllRecipes() {
    this.api.getAllRecipeAPI().subscribe((res: any) => {
      this.allRecipes = res.slice(0,6);
      // console.log(this.allRecipes);
    });
  }

  getTestimony(){
    this.api.getAllApprovedFeedbacks().subscribe((res:any)=>{
      this.allTestimonies = res
      console.log(this.allTestimonies);
      
    })
  }
}
