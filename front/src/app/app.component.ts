import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mdd-client';

  public onHomePage = true;
  private routerSubscription: Subscription = new Subscription();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // Surveille les événements de navigation et met à jour `onHomePage` lorsque l'URL change
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtre uniquement les événements de type NavigationEnd
    ).subscribe((event: NavigationEnd) => {
      // Met à jour la valeur de `onHomePage` en fonction de l'URL actuelle
      this.onHomePage = event.url === '/' || event.url === '';
    });
  }

  ngOnDestroy(): void {
    // Désabonnement lorsque le composant est détruit pour éviter les fuites de mémoire
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
