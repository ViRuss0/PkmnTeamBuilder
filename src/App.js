import React, { useEffect, useContext } from 'react';
import styles from './App.module.css';
import AddForm from './components/Items/AddForm';
import PokemonList from './components/Items/PokemonList';
import PkmnTeamContext from './Context/pkmnTeam';
import ErrorModal from './components/Items/ErrorModal';

function App() {
  const { teamFirstRender, errMsg } = useContext(PkmnTeamContext);
  useEffect(() => {
    teamFirstRender();
  }, [teamFirstRender]);

  return (
    <div className={styles.container}>
      <div>
        {errMsg && <ErrorModal>{errMsg}</ErrorModal>}
        <AddForm />
      </div>
      <PokemonList />
    </div>
  );
}

export default App;
