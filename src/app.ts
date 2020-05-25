import {Application, Router, Route}from 'https://deno.land/x/oak/mod.ts';

export class Technopolis {
    app: Application;

    constructor() {
        this.app = new Application();

        // ロガー
        this.app.use(async (ctx, next) => {
            await next();
            const rt = ctx.response.headers.get('X-Response-Time');
            console.log(`${rt} [${ctx.request.method}] ${ctx.request.url}`)
        });
    }

    // routeはルーティングを行うメソッド
    route(routers: Router[]) {
        routers.forEach((router) =>{
            this.app.use(router.routes());
            this.app.use(router.allowedMethods());
        });
    }

    serve(port: number) {
        console.log(`HTTP listen on ${port}`);
        this.app.listen({port: port});
    }
}