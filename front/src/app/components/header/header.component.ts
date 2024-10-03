import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'app/core/services/session.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isHandset: boolean = false;
  public $isLogged: Observable<boolean>;
  public isMenuOpen: boolean = false;

  constructor(
    private sessionService: SessionService,
    private breakpointObserver: BreakpointObserver
  ) { }
  
  ngOnInit(): void {
    this.$isLogged = this.sessionService.$isLogged().pipe(
      tap(isLogged => console.log('Is logged (from session service):', isLogged))
    );

    this.breakpointObserver.observe(['(max-width: 900px)']).subscribe(result => {
      this.isHandset = result.matches;
    });
  }

  openMenu() {
    this.isMenuOpen = true;
    console.log(this.isMenuOpen);
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

}
