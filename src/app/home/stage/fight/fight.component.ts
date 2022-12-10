import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { pixiService } from 'src/app/service/pixi.service';
import { gameStage, baseMap, GlobalConstants } from 'src/app/share/models';
import { baseCardMode, fightMode, fightStatusMode } from 'src/app/share/models';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import * as PIXI from 'pixi.js';
//import { Sprite } from 'pixi.js';

@Component({
	selector: 'app-fight',
	templateUrl: './fight.component.html',
	styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {
	public disableNavbar = true;
	public fightData: fightMode;
	@ViewChild("fightGrid") allCardDiv: ElementRef;

	renderer: PIXI.Application;
	enemyBase: PIXI.Container = new PIXI.Container();
	fightGround: PIXI.Container = new PIXI.Container();
	myBase: PIXI.Container = new PIXI.Container();
	myInfo: PIXI.Container = new PIXI.Container();
	myCards: PIXI.Container = new PIXI.Container();
	popupBase: PIXI.Container = new PIXI.Container();
	baseCardWidth: number;
	baseMultiplier: number;
	closeResult = '';
	windowInnerWidth = Math.round(window.innerWidth * 0.99);
	windowInnerHeight = Math.round(window.innerHeight) - 66;


	iconMagic: string = GlobalConstants.imageURL + '/icons/magic.svg';
	iconDefense: string = GlobalConstants.imageURL + '/icons/defense.svg';

	iconCards = PIXI.Sprite.from(GlobalConstants.imageURL + '/icons/cards.png');
	iconHealth = PIXI.Sprite.from(GlobalConstants.imageURL + '/icons/heart.png');

	constructor(
		private apiService: ApiService,
		private pixiService: pixiService,
		private translateService: TranslateService
	) { }

	ngOnInit() {// Fetching
		this.apiService.getFight$().subscribe((next) => {
			setTimeout(() => {
				this.fightData = next['fight'];
				console.log(this.fightData);				
				this.drawBase();
			}, 0);
		});
	}

	drawBase() {
		if (this.windowInnerWidth < 600) {
			this.baseCardWidth = 80;
			this.baseMultiplier = 2;
		} else if (this.windowInnerWidth < 1200) {
			this.baseCardWidth = 120;
			this.baseMultiplier = 3;
		}
		else if (this.windowInnerWidth < 2000) {
			this.baseCardWidth = 160;
			this.baseMultiplier = 4;
		}
		else {
			this.baseCardWidth = 200;
			this.baseMultiplier = 5;
		}
		this.renderer = new PIXI.Application({
			width: this.windowInnerWidth, height: this.windowInnerHeight, backgroundColor: 0xffffff,
			autoDensity: true,
			resolution: window.devicePixelRatio,
			backgroundAlpha: 0,
		});
		if (this.fightData.stageData.currentStage == 0) {
			this.drawCardInitBase();
		} else {
			this.drawFight();
		}
		this.allCardDiv.nativeElement.appendChild(this.renderer.view);
	}
	drawCardInitBase() {
		const pageTitleText = new PIXI.Text(this.translateService.instant('gameBase.selectInitCards'),
			{
				fontSize: this.baseMultiplier * 16,
				fill: "#333333",
				align: 'center',
				lineJoin: 'round',
			});
		pageTitleText.anchor.set(0.5);
		pageTitleText.position.set(this.windowInnerWidth / 2, this.baseMultiplier * 40);
		this.popupBase.addChild(pageTitleText);
		this.renderer.stage.addChild(this.popupBase);
		let cardSelectContainer: PIXI.Container;
		cardSelectContainer = this.drawCardsMultiSelect(this.fightData.myHandCards, this.renderer, this.baseCardWidth * 1.5, this.windowInnerWidth, this.fightData.myHandCards.length);

		cardSelectContainer.position.set(0, this.baseMultiplier * 60);
		this.popupBase.addChild(cardSelectContainer);
	}

	drawCardsMultiSelect(cards: Array<baseCardMode>, pixi: PIXI.Application, cardWidth: number, screenWidth: number, maxSelect: number, haveToSelect = false) {
		const cardSelectContainer = new PIXI.Container();
		let result: number[] = [];
		//left indent
		let currentX = cardWidth / 4, currentY = 0;

		for (let i of cards.keys()) {
			if (i < maxSelect) {
				result[i] = 1;
			} else {
				result[i] = 0;
			}
		}
		for (let key of cards.keys()) {
			let cardWithButtonContainer = new PIXI.Container();
			let cardContainer = this.pixiService.drawCard(cards[key], cardWidth);
			cardContainer.cursor = 'pointer';
			cardContainer.position.set(currentX, currentY);
			cardContainer.on('pointerdown', () => {
				this.pixiService.onClickGetLargeWithoutButton(cards[key], pixi, cardWidth, screenWidth);
			});
			cardWithButtonContainer.addChild(cardContainer);
			const iconCheckbox_checkedTexture = PIXI.Texture.from(GlobalConstants.imageURL + '/icons/checkbox_checked.png');
			const iconCheckbox_uncheckedTexture = PIXI.Texture.from(GlobalConstants.imageURL + '/icons/checkbox_unchecked.png');

			let iconCheckbox: PIXI.Sprite;
			if (result[key]) {
				iconCheckbox = new PIXI.Sprite(iconCheckbox_checkedTexture)
			} else {
				iconCheckbox = new PIXI.Sprite(iconCheckbox_uncheckedTexture)
			}
			iconCheckbox.scale.set(cardWidth / 400);
			iconCheckbox.interactive = true;
			iconCheckbox.cursor = 'pointer';
			iconCheckbox.on('pointerdown', () => {
				if (result[key] == 1) {
					result[key] = 0;
					iconCheckbox.texture = iconCheckbox_uncheckedTexture;
				} else {
					result[key] = 1;
					iconCheckbox.texture = iconCheckbox_checkedTexture;
				}
			});

			iconCheckbox.position.set(currentX + cardWidth / 2 - cardWidth / 8, currentY + cardWidth);

			cardWithButtonContainer.addChild(iconCheckbox);

			currentX += cardWidth;
			if ((currentX + cardWidth) > screenWidth - cardWidth / 4) {
				currentX = cardWidth / 4;
				currentY += cardWidth * 1.5
			}
			cardSelectContainer.addChild(cardWithButtonContainer);
		}
		//Add submit button		
		const confirmButton = new PIXI.Graphics();
		confirmButton.beginFill(0x0c753f);
		confirmButton.drawRoundedRect(this.baseCardWidth * 2.5 - 50, currentY + cardWidth * 1.5, 100, 30, 10);
		confirmButton.endFill();
		confirmButton.interactive = true;
		confirmButton.cursor = 'pointer';
		const confirmText = new PIXI.Text(this.translateService.instant('common.confirm'),
			{
				fontFamily: "Hiragino Sans GB",
				fontSize: 12,
				fill: "white",
				align: 'center',
				strokeThickness: 1,
				dropShadow: true,
				dropShadowColor: '#aaaaaa',
				dropShadowBlur: 2,
				dropShadowAngle: Math.PI / 6,
				dropShadowDistance: 4,
				wordWrap: true,
				wordWrapWidth: 440,
				lineJoin: 'round',
			});
		confirmText.anchor.set(0.5)
		confirmText.position.set(this.baseCardWidth * 2.5, currentY + cardWidth * 1.5 + 15);
		confirmButton.addChild(confirmText);
		confirmButton.on('pointerdown', () => {
			this.apiService
				.postSelectCards$(result)
				.subscribe((next) => {
					setTimeout(() => {
						if (next.hasOwnProperty('error')) {
						} else {
							//try to delete all and reload the base
							this.renderer.stage.removeChildren();
							this.drawFight();
						}
					}, 0);
				});
		});
		cardSelectContainer.addChild(confirmButton);
		return cardSelectContainer;
	}

	drawFight()
	{
		this.drawEnemyBase();
		
	}

	drawFightGround()
	{
		//this.fightGround

	}

	drawEnemyBase() {
		this.iconHealth.anchor.set(0.5);
		this.iconHealth.scale.set(0.25);
		this.iconHealth.x = this.baseMultiplier * 20;
		this.iconHealth.y = this.baseMultiplier * 10;

		this.iconCards.anchor.set(0.5);
		this.iconCards.scale.set(0.25);
		this.iconCards.x = this.baseMultiplier * 60 + this.baseMultiplier * 20;
		this.iconCards.y = this.baseMultiplier * 10;

		//enemy health
		const enemyHealthText = new PIXI.Text(this.fightData.enemyStatus.currentHP,
			{
				fontSize: this.baseMultiplier * 12,
				fill: "#333333",
				align: 'center',
				lineJoin: 'round',
			});
		enemyHealthText.anchor.set(0.5);
		enemyHealthText.position.set(this.baseMultiplier * 40, this.baseMultiplier * 10);
		enemyHealthText.name = 'currentHp';

		const enemyCardsText = new PIXI.Text(this.fightData.enemyStatus.cardLeft,
			{
				fontSize: this.baseMultiplier * 12,
				fill: "#333333",
				align: 'center',
				lineJoin: 'round',
			});
		enemyCardsText.anchor.set(0.5);
		enemyCardsText.position.set(this.baseMultiplier * 100, this.baseMultiplier * 10);
		enemyCardsText.name = 'cardLeft';

		this.enemyBase.addChild(this.iconHealth);
		this.enemyBase.addChild(enemyHealthText);
		this.enemyBase.addChild(this.iconCards);
		this.enemyBase.addChild(enemyCardsText);

		this.renderer.stage.addChild(this.enemyBase);
	}

	updateEnemyCurrentHP()
	{
		let currentHPText :PIXI.Text;
		currentHPText= this.enemyBase.getChildByName("currentHp");
		currentHPText.text = this.fightData.enemyStatus.currentHP;	
	}
}
