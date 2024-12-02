import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedRecipeComponent } from './saved-recipe/saved-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { PnfComponent } from './pnf/pnf.component';

export const routes: Routes = [
    // http://localhost:4200/
    {
        path:"", component:HomeComponent, title:"Home"
    },
    // http://localhost:4200/about
    {
        path:"about", component:AboutComponent, title:"About"
    },
    // http://localhost:4200/contact
    {
        path:"contact", component:ContactComponent, title:"Contact"
    },
    // http://localhost:4200/login
    {
        path:"login", component:LoginComponent, title:"Login"
    },
    // http://localhost:4200/register
    {
        path:"register", component:RegisterComponent, title:"Register"
    },
    // http://localhost:4200/all-recipes
    {
        path:"all-recipes", component:RecipesComponent, title:"All Recipes"
    },
    // http://localhost:4200/profile
    {
        path:"profile", component:ProfileComponent, title:"Profile"
    },
    // http://localhost:4200/save-recipe
    {
        path:"save-recipe", component:SavedRecipeComponent, title:"Save Recipes Collection"
    },
    // http://localhost:4200/recipe/:id/view
    {
        path:"recipe/:id/view", component:ViewRecipeComponent, title:"View Recipe"
    },
    // http://localhost:4200/*
    {
        path:"**", component:PnfComponent, title:"Page Not Found"
    },
];
