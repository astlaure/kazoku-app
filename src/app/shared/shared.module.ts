import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
  ]
})
export class SharedModule { }
