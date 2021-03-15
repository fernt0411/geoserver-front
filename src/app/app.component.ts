import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as L from 'leaflet';
import { Observable } from 'rxjs';
import { FilterPipe } from './Filterpipe.pipe';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'geoportal';
  map: any;
  path: string = "http://localhost:8080/geoserver/PASLCN/wms?"
  layers:any = {}
  layersUi: any[] = []
  OpFondo: any
  baseMaps: any;
  searchField: FormControl;
  filteredLayers: Observable<any[]>;
  constructor() {
    this.searchField = new FormControl();
    this.filteredLayers = new Observable

  }
  ngOnInit(): void {
 

    this.OpFondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    this.baseMaps = {
      "Mapa Open stret": this.OpFondo
    };
  }

  onObservableSearch(): void {
    this.filteredLayers = this.searchField.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filter(value))
    )
  }
  filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.layersUi.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  ngAfterViewInit(): void {

    this.map = L.map('map').setView([-12, -77], 9);
    this.getLayers()
    this.onObservableSearch()
    L.control.layers(this.baseMaps, this.layers).addTo(this.map);
  }

  getLayers(): void {
    this.layersUi.push(
      {
        id: "areas de conservacion regional",
        name: "areas de conservacion regional",
        wms: null
      },
      {
        name: "areas_drenaje",
        id: "areas_drenaje",
        wms: null
      },
      {
        name: "colector_primario",
        id: "colector_primario",
        wms: null
      },
      {
        name: "comunidades campesinas",
        id: "comunidades campesinas",
        wms: null
      },
      {
        name: "derechos_mineros",
        id: "derechos_mineros",
        wms: null
      },
      {
        name: "inventario peligros-movimientos en masa-ingemmet",
        id: "inventario peligros-movimientos en masa-ingemmet",
        wms: null
      },
      {
        name: "limite_distrital_mi",
        id: "limite_distrital_mi",
        wms: null
      },
      {
        name: "mc_sitios arqueologicos",
        id: "mc_sitios arqueologicos",
        wms: null
      },
      {
        name: "predios rurales",
        id: "predios rurales",
        wms: null
      },
      {
        name: "proyectos_paslc",
        id: "proyectos_paslc",
        wms: null
      },
      {
        name: "pueblos_cofopri",
        id: "pueblos_cofopri",
        wms: null
      },
      {
        name: "reservorio",
        id: "reservorio",
        wms: null
      },
      {
        name: "sectores_distribucion",
        id: "sectores_distribucion",
        wms: null
      },
      {
        name: "tuberia_primaria",
        id: "tuberia_primaria",
        wms: null
      },

    )

    this.layersUi.forEach(layer => {
      layer.wms = L.tileLayer.wms(this.path, {
        layers: layer.name,
        format: 'image/png',
        transparent: true,
      });
      var name = layer.name
      this.layers[name] = layer.wms
    });

  }

}
