import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isBurgerMenuOpen: boolean = false;

  public openBurgerMenu(): void {
    this.isBurgerMenuOpen = true;
  }

  public closeBurgerMenu(): void {
    this.isBurgerMenuOpen = false;
  }
}
