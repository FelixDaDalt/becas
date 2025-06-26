import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class ExportarExcelService {

  constructor() { }


  exportarExcel<T>(
    data: T[],
    columnas: { key: keyof T | string; label: string }[],
    nombreArchivo: string
  ): void {
    const datosFormateados = data.map(item => {
      const fila: any = {};
      columnas.forEach(col => {
        const partes = String(col.key).split('.');
        const valor = partes.reduce((acc: any, part: string) => acc?.[part], item);
        fila[col.label] = valor;
      });
      return fila;
    });

    const worksheet = XLSX.utils.json_to_sheet(datosFormateados);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${nombreArchivo}.xlsx`);
  }
}
