import React, { useState, useEffect, useMemo } from 'react';
import "./PaginaCatalogo.css";
import { fetchProducts } from '../utils/fetchProducts';
import ProductCard from '../components/ProductCard';

function Catalogo() {
    //I filtri sono pronti per quando serviranno
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('data-recente');

    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const sortProducts = (items) => {
        const sorted = [...items];

        switch (sortBy) {
            case 'prezzo-crescente':
                return sorted.sort((a, b) => Number(a.price) - Number(b.price));
            case 'prezzo-decrescente':
                return sorted.sort((a, b) => Number(b.price) - Number(a.price));
            case 'nome':
                return sorted.sort((a, b) =>
                    String(a.name).localeCompare(String(b.name), undefined, { sensitivity: 'base' })
                );
            case 'data-recente': {
                const getTimestamp = (item) => {
                    const date = item.date || item.createdAt || item.updatedAt;
                    return date ? new Date(date).getTime() : 0;
                };
                return sorted.sort((a, b) => getTimestamp(b) - getTimestamp(a));
            }
            default:
                return sorted;
        }
    };

    const displayedProducts = useMemo(() => sortProducts(searchResults), [searchResults, sortBy]);

    // Carica i prodotti all'avvio
    useEffect(() => {
        fetchProducts().then((data) => {
            setProducts(data);
            setSearchResults(data);
        });
    }, []);

    // Debounce della ricerca: filtra dopo mezzo secondo di inattività
    useEffect(() => {
        const timer = setTimeout(() => {
            const term = searchTerm.trim().toLowerCase();

            if (term === '') {
                setSearchResults(products);
            } else {
                setSearchResults(
                    products.filter(product =>
                        product.name.toLowerCase().includes(term)
                    )
                );
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, products]);

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
                                <option value="prezzo-crescente">Prezzo: Minore → Maggiore</option>
                                <option value="prezzo-decrescente">Prezzo: Maggiore → Minore</option>
                                <option value="nome">Nome: A → Z</option>
                                <option value="data-recente">Data: Più recente</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div className="row g-2">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
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
    );
}

export default Catalogo;