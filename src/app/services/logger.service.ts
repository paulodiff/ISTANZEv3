import { Injectable } from '@angular/core';
import { DialogService } from './dialog.service';
import { Router } from '@angular/router';

@Injectable()
export class Logger {

    constructor(
        private dialogService: DialogService,
        private router: Router
    ) {  }

  logs: string[] = []; // capture logs for testing

  log(message: string) {
    this.logs.push(message);
    console.log('Logger:---------------------------');
    console.log(message);
  }

  assert( ...args: any[] ) : void {}
  error( ...args: any[] ) : void {}
  group( ...args: any[] ) : void {}
  groupEnd( ...args: any[] ) : void {}
  info( ...args: any[] ) : void {}
  warn( ...args: any[] ) : void {}
  dialog(...args: any[] ) : void {

    console.log(args);
    this.dialogService
    .confirm('Confirm Dialog', args[0])
    .then(res => { console.log('Dialog return:', res); })
    .catch( function(err) { console.log(err); });
  }

  errorDialog(...args: any[] ) : void {
        console.log(args.length);
        console.log(args);
        let msg = this.buildMessage(args[0]);
        this.dialogService
        .error('Errore : ' + msg.title , msg.message)
        .then(res => { 
            console.log('Dialog return:', res); 
            // this.router.navigate(['/login'], {});
            return false;
            })
        .catch( function(err) { console.log(err); });
    }

    private buildMessage( msg: any) : any {
        console.log('buildMessage', msg);
        let title =  '' +  msg.status +  ' - ' + msg.statusText + '';
        let out = '';
        if( msg._body ) {
            let bodyParsed = JSON.parse(msg._body);
            /* console.log('buildMessage1', bodyParsed);
            console.log('buildMessage1', msg._body);
            console.log('buildMessage2', msg._body.title);
            console.log('buildMessage3', msg._body.message); */
            title = bodyParsed.title;
            out = bodyParsed.message + '(' +  msg.status +  ' - ' + msg.statusText + ')';
        }
        console.log(out);
        return {title : title, message : out} ;
    }
}
