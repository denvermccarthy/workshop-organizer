const SUPABASE_URL = 'https://lxifeplqjanpuugbzgyn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4aWZlcGxxamFucHV1Z2J6Z3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ0MzU0NTEsImV4cCI6MTk2MDAxMTQ1MX0.4hkIbGdYMJ7SzqMSm39JtJRvMyFal0vMXHHWB0APEJw';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function getWorkshops() {
    const response = await client.from('workshops').select(`*, participants (*)`);
    console.log(response);
    return checkError(response);
}

export async function createParticipant(data) {
    const response = await client.from('participants').insert({ name: data.name, workshop_id: data.workshop_id });

    return checkError(response);
}

export async function deleteParticipant(id) {
    const resp = await client.from('participants').delete().match({ id });
    
    return checkError(resp);
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
