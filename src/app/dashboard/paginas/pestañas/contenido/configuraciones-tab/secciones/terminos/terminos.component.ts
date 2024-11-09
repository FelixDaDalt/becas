
import { Component, OnDestroy} from '@angular/core';
import { Editor, toDoc, Toolbar, Validators } from 'ngx-editor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { toHTML } from 'ngx-editor';

import { TerminosService } from 'src/servicios/terminos.service';
import { tyc } from 'src/standalone/terminos/tyc';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})
export class TerminosComponent implements OnDestroy{
  formulario:FormGroup
  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  constructor(private fb:FormBuilder, private tycService:TerminosService){
    this.editor = new Editor();
    this.formulario = this.fb.group({
      editorContent: [null, Validators.required]
    });
  }


  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  guardar(){
    if(this.formulario.valid){
      const jsonDoc = this.formulario.get('editorContent')?.value
      const tyc = {contenido:toHTML(jsonDoc)};
      this.tycService.enviarTyc(tyc).subscribe()
    }
  }

  recibirTyc(tycHistorial:tyc){
    const tyc = toDoc(tycHistorial.contenido);
    this.formulario.setValue({
      editorContent: tyc
    });
  }
}
