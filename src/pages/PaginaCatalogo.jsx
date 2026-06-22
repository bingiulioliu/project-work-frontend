import React, { useState } from 'react';
import "./PaginaCatalogo.css";
import { fetchProducts } from '../utils/fetchProducts';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function Catalogo() {
    //I filtri sono pronti per quando serviranno
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('recenti');

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, []);

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

                <div className="row g-2">
                    {products.map((product) => (
                        <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={product.slug}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}

export default Catalogo;