import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./components/layout/layout.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "app" },
  { path: "app", component: AppComponent },
  { path: "boards", component: LayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
