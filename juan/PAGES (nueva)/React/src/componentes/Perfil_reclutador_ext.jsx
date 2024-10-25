import styles from './Perfil_reclutador_ext.module.css';
import { LineaHor } from './LineaHor';
import { LineaVer } from './LineaVer';
import { Nombre } from './Nombre';
import { DescripcionExt } from './DescripcionExt';
import { Posteo } from './Posteo';
import Noticiero from './Noticiero';

function Perfil_reclutador_ext() {
  // 🎯 Definir getCookie dentro del componente App
  const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return JSON.parse(cookie.substring(name.length, cookie.length));
      }
    }
    return "";
  };


  return (
    <div className={styles.perfilReclutadorExt}>
      <div className={styles.pantalla}>
        <div className={styles.primeraInfo}>
          <div className={styles.apariencia}>
            <div className={styles.imagen}></div>
            {/* Pasar getCookie como prop al componente Nombre */}
            <Nombre getCookie={getCookie} /> 
          </div>
          <div className={styles.interacciones}>
            <button id={styles.mensaje}></button>
            <button id={styles.guardar}></button>
          </div>
        </div>
        <LineaHor />
        <div id={styles.infoAdicional}>
          <DescripcionExt />
        </div>
        <LineaHor />
        <div id={styles.introPosteos}>
          <h3>Posteos</h3>
        </div>
        <div id={styles.posteos}>
          <Posteo />
        </div>
      </div>



      <Noticiero />
    </div>
  );
}

export default Perfil_reclutador_ext;
