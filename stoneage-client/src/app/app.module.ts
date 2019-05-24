import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
	MatDialogModule,
	MatInputModule,
	MatButtonModule,
	MatListModule,
	MatExpansionModule,
	MatTableModule,
	MatPaginatorModule,
	MatSortModule
} from "@angular/material";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StatusPanelComponent } from "./core/components/status-panel/status-panel.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./shared/services/auth.service";
import { LoginDialogComponent } from "./core/components/login-dialog/login-dialog.component";
import { GameListComponent } from "./core/components/game-list/game-list.component";
import { RegisterFormComponent } from "./core/components/register-form/register-form.component";
import { Interceptor } from "./core/services/interceptor";
import { GameCreatorService } from "./shared/services/game-creator.service";
import { HomepageComponent } from "./core/components/homepage/homepage.component";

@NgModule({
	declarations: [
		AppComponent,
		StatusPanelComponent,
		LoginDialogComponent,
		GameListComponent,
		RegisterFormComponent,
		HomepageComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		BrowserAnimationsModule,
		MatDialogModule,
		MatInputModule,
		MatButtonModule,
		MatListModule,
		MatExpansionModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule
	],
	providers: [
		AuthService,
		GameCreatorService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: Interceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent],
	entryComponents: [
		LoginDialogComponent,
		GameListComponent,
		RegisterFormComponent
	]
})
export class AppModule {}
