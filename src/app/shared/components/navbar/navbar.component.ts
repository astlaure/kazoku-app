import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  authenticated = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.profile.subscribe((value) => {
      this.authenticated = !!value;
    });
  }

  onSubmit() {
    this.authService.logout().subscribe(() => this.router.navigate(['/'], { replaceUrl: true }));
  }
}
