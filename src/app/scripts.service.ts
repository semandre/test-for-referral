import { Injectable } from '@angular/core';
import { forkJoin, Observable, Observer } from 'rxjs';

export interface Script {
  name: string;
  src: string;
  id?: string;
}

export interface LoadedScript {
  script: string;
  loaded: boolean;
  status: string;
}

declare var document: any;

@Injectable({providedIn: 'root'})
export class ScriptService {
  private scripts: {[name: string]: {loaded: boolean, src: string, id?: string}} = {};

  register(scripts: Script[]): void {
    scripts.forEach((script: Script) => this.scripts[script.name] = {loaded: false, src: script.src, id: script.id ?? ''});
  }

  loadAll(scripts: string[]): Observable<LoadedScript[]> {
    return forkJoin(scripts.map(name => this.loadScript(name)));
  }

  loadScript(name: string): Observable<LoadedScript> {
    return new Observable<LoadedScript>((observer: Observer<LoadedScript>) => {
      if (this.scripts[name].loaded) { // resolve if already loaded
        observer.next({script: name, loaded: true, status: 'Already Loaded'});
      } else {
        const script = document.createElement('script'); // load script

        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.id = this.scripts[name].id;
        if (script.readyState) {  // IE
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              observer.next({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {  // Other browsers
          script.onload = () => {
            this.scripts[name].loaded = true;
            observer.next({script: name, loaded: true, status: 'Loaded'});
          };
        }
        script.onerror = (error: any) => observer.error({err: {script: name, loaded: false, status: 'Loaded'}});
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }
}
