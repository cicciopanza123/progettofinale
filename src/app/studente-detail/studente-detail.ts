import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScuolaService } from '../services/scuola';
import { Studente, Voto, Assenza } from '../models/scuola.models';


@Component({
  selector: 'app-studente-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studente-detail.html',
  styleUrl: './studente-detail.css'
})
export class StudenteDetail implements OnInit {
  studente: Studente | null = null;
  voti: Voto[] = [];
  assenze: Assenza[] = [];
  mediaVoti: number = 0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scuolaService: ScuolaService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit() {
    const idStudente = Number(this.route.snapshot.paramMap.get('id_studente'));


    this.scuolaService.getStudente(idStudente).subscribe((data: Studente) => {
      this.studente = data;
      this.cdr.detectChanges();
    });


    this.scuolaService.getVotiStudente(idStudente).subscribe((data: Voto[]) => {
      this.voti = data;
      if (this.voti.length > 0) {
        const somma = this.voti.reduce((acc, v) => acc + v.valore, 0);
        this.mediaVoti = somma / this.voti.length;
      }
      this.cdr.detectChanges();
    });


    this.scuolaService.getAssenzeStudente(idStudente).subscribe((data: Assenza[]) => {
      this.assenze = data;
      this.cdr.detectChanges();
    });
  }


  tornaAllaClasse() {
    if (this.studente) {
      this.router.navigate(['/classi', this.studente.id_classe]);
    }
  }
}
