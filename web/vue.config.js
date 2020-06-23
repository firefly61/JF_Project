module.exports ={
    devServer: {
        proxy: {
            '/api/': {
                target: 'http://localhost:7001',
                // target: 'http://192.168.202.20:7001',
                secure:false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        } 
    }
}