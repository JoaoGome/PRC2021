module.exports = {
    devServer: {
     proxy: {
       '/teste': {
         target: 'http://localhost:8000/',
         secure: true,
         changeOrigin: true,
         pathRewrite: {
           '^/teste': ''
         }
       },
     }
   } 
   };