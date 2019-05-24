import { Component, OnInit, ElementRef } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { StorageService } from "../../services/storage.service";
import { Card } from "src/app/shared/interfaces/card";
import { SocketService } from "../../services/socket.service";
import { CardDialogComponent } from "src/app/shared/components/card-dialog/card-dialog.component";

@Component({
	selector: "app-civilization-card",
	templateUrl: "./civilization-card.component.html",
	styleUrls: ["./civilization-card.component.css"]
})
export class CivilizationCardComponent implements OnInit {
	constructor(
		private elemRef: ElementRef,
		private storage: StorageService,
		private socket: SocketService,
		public dialog: MatDialog
	) {}

	public elem: HTMLElement = this.elemRef.nativeElement;
	public card: Card;
	public index: number;
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
		this.card = this.storage.cardsArr[this.index];
		this.socket.getMovement().subscribe(res => {
			if (res.card === this.index) {
				if (res.playerId === this.storage.playerStatistics.id) {
					this.isDisabled[res.card] = false;
				}
				this.humanPlace.dataset.owner = res.playerId as string;
				this.humanPlace.classList.add("checked");
			}
		});
	}

	checkCard() {
		const data = {
			amount: 1,
			card: this.index,
			playerId: this.storage.playerStatistics.id
		};
		this.socket.move(data);
	}

	takeCard() {
		let dialogConfig = new MatDialogConfig();
		dialogConfig = {
			disableClose: true,
			autoFocus: true,
			width: "300px",
			height: "300px"
		};
		dialogConfig.data = {
			amount: this.index + 1,
			card: this.card
		};
		const dialogRef = this.dialog.open(CardDialogComponent, dialogConfig);
		dialogRef.afterClosed().subscribe();
	}
}
