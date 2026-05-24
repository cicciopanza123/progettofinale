import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScuolaService } from '../services/scuola';
import { Docente } from '../models/scuola.models';


@Component({
  selector: 'app-docente-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docente-detail.html'
})
export class DocenteDetail implements OnInit {
  docente!: Docente;
  sezioni: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private scuolaService: ScuolaService
  ) {}


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id_docente'));
   
    this.scuolaService.getDocente(id).subscribe(data => this.docente = data);
    this.scuolaService.getSezioniDocente(id).subscribe(data => this.sezioni = data);
  }


  tornaIndietro() {
    window.history.back();
  }
}
