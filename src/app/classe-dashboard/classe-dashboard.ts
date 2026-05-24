import { Component, Type, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScuolaService } from '../services/scuola';
import { Classe, Studente, Docente } from '../models/scuola.models'; // <-- AGGIUNTO DOCENTE


@Component({
  selector: 'app-classe-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classe-dashboard.html'
})
export class ClasseDashboard implements OnInit {
  classe!: Classe;
  studenti: Studente[] = [];
  docenti: Docente[] = []; // <-- NUOVO ARRAY PER I DOCENTI


  constructor(
    private route: ActivatedRoute,
    private scuolaService: ScuolaService,
    private router: Router
  ) {}


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id_classe'));
   
    this.scuolaService.getClasseById(id).subscribe(data => this.classe = data);
    this.scuolaService.getStudentiByClasse(id).subscribe(data => this.studenti = data);
   
    // CHIAMATA PER RECUPERARE I DOCENTI DELLA CLASSE
    this.scuolaService.getDocentiByClasse(id).subscribe({
      next: (data) => this.docenti = data,
      error: (err) => console.error(err)
    });
  }


  apriStudente(id: number) { this.router.navigate(['/studenti', id]); }
 
  // NUOVA FUNZIONE DI NAVIGAZIONE VERSO IL DOCENTE
  apriDocente(id: number) { this.router.navigate(['/docenti', id]); }
 
  tornaIndietro() { this.router.navigate(['/classi']); }
}
