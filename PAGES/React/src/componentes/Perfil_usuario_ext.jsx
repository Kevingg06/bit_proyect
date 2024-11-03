import styles from './Perfil_usuario_ext.module.css';
import DiaDisponible from './DiaDisponible';
import { LineaHor } from './LineaHor';
import { LineaVer } from './LineaVer';
import { Nombre } from './Nombre';
import { TitulosExt } from './TitulosExt';
import TablaHorariosExt from './TablaExt';
import { DescripcionExt } from './DescripcionExt';

function Perfil_usuario_ext() {
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
    <div className={styles.perfilUsuarioExt}>
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
            <div id={styles.titulos}>
              <TitulosExt />
            </div>
            <LineaVer />
            <div id={styles.descripcion}>
              <DescripcionExt />
            </div>
          </div>
          <LineaHor />
          <h3 className={styles.tituloHorarios}>Horarios disponibles</h3>
          <div id={styles.calendario}>
            <div className={styles.horarios}>
              <TablaHorariosExt />
            </div>
          </div>
        </div>
    </div>
  );
}

export default Perfil_usuario_ext;
