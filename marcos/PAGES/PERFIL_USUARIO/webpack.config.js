const path = require('path');

module.exports = {
  // ... otras configuraciones de Webpack

  resolve: {
    alias: {
      // ... otros alias

      // Alias para tu carpeta 'INICIO_SESION/JS' (ruta absoluta):
      '@login': path.resolve(__dirname, '../../../../INICIO_SESION/JS/') 
    }
  }
};