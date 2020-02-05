import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ServiceUserService {

	userName = "";
	idUser = "";
	userUsuario = "";	

	constructor() { }

	setUserName(valor){
		this.userName = valor;
	}

	getUserName(){
		return this.userName;
	}

	setIdUser(valor){
		this.idUser = valor;
	}

	getIdUser(){
		return this.idUser;
	}

	setUserUsuario(valor){
		this.userUsuario = valor;
	}

	getUserUsuario(){
		return this.userUsuario;
	}
}
