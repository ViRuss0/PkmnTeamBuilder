import React, { useState, useContext } from 'react';
import Card from '../UI/Card';
import styles from './AddForm.module.css';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import PkmnTeamContext from '../../Context/pkmnTeam';
import { pkmn } from '../../data/variables';
import Button from '../UI/Button';

const AddForm = (props) => {
  // GETS ACCESS TO CONTEXT FUNCTION
  const { addPkmnHandler } = useContext(PkmnTeamContext);

  // MANAGES INPUT STATES
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(pkmn[0]);

  // ON SUBMITION TRIGGERS ADD POKEMON FUNCTION, RESETS INPUT FIELDS
  const submitHandler = (event) => {
    event.preventDefault();
    addPkmnHandler(value);
    setValue(pkmn[0]);
  };

  return (
    <Card>
      <form className={styles.add_form} onSubmit={submitHandler}>
        <Autocomplete
          value={value}
          disablePortal
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          inputValue={inputValue}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          id='combo-box-demo'
          options={pkmn}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label='Select your new Pokémon' />
          )}
        />
        <Button type='submit'>Add to your team</Button>
      </form>
    </Card>
  );
};

export default AddForm;
