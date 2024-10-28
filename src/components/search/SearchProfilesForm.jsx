import { useState } from "react";

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
        <form onSubmit={handleSubmit}>
            <h2>Búsqueda de Perfiles</h2>

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
                    <option value="true">Sí</option>
                    <option value="false">No</option>
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
                        <input type="text" value={ethnia} onChange={(e) => setEthnia(e.target.value)} />
                    </div>
                    <div>
                        <label>Religión:</label>
                        <input type="text" value={religion} onChange={(e) => setReligion(e.target.value)} />
                    </div>
                    <div>
                        <label>Relación:</label>
                        <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} />
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