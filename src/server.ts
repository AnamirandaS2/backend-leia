import app from './app'
import 'dotenv/config'

(
    ()=>{        
        app.listen(Number(process.env.PORT), process.env.HOST as string, ()=> {
            console.log(`[SERVER IS ON] Server running on port ${process.env.PORT}`)
        })
    }
)()