import { getWorkshops, createParticipant } from '../fetch-utils.js';

const form = document.getElementById('form');



window.addEventListener('load', async () => {
    const workshops = await getWorkshops();
    for (const workshop of workshops) {
        const select = document.getElementById('select');
        const option = document.createElement('option');
        option.value = workshop.id;
        option.textContent = workshop.name;
        select.append(option);
    }

});

form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = new FormData(form);
    const participant = {
        name: data.get('input'),
        workshop_id: data.get('select')
    };

    await createParticipant(participant);

    form.reset();
});