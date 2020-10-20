import {AfterViewInit, Component} from '@angular/core';
import {ScriptService} from './scripts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'referral-rock-app';

  constructor(private scriptService: ScriptService) {
  }

  ngAfterViewInit(): void {
    this.scriptService.register([{name: 'rr', src: '//sff.referralrock.com/webpixel/beta/universalv03.js', id: 'RR_DIVID'}]);
    this.scriptService.loadScript('rr')
      .subscribe(() => {
        (window as any).rrSpace.executeEvent('conversion', {
          parameters: {
            fullname: 'asd',
            email: 'asd',
            amount: 'asd'
          }
        });
      });
  }
}
