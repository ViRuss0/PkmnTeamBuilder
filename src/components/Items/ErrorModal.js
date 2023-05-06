import styles from './ErrorModal.module.css';
import Card from '../UI/Card';
import { createPortal } from 'react-dom';
import { useContext } from 'react';
import PkmnTeamContext from '../../Context/pkmnTeam.js';
import Button from '../UI/Button';

const ErrorModal = (props) => {
  // GETS ERROR MSG SETTER FROM CONTEXT
  const { setErrMsg } = useContext(PkmnTeamContext);
  const closeModalHandler = () => {
    setErrMsg();
  };
  return createPortal(
    <div>
      <div onClick={closeModalHandler} className={styles.overlay}></div>,
      <div className={styles.modal}>
        <Card>
          <h2>Qualcosa è andato storto</h2>
          <p>{props.children}</p>
          <Button onClick={closeModalHandler}>Okay</Button>
        </Card>
      </div>
    </div>,
    document.querySelector('.modal-container')
  );
};

export default ErrorModal;
