import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";
import { LayoutComponent } from './layout/layout.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    LayoutComponent,
    BoardComponent,
    CardComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    LayoutComponent,
    BoardComponent,
    CardComponent,
    ListComponent,
  ]
})
export class ComponentsModule { }
