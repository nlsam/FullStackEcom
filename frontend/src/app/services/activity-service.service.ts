import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityServiceService {

  public active$: Subject<boolean> = new Subject();
  public inactive$: Subject<boolean> = new Subject();

  isInactive=false;
  private countDown;

  constructor() { 
     // Possible Events
     fromEvent(document, 'mousemove').subscribe(()=> this.OnActivity());
     fromEvent(document, 'touchstart').subscribe(()=> this.OnActivity());
     fromEvent(document, 'keydown').subscribe(()=> this.OnActivity());

  }
  OnActivity(): void {
    if(this.isInactive){
      this.isInactive = false;
      this.active$.next(true);
    }

    clearTimeout(this.countDown);
    this.countDown= setTimeout(()=>{
      this.isInactive=true;
      this.inactive$.next(true);
       }, 30000)
    
  }
}
