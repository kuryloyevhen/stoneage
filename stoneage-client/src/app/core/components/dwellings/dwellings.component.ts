import { Component, OnInit, ElementRef } from "@angular/core";

@Component({
	selector: "app-dwellings",
	templateUrl: "./dwellings.component.html",
	styleUrls: ["./dwellings.component.css"]
})
export class DwellingsComponent implements OnInit {
	constructor(private elemRef: ElementRef) {}

	private elem: HTMLElement = this.elemRef.nativeElement as HTMLElement;
	private dwellings: Array<HTMLElement>;

	ngOnInit() {
		this.dwellings = Array.from(
			this.elem.getElementsByClassName("dwelling-card")
		) as Array<HTMLElement>;
		this.dwellings.forEach((elem: HTMLElement, index: number) => {
			elem.dataset.id = String(index);
		});
	}
}
