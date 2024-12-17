import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  // add-testimony
  addTestimonyAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }
  // add-user
  regsiterAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }

  // login-user
  loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }

  //appendToken in req header 
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  //recipe/:id/view
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
  }

  //related-recipes?cuisine=Pakistani
  relatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  // recipe/:id/download
  downloadRecipeAPI(recipeId:string, reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
  }

  // /recipe/:id/save
  saveRecipeAPI(recipeId:string, reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
  }

  // /get-saved-recipe
  getUserSaveRecipeAPI(){
    return this.http.get(`${this.server_url}/get-saved-recipes`,this.appendToken())
  }

  // /save-recipe/:id/remove
  removeSaveRecipeAPI(recipeId:string){
    return this.http.delete(`${this.server_url}/save-recipe/${recipeId}/remove`,this.appendToken())
  }

  // /user-downloads
  getUserDownloadRecipeAPI(){
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }

  //  user/edit
  editUserAPI(reqBody:any){
    return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
  }

  // all-users
  allUserAPI(){
    return this.http.get(`${this.server_url}/all-users`,this.appendToken())
  }

  // all-downloads
  allDownloadAPI(){
    return this.http.get(`${this.server_url}/all-downloads`,this.appendToken())
  }

  // all-feedbacks
  getAllFeedbackListAPI(){
    return this.http.get(`${this.server_url}/all-feedbacks`,this.appendToken())
  }

  // feedback/67514aa7eca5456fd9332119/update?status=Approved
  updateFeedbackAPI(feedBackId:string,status:string){
    return this.http.get(`${this.server_url}/feedback/${feedBackId}/update?status=${status}`,this.appendToken())
  }

  // /all-approved-feedbacks
  getAllApprovedFeedbacks(){
    return this.http.get(`${this.server_url}/all-approved-feedbacks`)
  }

  // /add-recipes
  addRecipeAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-recipes`,reqBody,this.appendToken())
  }

  // /recipe/:id/edit
  editRecipeAPI(id:string,reqBody:RecipeModel){
    return this.http.put(`${this.server_url}/recipe/${id}/edit`,reqBody,this.appendToken())
  }

  // /recipe/:id/delete
  removeRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/recipe/${id}/delete`,this.appendToken())
  }

}
