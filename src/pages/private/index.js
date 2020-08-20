
import React from 'react'  // rfce
import { Route, Switch } from 'react-router-dom' // imbrc

// komponent halaman private
import Pengaturan from './pengaturan'
import Produk from './produk'
import Transaksi from './transaksi'
import Home from './home'

function Private() {
    return (
        <Switch>
            <Route path="/pengaturan" component={Pengaturan} />
            <Route path="/produk" component={Produk}/>
            <Route path="/transaksi" component={Transaksi}/>
            <Route path="/" component={Home} />
        </Switch>
    )
}

export default Private
