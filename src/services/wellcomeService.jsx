const wellcomeService = (genre) => {

    const date = new Date();
    const hour = date.getHours();

    let genreWellcome;
    let genreNight;

    switch (genre) {
        case 'Hombre':
            genreWellcome = 'guapo';
            genreNight = 'pillin';
            break;
        case 'Mujer':
            genreWellcome = 'guapa';
            genreNight = 'pillina';
            break;
        case 'Otro':
            genreWellcome = 'guape';
            genreNight = 'pilline';
            break;
    }

    switch (true) {
        case hour > 20:
            return `Buenas noches ${genreWellcome} !`;
        case hour > 12:
            return `Buenas tardes ${genreWellcome} !`;
        case hour > 6:
            return `Buenas días por la mañana ${genreWellcome} !`;
        default:
            return `Buenas noches ${genreNight}, aprovechando la noche eh jeje !`;
    }

}

export default wellcomeService;