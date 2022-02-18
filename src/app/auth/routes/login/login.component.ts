import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  submitError = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitError = false;
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/transactions'], { replaceUrl: true });
        },
        error: () => {
          this.submitError = true;
        },
      })
  }
}
