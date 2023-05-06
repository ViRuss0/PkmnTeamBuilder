import { useContext } from "react";
import PokemonSlot from "./PokemonSlot";
import Card from "../UI/Card";
import styles from "./PokemonList.module.css";
import PkmnTeamContext from "../../Context/pkmnTeam";
const PokemonList = (props) => {
  const { team } = useContext(PkmnTeamContext);
  const teamRender = team?.map((pkmn) => (
    <PokemonSlot
      pkmn={pkmn}
      key={pkmn.id}

      /*       name={pkmn.name}
      sprite={pkmn.sprite}
      key={pkmn.id}
      id={pkmn.id}*/
    />
  ));
  return (
    <div className={styles.list}>
      <Card>
        <h4>Your team</h4> {teamRender}
      </Card>
    </div>
  );
};

export default PokemonList;
