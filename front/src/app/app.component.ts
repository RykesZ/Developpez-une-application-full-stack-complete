import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, filter, finalize, Observable, of, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { SessionService } from './core/services/session.service';
import { User } from './core/interfaces/user.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mdd-client';
  
  public onHomePage = true;
  public onLoginOrRegister = false;
  public isHandset: boolean = false;
  public isLoading = false;
  private routerSubscription: Subscription = new Subscription();
  private destroy$ = new Subject<void>();
 

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 900px)']).subscribe(result => {
      this.isHandset = result.matches;
    });

    // Surveille les événements de navigation et met à jour `onHomePage` lorsque l'URL change
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtre uniquement les événements de type NavigationEnd
    ).subscribe((event: NavigationEnd) => {
      // Met à jour la valeur de `onHomePage` en fonction de l'URL actuelle
      this.onHomePage = event.url === '/' || event.url === '';
      this.onLoginOrRegister = event.url === '/login' || event.url === '/register';
    });
  }
  
  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  ngOnDestroy(): void {
    // Désabonnement lorsque le composant est détruit pour éviter les fuites de mémoire
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  public autoLog(): void {
    const currentUrl = this.router.url;
    let token = localStorage.getItem('token');
    if (token && (currentUrl === '/' || currentUrl.includes('login') || currentUrl.includes('register'))) {
      this.isLoading = true;
      this.authService.me().pipe(
        tap((user: User) => this.sessionService.logIn(user, token)),
        catchError((error) => {
          console.error('Auto-login failed:', error);
          this.sessionService.logOut();
          return of(null);
        }),
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }
}
