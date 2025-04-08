import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  email = '';
  password = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);

          const token = response.data?.token;
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(response.data?.user));
        },
        error: (err) => {
          console.error('Login error:', err);
        }
      });
    }
  }

}
