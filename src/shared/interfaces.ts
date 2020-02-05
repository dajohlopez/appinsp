export interface ICliente {
    id?: number;
    suministro: string;
    nombres: string;
    direccion: string;
    delectrica: string;
    rutasuministro: string;
    serie:string;
}

export interface ICorte {
    id?: number;
    estado: string;
    usuario:string;
    cliente: ICliente;
    suministro: string;
    periodo: string;
    lanterior: string;
    mdeuda: string;
    tmedidor: string;
    tconexion: string;
    estadomedidor: string;
    tipolectura: ItLectura;
    lactual: number;
    situacion: string;
    tcorte: string;
    sticker: string;
    lsticker: string;
    lugar: string;
    suministrorec: string;
    nsticker: string;
    fechast: string;
    horast: string;
    lectura: number;
    obslectura: string;
    observacion: string;
    tcortes: string;
}

export interface IEntrega {
    id?: string;
    estado: string;
    usuario:string;
    cliente: ICliente;
    suministro: string;
    tipolectura: ItLectura;
    periodo: string;
    lanterior: string;
    tmedidor: string;
    tconexion: string;
    estadomedidor: string;
    lactual: number;
    gnegocio: string;
    boletin: string;
    recibo: string;
    observacion: string;
    obslectura: string;
}

export interface ILectura {
    id?: string;
    estado: string;
    usuario:string;
    cliente: ICliente;
    suministro: string;
    periodo: string;
    lanterior: string;
    tmedidor: string;
    tipolectura: ItLectura;
    tconexion: string;
    estadomedidor: string;
    lactual: number;
    tipo: string;
    construccion: string;
    uso: string;
    tnegocio: string;
    npisos: number;
    situacion: string;
    obslectura: string;
    observacion: string;
    medidor: number;
    cablec: number;
    conectorb: number;
    curvapvc: number;
    templador: number;
    cintaa: number;
    cajap: number;
    tubof: number;
    alambre: number;
    clavos: number;
    termomagnetico: number;
    cemento: number;
    tubopcv: number;
}

export interface ItLectura {
    id?: number;
    tipolectura: string;
    codigo: string;
}

export interface IobsLectura {
    id?: number;
    observacion: string;
}

export interface Izonas {
    id?: number;
    nombre: string;
}

export interface ICoordenadas {
    lat: number;
    lng: number;
}

export interface IRutaSuministro {
    id?: number;
    nombre: string;
}

export interface Ifoto {
    foto: string;
}