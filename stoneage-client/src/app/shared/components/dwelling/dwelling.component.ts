import { Component, OnInit, ElementRef } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { StorageService } from "src/app/shared/services/storage.service";
import { SocketService } from "src/app/shared/services/socket.service";
import { DwellingDialogComponent } from "src/app/shared/components/dwelling-dialog/dwelling-dialog.component";
import { Dwelling } from "src/app/shared/interfaces/dwelling";

@Component({
	selector: "app-dwelling",
	templateUrl: "./dwelling.component.html",
	styleUrls: ["./dwelling.component.css"]
})
export class DwellingComponent implements OnInit {
	constructor(
		private elemRef: ElementRef,
		private dialog: MatDialog,
		private storage: StorageService,
		private socket: SocketService
	) {}

	private elem = this.elemRef.nativeElement;
	public index: number;
	private dwellings: Array<Dwelling> = [];
	public dwelling: Dwelling;
	public humanPlace: HTMLElement;
	public isDisabled = {
		0: true,
		1: true,
		2: true,
		3: true
	};

	ngOnInit() {
		this.index = Number(this.elem.dataset.id);
		this.humanPlace = this.elem.getElementsByClassName(
			"human-place"
		)[0] as HTMLElement;
		switch (this.index) {
			case 0:
				this.dwellings = this.storage.dwellingsArr.slice(0, 7);
				break;
			case 1:
				this.dwellings = this.storage.dwellingsArr.slice(7, 14);
				break;
			case 2:
				this.dwellings = this.storage.dwellingsArr.slice(14, 21);
				break;
			case 3:
				this.dwellings = this.storage.dwellingsArr.slice(21, 28);
				break;
		}
		this.dwelling = this.dwellings[0];
		this.socket.getMovement().subscribe(res => {
			if (res.dwelling === this.index) {
				if (res.playerId === this.storage.playerStatistics.id) {
					this.isDisabled[res.dwelling] = false;
				}
				this.humanPlace.dataset.owner = res.playerId;
				this.humanPlace.classList.add("checked");
			}
		});
		this.socket.getReturn().subscribe(res => {
			if (res.index === this.index) {
				this.humanPlace.dataset.owner = "";
				this.humanPlace.classList.remove("checked");
				this.dwellings.shift();
				this.dwelling = this.dwellings[0];
			}
		});
	}

	checkDwelling() {
		const data = {
			amount: 1,
			dwelling: this.index,
			playerId: this.storage.playerStatistics.id
		};
		this.socket.move(data);
	}

	openDialog() {
		let dialogConfig = new MatDialogConfig();
		dialogConfig = {
			disableClose: true,
			autoFocus: true,
			width: "300px",
			height: "300px"
		};
		dialogConfig.data = {
			amount: this.index + 1,
			card: this.dwelling,
			index: this.index
		};
		const dialogRef = this.dialog.open(DwellingDialogComponent, dialogConfig);
		dialogRef.afterClosed().subscribe();
	}
}
