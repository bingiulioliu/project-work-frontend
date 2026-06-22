//searchpage

import React, { useState } from 'react';
import './catalogo.css';

function Catalogo() {
    //I filtri sono pronti per quando serviranno
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('recenti');

    return (
        <div className="container  py-5  text-ivory">
            <h1 className="page-title text-center ">Archivio degli Equipaggiamenti</h1>

            <div className="filter-main-box py-5">
                <div className="filter-main-box mb-5">
                    <div className="row g-3">


                        <div className="col-md-4">
                            <label className="form-label text-light">Cerca per Nome</label>
                            <input
                                type="text"
                                className="form-control filter-input"
                                placeholder="Es. Grimorio..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}




                            />

                        </div>


                        <div className="col-md-3">
                            <label className="form-label text-light">Categoria</label>
                            <select
                                className="form-select filter-input"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="all">Tutti i Cimeli</option>
                                <option value="casa">Casa</option>
                                <option value="sport">Sport</option>
                                <option value="altro">Altro</option>
                            </select>
                        </div>


                        <div className="col-md-3">
                            <label className="form-label text-light">Range Prezzo (oro)</label>
                            <div className="d-flex gap-2">
                                <input
                                    type="number"
                                    className="form-control filter-input"
                                    placeholder="Min"
                                    min="0"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                                <input
                                    type="number"
                                    className="form-control filter-input"
                                    placeholder="Max"
                                    min="0"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                        </div>


                        <div className="col-md-2">
                            <label className="form-label text-light">Ordina per</label>
                            <select
                                className="form-select filter-input"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="prezzo-crescente">Prezzo: Minore</option>
                                <option value="prezzo-decrescente">Prezzo: Maggiore</option>
                                <option value="nome">Nome (A-Z)</option>
                            </select>
                        </div>

                    </div>
                </div>


                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">

                    {/* CARD DI PROVA 1 */}
                    <div className="col">
                        <div className="item-card">
                            <div className="card-inner-border">
                                <div className="card-thumb-area">

                                    <img src="./public/img/img di prova.jpg" alt="Tazza Artigianale" className="card-thumb-img" />
                                </div>
                                <div className="card-info-area text-center">
                                    <h3 className="item-card-title">Bastone da scalata </h3>
                                    <p className="item-card-subtitle text-light">Ti rende la scalata più leggera ma ti fa invecchiare precocemente.</p>
                                    <p className="item-card-price">24.90 oro</p>

                                    <div className="d-flex gap-2 justify-content-center mt-3">
                                        <button className="btn-amber-action flex-grow-1">
                                            Aggiungi al Carrello
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Catalogo;