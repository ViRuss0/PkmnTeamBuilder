import { useState, createContext, useCallback } from 'react';
import axios from 'axios';

const PkmnTeamContext = createContext();

function Provider({ children }) {
  const [team, setTeam] = useState([]);
  const [errMsg, setErrMsg] = useState();

  /// USED TO RENDER THE TEAM ON REFRESH
  const teamFirstRender = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/team');
    const newTeam = response.data;
    setTeam(newTeam);
  }, []);

  ///USED TO ADD OR EVOLVE A POKEMON

  const addPkmnHandler = async (newPkmn, isEvolving) => {
    // CHECK IF TEAM IS FULL
    console.log(newPkmn);
    if (team.length === 6) {
      setErrMsg('Non puoi avere in squadra più di 6 Pokémon');
      return;
    }

    //FETCH POKEMON DATA
    let response = isEvolving
      ? await getPkmnById(newPkmn.id_pkmn, 1)
      : await getPkmnByName(newPkmn);
    console.log(response);

    const evolution = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${response.data.id + 1}`
    );

    const updatedTeam = await updateTeam(
      response,
      isEvolving,
      evolution,
      newPkmn.id
    );
    setTeam(updatedTeam);
    setErrMsg();
  };
  // FUNCTION TO UPDATE TEAM - GETS RESPONSE FROM DATA FETCHING, INFO ABOUT EVOLUTION AND CURRENT POKEMON ID (IF EVOLVING)

  const updateTeam = async (response, isEvolving, evolution, existingId) => {
    //CREATES NEW POKEMON OBJECT
    const newPkmn = {
      name: `${response.data.name
        .slice(0, 1)
        .toUpperCase()}${response.data.name.slice(1)}`,
      id: !isEvolving ? Math.ceil(Math.random() * 999999) : existingId,
      id_pkmn: response.data.id,
      sprite: response.data.sprites.front_default,
      evolves: evolution.data.evolves_from_species?.name === response.data.name,
      evolution: evolution.data.evolves_from_species?.name,
      evolved: isEvolving ? true : false,
    };

    //FINDS INDEX OF EVOLVING POKEMON

    const index = team.findIndex((pkmn) => pkmn.id === existingId);
    console.log(existingId);
    console.log(index);

    // RENDERS NEW TEAM
    const newTeam = isEvolving
      ? [...team.slice(0, index), newPkmn, ...team.slice(index + 1)]
      : [...team, newPkmn];

    // UPDATES DB

    if (!isEvolving) {
      await axios.post(`http://localhost:3001/team/`, newPkmn);
    }
    if (isEvolving) {
      await axios.put(`http://localhost:3001/team/${existingId}`, {
        ...newPkmn,
      });
    }

    return newTeam;
  };

  // FETCH POKEMON DATA BY NAME
  const getPkmnByName = async (name) => {
    if (name.trim().length === 0) {
      return;
    }
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    return response;
  };

  // FETCH POKEMON DATA BY ID (USED FOR EVOLUTION ONLY)
  const getPkmnById = async (id) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id + 1}`
    );

    return response;
  };

  // HANDLES TEAM DELETION
  const deletePkmnHandler = async (id, isEvolving) => {
    console.log(id);
    await axios.delete(`http://localhost:3001/team/${id}`);
    const updatedTeam = team.filter((pkmn) => pkmn.id !== id);

    setTeam(updatedTeam);
    console.log(team);
  };

  //DATA AND FUNCTIONS TO EXPORT

  const pkmnTeam = {
    team,
    errMsg,
    addPkmnHandler,
    deletePkmnHandler,
    teamFirstRender,
    setErrMsg,
  };

  return (
    <PkmnTeamContext.Provider value={pkmnTeam}>
      {children}
    </PkmnTeamContext.Provider>
  );
}
export { Provider };
export default PkmnTeamContext;
