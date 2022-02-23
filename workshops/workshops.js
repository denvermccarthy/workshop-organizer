import { checkAuth, deleteParticipant, getWorkshops, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function renderWorkshops() {
    const container = document.getElementById('workshop-container');
    container.textContent = '';
    const workshops = await getWorkshops();
    
    for (const workshop of workshops) {
        container.append(renderWorkshop(workshop));
    }
}


function renderWorkshop(object) {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('workshop');

    const title = document.createElement('h3');
    title.textContent = object.name;
    
    const participantDiv = document.createElement('div');
    object.participants.forEach(element => {
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = element.name;
        
        div.append(p);
        div.addEventListener('click', async () => {
            await deleteParticipant(element.id);
            renderWorkshops();
        });
        participantDiv.append(div);
    });

    parentDiv.append(title, participantDiv);
    return parentDiv;
}

window.addEventListener('load', async () => {
    await renderWorkshops();
});