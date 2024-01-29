import { Component, Input, OnInit } from '@angular/core';
import { BreadCrum } from '../services/breadcrumb.service';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
  providers: [BreadCrum],
})
export class BreadcrumbComponent implements OnInit {
  constructor(private breadCrumbService: BreadCrum) {}

  showBread() {
    this.breadCrumbService.getBread();
  }

  ngOnInit(): void {}
}
