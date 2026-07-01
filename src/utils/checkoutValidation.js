const MAX_NAME_LENGTH = 80;
const MAX_ADDRESS_LENGTH = 150;
const MAX_CITY_LENGTH = 80;
const MAX_NOTES_LENGTH = 500;
const MAX_PRODUCTS = 100;
const MAX_QUANTITY_PER_PRODUCT = 99;

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ'\-\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function normalizeText(value) {
    return String(value ?? "")
        .trim()
        .replace(/\s{2,}/g, " ");
}

function toInteger(value) {
    const parsed = Number(value);
    return Number.isInteger(parsed) ? parsed : null;
}

export function sanitizeCheckoutForm(formData) {
    return {
        customer_name: normalizeText(formData?.customer_name),
        customer_address: normalizeText(formData?.customer_address),
        customer_city: normalizeText(formData?.customer_city),
        customer_postal_code: String(formData?.customer_postal_code ?? "")
            .replace(/\D/g, "")
            .slice(0, 5),
        telephone_number: String(formData?.telephone_number ?? "")
            .replace(/\D/g, "")
            .slice(0, 11),
        mail: normalizeText(formData?.mail).toLowerCase(),
        notes: normalizeText(formData?.notes),
    };
}

export function emptyCheckoutErrors() {
    return {
        customer_name: "",
        customer_address: "",
        customer_city: "",
        customer_postal_code: "",
        telephone_number: "",
        mail: "",
        notes: "",
    };
}

export function validateCheckoutField(field, value) {
    const safeValue = String(value ?? "").trim();

    switch (field) {
        case "customer_name": {
            if (!safeValue) {
                return "Nome e cognome obbligatori.";
            }
            if (safeValue.length < 3) {
                return "Il nome deve contenere almeno 3 caratteri.";
            }
            if (safeValue.length > MAX_NAME_LENGTH) {
                return `Il nome non puo superare ${MAX_NAME_LENGTH} caratteri.`;
            }
            if (!NAME_REGEX.test(safeValue)) {
                return "Il nome contiene caratteri non ammessi.";
            }
            const words = safeValue.split(" ").filter(Boolean);
            if (words.length < 2) {
                return "Inserisci almeno nome e cognome (2 parole).";
            }
            return "";
        }

        case "mail": {
            if (!safeValue) {
                return "Email obbligatoria.";
            }
            if (!EMAIL_REGEX.test(safeValue.toLowerCase())) {
                return "Inserisci una email valida (es. nome@dominio.it).";
            }
            return "";
        }

        case "telephone_number": {
            const digits = String(value ?? "").replace(/\D/g, "");
            if (!digits) {
                return "Telefono obbligatorio.";
            }
            if (digits.length < 9 || digits.length > 11) {
                return "Il telefono deve contenere tra 9 e 11 cifre.";
            }
            if (!/^((39)?3\d{8,9}|0\d{8,9})$/.test(digits)) {
                return "Numero di telefono italiano non valido.";
            }
            return "";
        }

        case "customer_postal_code": {
            const digits = String(value ?? "").replace(/\D/g, "");
            if (!digits) {
                return "CAP obbligatorio.";
            }
            if (!/^\d{5}$/.test(digits)) {
                return "Il CAP deve contenere 5 cifre.";
            }
            return "";
        }

        case "customer_address": {
            if (!safeValue) {
                return "Indirizzo obbligatorio.";
            }
            if (safeValue.length < 5) {
                return "L'indirizzo deve contenere almeno 5 caratteri.";
            }
            if (safeValue.length > MAX_ADDRESS_LENGTH) {
                return `L'indirizzo non puo superare ${MAX_ADDRESS_LENGTH} caratteri.`;
            }
            return "";
        }

        case "customer_city": {
            if (!safeValue) {
                return "Citta obbligatoria.";
            }
            if (safeValue.length < 2) {
                return "La citta deve contenere almeno 2 caratteri.";
            }
            if (safeValue.length > MAX_CITY_LENGTH) {
                return `La citta non puo superare ${MAX_CITY_LENGTH} caratteri.`;
            }
            if (!NAME_REGEX.test(safeValue)) {
                return "La citta contiene caratteri non ammessi.";
            }
            return "";
        }

        case "notes": {
            if (safeValue.length > MAX_NOTES_LENGTH) {
                return `Le note non possono superare ${MAX_NOTES_LENGTH} caratteri.`;
            }
            return "";
        }

        default:
            return "";
    }
}

export function validateCheckoutForm(formData) {
    const sanitized = sanitizeCheckoutForm(formData);
    const errors = emptyCheckoutErrors();

    Object.keys(errors).forEach((field) => {
        errors[field] = validateCheckoutField(field, sanitized[field]);
    });

    return {
        errors,
        sanitized,
        isValid: !Object.values(errors).some(Boolean),
    };
}

function validateProducts(products) {
    const errors = [];

    if (!Array.isArray(products) || products.length === 0) {
        errors.push({ field: "products", message: "L'ordine deve contenere almeno un prodotto." });
        return { errors, sanitizedProducts: [] };
    }

    if (products.length > MAX_PRODUCTS) {
        errors.push({
            field: "products",
            message: `L'ordine non puo contenere piu di ${MAX_PRODUCTS} prodotti.`,
        });
    }

    const seenProductIds = new Set();

    const sanitizedProducts = products.map((product, index) => {
        const productId = toInteger(product?.product_id);
        const quantity = toInteger(product?.quantity);

        if (!productId || productId <= 0) {
            errors.push({
                field: `products[${index}].product_id`,
                message: "ID prodotto non valido.",
            });
        }

        if (!quantity || quantity <= 0) {
            errors.push({
                field: `products[${index}].quantity`,
                message: "Quantita non valida.",
            });
        }

        if (quantity && quantity > MAX_QUANTITY_PER_PRODUCT) {
            errors.push({
                field: `products[${index}].quantity`,
                message: `Quantita massima per prodotto: ${MAX_QUANTITY_PER_PRODUCT}.`,
            });
        }

        if (productId && seenProductIds.has(productId)) {
            errors.push({
                field: `products[${index}].product_id`,
                message: "Prodotto duplicato nell'ordine.",
            });
        }

        if (productId) {
            seenProductIds.add(productId);
        }

        return {
            product_id: productId,
            quantity,
        };
    });

    return { errors, sanitizedProducts };
}

export function validateOrderPayload(orderData) {
    if (!orderData || typeof orderData !== "object" || Array.isArray(orderData)) {
        return {
            isValid: false,
            errors: [{ field: "order", message: "Payload ordine non valido." }],
            sanitizedData: null,
        };
    }

    const formValidation = validateCheckoutForm(orderData);
    const { errors: productErrors, sanitizedProducts } = validateProducts(orderData.products);

    const fieldErrors = Object.entries(formValidation.errors)
        .filter(([, message]) => Boolean(message))
        .map(([field, message]) => ({ field, message }));

    const errors = [...fieldErrors, ...productErrors];

    return {
        isValid: errors.length === 0,
        errors,
        sanitizedData: {
            ...formValidation.sanitized,
            products: sanitizedProducts,
        },
    };
}

export function buildOrderValidationError(errors) {
    if (!Array.isArray(errors) || errors.length === 0) {
        return "Dati ordine non validi.";
    }
    return errors.map((item) => item?.message).filter(Boolean).join(" ");
}