const files = require.context('.', true, /\.ts$/)
let routers: any[] = []

files.keys().forEach(key => {
    if (key != './index.ts') {
        routers = routers.concat(files(key).default)
    }
})
export default routers