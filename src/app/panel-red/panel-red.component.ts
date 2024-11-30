import { Component} from '@angular/core';


@Component({
  selector: 'app-panel-red',
  templateUrl: './panel-red.component.html',
  styleUrls: ['./panel-red.component.css']
})
export class PanelRedComponent{

constructor(){
  alert("Panel Red")
}

}
