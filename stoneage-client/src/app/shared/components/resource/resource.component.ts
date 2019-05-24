import { Component, OnInit } from "@angular/core";
import { SocketService } from "src/app/shared/services/socket.service";
import { StorageService } from "../../services/storage.service";

@Component({
	selector: "app-resource",
	templateUrl: "./resource.component.html",
	styleUrls: ["./resource.component.css"]
})
export class ResourceComponent implements OnInit {
	constructor(private socket: SocketService, private storage: StorageService) {}

	ngOnInit() {}

	checkResources(eventTarget) {
		let elem = eventTarget;
		const resource = eventTarget.parentElement.parentElement.dataset.name;
		let amount: number = 0;
		while (elem && !elem.classList.contains("checked")) {
			amount++;
			elem = elem.previousSibling;
		}
		this.sendCheckedResources(resource, amount);
	}

	sendCheckedResources(resource: string, amount: number) {
		this.storage[resource] += amount;
		const data = {
			resource,
			amount,
			id: this.storage.playerStatistics.id
		};
		this.socket.move(data);
	}
}
