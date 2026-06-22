export function getImgUrl (image) {
    const API_URL = 'http://localhost:3000/img/';
    return `${API_URL}${image}`;
}