import styles from './Perfil_empresa_int.module.css';
import Noticiero from './Noticiero';
import { LineaHor } from './LineaHor';
import { DescripcionInt } from './DescripcionInt';
import { Nombre } from './Nombre';
import CrearAnuncio from './CrearAnuncio';

function Perfil_empresa_int() {
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
    <div className={styles.perfilEmpresaInt}>
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
          <div id={styles.fotoGrande}></div>
          <DescripcionInt />
        </div>
        <LineaHor />
        <div id={styles.introPosteos}>
          <h3>Anuncios</h3>
          <CrearAnuncio />
        </div>
        <div id={styles.posteos}>

        </div>
      </div>



      <Noticiero />
    </div>
  );
}

export default Perfil_empresa_int;
