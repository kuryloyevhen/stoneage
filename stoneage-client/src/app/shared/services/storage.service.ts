import { Injectable } from "@angular/core";
import { Card } from "src/app/shared/interfaces/card";
import { Dwelling } from "src/app/shared/interfaces/dwelling";
import { PlayerIdentification } from "src/app/shared/interfaces/playerIdentification";
import { PlayerStatistic } from "src/app/shared/interfaces/playerStatistic";

@Injectable({
	providedIn: "root"
})
export class StorageService {
	constructor() {}
	public cardsArr: Array<Card>;
	public dwellingsArr: Array<Dwelling> = [];
	public playerName: string;
	public playersList: Array<PlayerIdentification>;
	public currentPlayerId: string = "";
	public wood: number = 0;
	public clay: number = 0;
	public stone: number = 0;
	public gold: number = 0;
	public agronomy: number = 0;
	public population: number = 0;
	public smithy: number = 0;

	public playerStatistics: PlayerStatistic = {
		wood: 0,
		clay: 0,
		stone: 0,
		gold: 0,
		agronomy: 0,
		smithy: 0,
		dwellings: {},
		civilizationCards: {},
		points: 0,
		population: 5,
		food: 12,
		id: ""
	};

	public messages: Array<string>;
}
