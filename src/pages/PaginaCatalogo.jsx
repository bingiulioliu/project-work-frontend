import React, { useState, useEffect, useRef } from 'react';
import "./PaginaCatalogo.css";
import { fetchProducts } from '../utils/fetchProducts';
import ProductCard from '../components/ProductCard';

const sortMap = {
    'prezzo-crescente': { sort: 'price', order: 'asc' },
    'prezzo-decrescente': { sort: 'price', order: 'desc' },
    'nome': { sort: 'name', order: 'asc' },
    'data-recente': { sort: 'updated_at', order: 'desc' }
};

function Catalogo() {

    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('data-recente');

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // evito il debounce al primo render
    const firtRender = useRef(true);

    useEffect(() => {
        const debounce = firtRender.current ? 0 : 500;
        firtRender.current = false;

        const timer = setTimeout(() => {
            const { sort, order } = sortMap[sortBy] || {};

            const filters = {};
            if (searchTerm.trim()) filters.search = searchTerm.trim();
            if (category !== 'all') filters.category = category;
            if (minPrice) filters.min_price = minPrice;
            if (maxPrice) filters.max_price = maxPrice;
            if (sort) filters.sort = sort;
            if (order) filters.order = order;

            setIsLoading(true);
            fetchProducts(filters)
                .then(setProducts)
                .finally(() => setIsLoading(false));
        }, debounce);

        return () => clearTimeout(timer);
    }, [searchTerm, category, minPrice, maxPrice, sortBy])

    return <>
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
                                <option value="prezzo-crescente">Prezzo: Minore → Maggiore</option>
                                <option value="prezzo-decrescente">Prezzo: Maggiore → Minore</option>
                                <option value="nome">Nome: A → Z</option>
                                <option value="data-recente">Data: Più recente</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div className="row g-2">
                    {isLoading ? (
                        <div className="col-12 text-center py-5">
                            <p className="text-secondary">Sto consultando gli archivi della Gilda...</p>
                        </div>
                    ) : products.length > 0 ? (
                        products.map((product) => (
                            <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={product.slug}>
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="text-center py-5 border rounded-3 bg-dark bg-opacity-25">
                                <p className="mb-2 text-secondary">Nessuna traccia di tesori qui...</p>
                                <h2 className="h5 text-secondary">Il tuo incantesimo di ricerca non ha evocato nulla.</h2>
                                <p className="mb-0 text-secondary">Prova a cambiare parola chiave o a espandere i criteri per trovare nuovi cimeli.</p>
                            </div>
                        </div>
                    )}
                </div>


            </div>
        </div>
    </>;
}

export default Catalogo;