import { useContext } from 'react';
import Card from '../UI/Card';
import styles from './PokemonSlot.module.css';
import PkmnTeamContext from '../../Context/pkmnTeam';

const PokemonSlot = (props) => {
  // GETS ACCESS TO CONTEXT FUNCTIONS

  const { deletePkmnHandler, addPkmnHandler } = useContext(PkmnTeamContext);

  // HANDLES POKEMON DELETION
  const deletePkmn = () => {
    deletePkmnHandler(props.pkmn.id);
  };

  // HANDLES POKEMON EVOLUTION
  const evolvePkmn = () => {
    addPkmnHandler(props.pkmn, true);
  };

  return (
    <div>
      <Card>
        <div className={styles.pokemon_slot}>
          <button
            className={`${styles.evolve_btn} ${
              !props.pkmn.evolves ? styles.disabled : ''
            }`}
            onClick={evolvePkmn}
          >
            <svg
              className={styles.evolve_icon}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5'
              />
            </svg>
          </button>
          <img
            className={styles.sprite}
            src={props.pkmn.sprite}
            alt={props.pkmn.name}
          />

          <p className={styles.name}>{props.pkmn.name} </p>
          <button onClick={deletePkmn} className={styles.delete_btn}>
            <svg
              className={styles.delete_icon}
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
              />
            </svg>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default PokemonSlot;
