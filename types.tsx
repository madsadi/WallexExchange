export type DataLoad={
    message:string,
    success:string,
    result:{
        symbols:{string:Currency}
    }
}

export type Currency={
    symbol:string,
    baseAsset:string,
    faBaseAsset:string,
    faQuoteAsset:string,
    faName:string,
    quoteAsset:string,
    stats:{
        '7d_ch':number,
        '24h_ch':number,
        '24h_volume':string,
        lastPrice:string,
        '24h_highPrice':string,
        '24h_lowPrice':string
    }
}
