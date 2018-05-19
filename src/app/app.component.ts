import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor() {
	}

	startButton: boolean = false;
	stopButton: boolean = true;

	sec = 55;
	min = 59;
	hour = 23;


	ngOnInit() {

	}

	mytimer;

	ittimer = {
		hour: this.hour,
		min: this.min,
		sec: this.sec
	};

	start(ittimer) {
		this.stopButton = false;
		this.startButton = true;
		
		console.log(typeof (this.ittimer.hour));
		console.log(this.ittimer.hour + ':' + this.ittimer.min + ':' + this.ittimer.sec);



		this.mytimer = timer(1000, 1000)
			.pipe(map(() => ++this.ittimer.sec))
			.subscribe((i) => {
				this.ittimer.sec = i;
				if (this.ittimer.sec === 60) {
					this.ittimer.sec = 0;
					this.ittimer.min++;
				}
				if (this.ittimer.min === 60) {
					this.ittimer.min = 0;
					this.ittimer.hour++;
				}
				if(this.ittimer.hour == 24 && this.ittimer.min == 0 && this.ittimer.sec == 0) {
					this.ittimer.hour = 0;
					this.ittimer.min = 0;
					this.ittimer.sec = 0;
					this.stopButton = true;
					this.startButton = false;
					return this.mytimer.unsubscribe();
				}
				console.log(this.ittimer);
			});


	}

	stop(ittimer) {
		this.stopButton = true;
		this.startButton = false;
		return this.mytimer.unsubscribe();

	}

	wait(ittimer) {
		return this.mytimer.unsubscribe();
	}

	reset(ittimer) {
		this.stopButton = true;
		this.startButton = false;
		if (this.ittimer.hour != 0) {
			this.ittimer.hour = 0;
		}
		if (this.ittimer.min != 0) {
			this.ittimer.min = 0;
		}
		if (this.ittimer.sec != 0) {
			this.ittimer.sec = 0;
		}
		this.mytimer.unsubscribe();
	}
}
