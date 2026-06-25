import React, { useState, useEffect, useRef } from 'react';
import "./ProductsList.css";
import { fetchProducts } from '../utils/fetchProducts';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';

const sortMap = {
    'prezzo-crescente': { sort: 'price', order: 'asc' },
    'prezzo-decrescente': { sort: 'price', order: 'desc' },
    'nome': { sort: 'name', order: 'asc' },
    'data-recente': { sort: 'updated_at', order: 'desc' }
};

function getSortFromParams(sort, order) {
    const found = Object.entries(sortMap).find(
        ([, value]) => value.sort === sort && value.order === order
    );
    return found ? found[0] : 'data-recente';
}

function ProductsList() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'all');
    const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '');
    const ALL_RARITIES = ['common', 'rare', 'legendary'];
    const [selectedRarities, setSelectedRarities] = useState(
        searchParams.get('rarity')
            ? searchParams.get('rarity').split(',')
            : []
    );
    const [sortBy, setSortBy] = useState(getSortFromParams(searchParams.get('sort'), searchParams.get('order')));


    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);


    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // evito il debounce al primo render
    const firstRender = useRef(true);
    const limit = 12;

    useEffect(() => {
        setSearchTerm(searchParams.get('search') || '');
        setCategory(searchParams.get('category') || 'all');
        setSelectedRarities(
            searchParams.get('rarity') ? searchParams.get('rarity').split(',') : []
        );
        setMinPrice(searchParams.get('min_price') || '');
        setMaxPrice(searchParams.get('max_price') || '');
        setSortBy(getSortFromParams(searchParams.get('sort'), searchParams.get('order')));
        setCurrentPage(Number(searchParams.get('page')) || 1);
    }, [searchParams]);

    useEffect(() => {
        const debounce = firstRender.current ? 0 : 500;
        firstRender.current = false;

        const timer = setTimeout(() => {
            const { sort, order } = sortMap[sortBy] || {};
            const filters = {
                page: currentPage,
                limit: limit,
            };

            if (searchTerm.trim()) filters.search = searchTerm.trim();
            if (category !== 'all') filters.category = category;
            if (minPrice) filters.min_price = minPrice;
            if (maxPrice) filters.max_price = maxPrice;
            if (sort) filters.sort = sort;
            if (order) filters.order = order;
            if (selectedRarities.length > 0) filters.rarity = selectedRarities.join(',');

            const urlParams = { ...filters };
            delete urlParams.limit;
            setSearchParams(urlParams, { replace: true });

            setIsLoading(true);
            setErrorMessage("");

            fetchProducts(filters)
                .then((data) => {
                    setProducts(data.results || []);
                    setPagination(data.pagination || null);
                })
                .catch((error) => {
                    console.error(error);
                    setErrorMessage("Errore durante il caricamento dei prodotti.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, debounce);

        return () => clearTimeout(timer);

    }, [searchTerm, category, selectedRarities, minPrice, maxPrice, sortBy, currentPage])

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    }

    function handleCategoryChange(event) {
        setCategory(event.target.value);
        setCurrentPage(1);
    }

    function handleMinPriceChange(event) {
        setMinPrice(event.target.value);
        setCurrentPage(1);
    }

    function handleMaxPriceChange(event) {
        setMaxPrice(event.target.value);
        setCurrentPage(1);
    }

    function handleSortChange(event) {
        setSortBy(event.target.value);
        setCurrentPage(1);
    }

    function handleRarityToggle(rarityValue) {
        setSelectedRarities((current) => {
            if (current.includes(rarityValue)) {
                return current.filter((r) => r !== rarityValue);
            }
            return [...current, rarityValue];
        });
        setCurrentPage(1);
    }

    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage((currentValue) => currentValue - 1);
        }
    }

    function goToNextPage() {
        if (pagination && currentPage < pagination.totalPages) {
            setCurrentPage((currentValue) => currentValue + 1);
        }
    }

    return (
        <div className="container py-5 text-ivory">
            <h1 className="page-title text-center">
                Archivio degli Equipaggiamenti
            </h1>

            <div className="filter-main-box py-5">
                <div className="filter-main-box mb-5">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label text-light">
                                Cerca per Nome
                            </label>

                            <input
                                type="text"
                                className="form-control filter-input"
                                placeholder="Es. Grimorio..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label text-light">
                                Categoria
                            </label>

                            <select
                                className="form-select filter-input"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <option value="all">Tutti i Cimeli</option>
                                <option value="armi">Armi</option>
                                <option value="accessori">Accessori</option>
                                <option value="equipaggiamento">
                                    Equipaggiamento
                                </option>
                                <option value="consumabili">Consumabili</option>
                                <option value="reliquie">Reliquie</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label text-light">
                                Range Prezzo (€)
                            </label>

                            <div className="d-flex gap-2">
                                <input
                                    type="number"
                                    className="form-control filter-input"
                                    placeholder="Min"
                                    min="0"
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                />

                                <input
                                    type="number"
                                    className="form-control filter-input"
                                    placeholder="Max"
                                    min="0"
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                />
                            </div>
                        </div>

                        <div className="col-md-2">
                            <label className="form-label text-light">
                                Ordina per
                            </label>

                            <select
                                className="form-select filter-input"
                                value={sortBy}
                                onChange={handleSortChange}
                            >
                                <option value="prezzo-crescente">
                                    Prezzo: Minore → Maggiore
                                </option>
                                <option value="prezzo-decrescente">
                                    Prezzo: Maggiore → Minore
                                </option>
                                <option value="nome">Nome: A → Z</option>
                                <option value="data-recente">Più recenti</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label text-light">
                                Rarità
                            </label>

                            <div className="rarity-toggle-group">
                                {ALL_RARITIES.map((rarityValue) => (
                                    <button
                                        key={rarityValue}
                                        type="button"
                                        className={`rarity-toggle rarity-toggle-${rarityValue} ${selectedRarities.includes(rarityValue) ? "is-active" : ""
                                            }`}
                                        onClick={() => handleRarityToggle(rarityValue)}
                                    >
                                        {rarityValue === 'common' && 'Comune'}
                                        {rarityValue === 'rare' && 'Raro'}
                                        {rarityValue === 'legendary' && 'Leggendario'}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {pagination && !isLoading && (
                    <div className="products-count mb-4">
                        <p>
                            {pagination.totalProducts} artefatti trovati — pagina{" "}
                            {pagination.currentPage} di {pagination.totalPages}
                        </p>
                    </div>
                )}

                <div className="row g-2">
                    {isLoading ? (
                        <div className="col-12 text-center py-5">
                            <p className="text-secondary">
                                Sto consultando gli archivi della Gilda...
                            </p>
                        </div>
                    ) : errorMessage ? (
                        <div className="col-12 text-center py-5">
                            <p className="text-danger">{errorMessage}</p>
                        </div>
                    ) : products.length > 0 ? (
                        products.map((product) => (
                            <div
                                className="col-12 col-sm-6 col-md-4 col-xl-3"
                                key={product.slug}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="text-center py-5 border rounded-3 bg-dark bg-opacity-25">
                                <p className="mb-2 text-secondary">
                                    Nessuna traccia di tesori qui...
                                </p>

                                <h2 className="h5 text-secondary">
                                    Il tuo incantesimo di ricerca non ha evocato nulla.
                                </h2>

                                <p className="mb-0 text-secondary">
                                    Prova a cambiare parola chiave o a espandere i
                                    criteri per trovare nuovi cimeli.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {pagination && pagination.totalPages > 1 && !isLoading && (
                    <div className="products-pagination">
                        <button
                            type="button"
                            className="products-page-button"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                        >
                            ← Precedente
                        </button>

                        <span className="products-page-info">
                            Pagina {pagination.currentPage} di {pagination.totalPages}
                        </span>

                        <button
                            type="button"
                            className="products-page-button"
                            onClick={goToNextPage}
                            disabled={currentPage === pagination.totalPages}
                        >
                            Successiva →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductsList;