import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Plans } from './features/plans/plans';
import { Contact } from './features/contact/contact';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: Home },
	{ path: 'about', component: About },
	{ path: 'plans', component: Plans },
	{ path: 'contact', component: Contact },
];
