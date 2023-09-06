const serverUrl = 'https://localhost:44394';
// const serverUrl = 'https://localhost:3000';

export default function getRoute(name) {
    return serverUrl + name;
}
