import { useState } from "react";
import '../../css/FormSearch.css';

const SearchProfilesForm = ({ onSearch }) => {
    // Basic filters
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [location, setLocation] = useState(''); 

    // Extended filters
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
    const [minHeight, setMinHeight] = useState('');
    const [maxHeight, setMaxHeight] = useState('');
    const [ethnia, setEthnia] = useState('');
    const [religion, setReligion] = useState('');
    const [relationship, setRelationship] = useState('');
    const [smoking, setSmoking] = useState('');
    const [drinking, setDrinking] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const basicFilters = {
            minAge: minAge ? parseInt(minAge) : undefined,
            maxAge: maxAge ? parseInt(maxAge) : undefined,
            location: location === '' ? undefined : location === 'true',
        };

        const advancedFilters = isAdvancedSearch
            ? {
                  minHeight: minHeight ? parseInt(minHeight) : undefined,
                  maxHeight: maxHeight ? parseInt(maxHeight) : undefined,
                  ethnia : ethnia ? ethnia : undefined,
                  religion : religion ? religion : undefined,
                  relationship : relationship ? relationship : undefined,
                  smoking: smoking === '' ? undefined : smoking,
                  drinking: drinking === '' ? undefined : drinking
              }
            : {};

        onSearch(basicFilters, advancedFilters);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <h3>Búsqueda de Perfiles</h3>

            <div>
                <label>Edad mínima:</label>
                <input type="number" value={minAge} onChange={(e) => setMinAge(e.target.value)} />
            </div>
            <div>
                <label>Edad máxima:</label>
                <input type="number" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
            </div>
            <div>
                <label>Localidad:</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Indiferente</option>
                    <option value="true">Cercano</option>
                </select>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isAdvancedSearch}
                        onChange={() => setIsAdvancedSearch(!isAdvancedSearch)}
                    />
                    Búsqueda avanzada
                </label>
            </div>

            {isAdvancedSearch && (
                <div>
                    <h3>Filtros Avanzados</h3>

                    <div>
                        <label>Altura mínima:</label>
                        <input type="number" value={minHeight} onChange={(e) => setMinHeight(e.target.value)} />
                    </div>
                    <div>
                        <label>Altura máxima:</label>
                        <input type="number" value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)} />
                    </div>
                    <div>
                        <label>Etnia:</label>
                        <select value={ethnia} onChange={(e) => setEthnia(e.target.value)}>
                            <option value="">Indiferente</option>
                            <option value="Asiática">Asiática</option>
                            <option value="Caucásico">Caucásico</option>
                            <option value="Amerindia">Amerindia</option>
                            <option value="Africana">Africana</option>
                            <option value="Sudeste Asiática">Sudeste Asiático</option>
                        </select>
                    </div>
                    <div>
                        <label>Religión:</label>
                        <select value={religion} onChange={(e) => setReligion(e.target.value)}>
                            <option value="">Indiferente</option>
                            <option value="Cristianísmo">Cristianísmo</option>
                            <option value="Judaísmo">Judaísmo</option>
                            <option value="Hinduísmo">Hinduísmo</option>
                            <option value="Islam">Islam</option>
                            <option value="Budísmo">Budísmo</option>
                        </select>
                    </div>
                    <div>
                        <label>Relación:</label>
                        <select value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                            <option value="">Indiferente</option>
                            <option value="Soltería">Soltería</option>
                            <option value="Divorcio">Divorcio</option>
                            <option value="Pareja">Pareja</option>
                            <option value="Matrimonio">Matrimonio</option>
                            <option value="Viudedad">Viudedad</option>
                        </select>
                    </div>
                    <div>
                        <label>Fuma:</label>
                        <select value={smoking} onChange={(e) => setSmoking(e.target.value)}>
                            <option value="">Indiferente</option>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div>
                        <label>Bebe:</label>
                        <select value={drinking} onChange={(e) => setDrinking(e.target.value)}>
                            <option value="">Indiferente</option>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
            )}

            <button type="submit">Buscar</button>
        </form>
    );
};

export default SearchProfilesForm;